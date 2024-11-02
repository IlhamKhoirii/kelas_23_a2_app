import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    // Mock data for admin and user credentials
    const adminCredentials = {
        email: "admin@gmail.com",
        password: "admin123",
    };

    const userCredentials = {
        email: "user@gmail.com",
        password: "user123",
    };

    const handleLogin = (e) => {
        e.preventDefault();

        // Check if the email and password match the admin credentials
        if (email === adminCredentials.email && password === adminCredentials.password) {
            // Save admin authentication details to local storage
            localStorage.setItem("authToken", "adminAuthToken"); // Example token for session management
            localStorage.setItem("userRole", "admin"); // Save role as 'admin'

            // Navigate to the admin dashboard if the credentials match
            navigate("/admin/dashboard");
        } 
        // Check if the email and password match the user credentials
        else if (email === userCredentials.email && password === userCredentials.password) {
            // Save user authentication details to local storage
            localStorage.setItem("authToken", "userAuthToken"); // Example token for session management
            localStorage.setItem("userRole", "user"); // Save role as 'user'

            // Navigate to the home page if the credentials match
            navigate("/home");
        } else {
            // If credentials do not match, show an error message
            alert("Email atau password salah. Silahkan coba lagi.");
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={handleLogin} className="login-form">
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
                <button type="submit">Login</button>
            </form>
            <p>Belum punya akun? <Link to="/register">Register</Link></p>
        </div>
    );
};

export default Login;
