import React, { useState } from "react";
import "./Login.css";

const Register = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = (e) => {
        e.preventDefault();
        // Tambahkan logika registrasi di sini
        console.log("Register:", { username, email, password });
    };

    return (
        <div className="register-container">
            <h2>Register</h2>
            <form onSubmit={handleRegister} className="register-form">
                <label>Username</label>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <label>Email</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <label>Password</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Register</button>
            </form>
            <p>Sudah punya akun? <a href="login">Login</a></p>
        </div>
    );
};

export default Register;
