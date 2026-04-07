import { useEffect, useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";

const API_BASE = "http://localhost:8080";

function CheckoutForm() {
    const stripe = useStripe();
    const elements = useElements();

    const [amount, setAmount] = useState("");
    const [patientId, setPatientId] = useState("");
    const [doctorId, setDoctorId] = useState("");
    const [date, setDate] = useState("");

    const [patients, setPatients] = useState([]);
    const [doctors, setDoctors] = useState([]);

    const [loading, setLoading] = useState(false);
    const [dataLoading, setDataLoading] = useState(true);

    useEffect(() => {
        fetchInitialData();
    }, []);

    const fetchInitialData = async () => {
        try {
            setDataLoading(true);

            const [doctorRes, patientRes] = await Promise.all([
                fetch(`${API_BASE}/doctors`),
                fetch(`${API_BASE}/patients`)
            ]);

            if (!doctorRes.ok) {
                throw new Error("Failed to fetch doctors");
            }

            if (!patientRes.ok) {
                throw new Error("Failed to fetch patients");
            }

            const doctorData = await doctorRes.json();
            const patientData = await patientRes.json();

            setDoctors(doctorData);
            setPatients(patientData);
        } catch (error) {
            alert(error.message || "Failed to load doctors and patients");
        } finally {
            setDataLoading(false);
        }
    };

    const resetForm = () => {
        setAmount("");
        setPatientId("");
        setDoctorId("");
        setDate("");
        if (elements) {
            const cardElement = elements.getElement(CardElement);
            if (cardElement) {
                cardElement.clear();
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!patientId || !doctorId || !date || !amount) {
            alert("Please fill all fields");
            return;
        }

        if (Number(amount) <= 0) {
            alert("Please enter a valid amount");
            return;
        }

        if (!stripe || !elements) {
            alert("Stripe not loaded yet");
            return;
        }

        const cardElement = elements.getElement(CardElement);

        if (!cardElement) {
            alert("Card details not found");
            return;
        }

        setLoading(true);

        try {
            // 1. Create PaymentIntent
            const paymentRes = await fetch(`${API_BASE}/api/payment/create-payment-intent`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    amount: Number(amount),
                }),
            });

            if (!paymentRes.ok) {
                throw new Error("Failed to create payment intent");
            }

            const paymentData = await paymentRes.json();
            const clientSecret = paymentData.clientSecret;

            if (!clientSecret) {
                throw new Error("Client secret not received from backend");
            }

            // 2. Confirm card payment
            const result = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: cardElement,
                },
            });

            if (result.error) {
                throw new Error(result.error.message);
            }

            // 3. Book appointment
            if (result.paymentIntent?.status === "succeeded") {
                const appointmentRes = await fetch(`${API_BASE}/api/appointments/book-with-payment`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        patientId: Number(patientId),
                        doctorId: Number(doctorId),
                        date,
                        amount: Number(amount),
                        paymentIntentId: result.paymentIntent.id,
                    }),
                });

                const message = await appointmentRes.text();

                if (!appointmentRes.ok) {
                    throw new Error(message || "Appointment booking failed");
                }

                alert(message || "Appointment booked successfully");
                resetForm();
            } else {
                throw new Error("Payment was not successful");
            }
        } catch (error) {
            alert(error.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            {dataLoading ? (
                <p>Loading doctors and patients...</p>
            ) : (
                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: "15px" }}>
                        <label>Select Patient</label>
                        <br />
                        <select
                            value={patientId}
                            onChange={(e) => setPatientId(e.target.value)}
                            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
                        >
                            <option value="">Choose patient</option>
                            {patients.map((patient) => (
                                <option key={patient.id} value={patient.id}>
                                    {patient.name} ({patient.email})
                                </option>
                            ))}
                        </select>
                    </div>

                    <div style={{ marginBottom: "15px" }}>
                        <label>Select Doctor</label>
                        <br />
                        <select
                            value={doctorId}
                            onChange={(e) => setDoctorId(e.target.value)}
                            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
                        >
                            <option value="">Choose doctor</option>
                            {doctors.map((doctor) => (
                                <option key={doctor.id} value={doctor.id}>
                                    {doctor.name} - {doctor.specialization}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div style={{ marginBottom: "15px" }}>
                        <label>Appointment Date</label>
                        <br />
                        <input
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
                        />
                    </div>

                    <div style={{ marginBottom: "15px" }}>
                        <label>Amount</label>
                        <br />
                        <input
                            type="number"
                            placeholder="Enter amount"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
                        />
                    </div>

                    <div style={{ marginBottom: "20px" }}>
                        <label>Card Details</label>
                        <div
                            style={{
                                padding: "12px",
                                border: "1px solid #ccc",
                                borderRadius: "6px",
                                marginTop: "5px",
                            }}
                        >
                            <CardElement />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={!stripe || loading}
                        style={{
                            width: "100%",
                            padding: "12px",
                            cursor: loading ? "not-allowed" : "pointer",
                        }}
                    >
                        {loading ? "Processing..." : "Pay & Book Appointment"}
                    </button>
                </form>
            )}
        </div>
    );
}

export default CheckoutForm;