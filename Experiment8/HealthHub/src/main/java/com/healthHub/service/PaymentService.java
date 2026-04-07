package com.healthHub.service;

import com.healthHub.dto.PaymentRequest;
import com.healthHub.entity.Appointment;
import com.healthHub.entity.Doctor;
import com.healthHub.entity.Patient;
import com.healthHub.repository.AppointmentRepository;
import com.healthHub.repository.DoctorRepository;
import com.healthHub.repository.PatientRepository;
import com.stripe.Stripe;
import com.stripe.model.PaymentIntent;
import com.stripe.param.PaymentIntentCreateParams;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class PaymentService {

    @Autowired
    private AppointmentRepository repo;

    @Autowired
    private DoctorRepository doctorRepository;

    @Autowired
    private PatientRepository patientRepository;

    @Value("${stripe.secret.key}")
    private String secretKey;

    public String bookAppointment(PaymentRequest request) throws Exception {

        Stripe.apiKey = secretKey;

        // Verify payment
        PaymentIntent intent = PaymentIntent.retrieve(request.getPaymentIntentId());

        System.out.println("STATUS: " + intent.getStatus());

        if (!"succeeded".equals(intent.getStatus())) {
            throw new RuntimeException("Payment not successful");
        }

        Patient patient = patientRepository.findById(request.getPatientId())
                .orElseThrow(() -> new RuntimeException("Patient not found"));

        Doctor doctor = doctorRepository.findById(request.getDoctorId())
                .orElseThrow(() -> new RuntimeException("Doctor not found"));

        // Save appointment
        Appointment appt = new Appointment();
        appt.setPatient(patient);
        appt.setDoctor(doctor);
        appt.setAppointmentDate(request.getDate());
        appt.setPaymentIntentId(request.getPaymentIntentId());
        appt.setPaymentStatus("SUCCESS");

        repo.save(appt);

        return "Appointment booked successfully";
    }

    public Map<String, String> createPaymentIntent(Double amount) throws Exception {

        Stripe.apiKey = secretKey;

        PaymentIntentCreateParams params = PaymentIntentCreateParams.builder()
                .setAmount((long) (amount * 100)) // ₹500 -> 50000 paise
                .setCurrency("inr")
                .addPaymentMethodType("card")
                .build();

        PaymentIntent paymentIntent = PaymentIntent.create(params);

        Map<String, String> response = new HashMap<>();
        response.put("clientSecret", paymentIntent.getClientSecret());

        return response;
    }
}