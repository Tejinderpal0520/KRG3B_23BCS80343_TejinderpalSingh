import { useState } from "react";

function Patient() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!name.trim() || !email.trim()) {
            console.log("Please fill in both patient name and email.");
            return;
        }

        console.log({ name, email });
        setName("");
        setEmail("");
    };

    return (
        <>
            <h1>Patient Details</h1>
            <form onSubmit={handleSubmit}>
                <p>Enter Patient Name: </p>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <p>Enter Patient email: </p>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <button type="submit">Submit</button>
            </form>
        </>
    );
}

export default Patient;

/*
Set up react router wih three route: /homepage(same patient page), /about(aboutpage)and /contact (contact page). Adds a navigation bar with links to all the three pages Each page should render a simple heading intify itself
*/