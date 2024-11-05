import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState(""); // State to store error messages
    const navigate = useNavigate();

    // Mock data for admin and user credentials
    const credentials = {
        admin: {
            email: "admin@gmail.com",
            password: "admin123",
            role: "admin",
            redirectPath: "/admin/dashboard",
            authToken: "adminAuthToken"
        },
        user: {
            email: "user@gmail.com",
            password: "user123",
            role: "user",
            redirectPath: "/home",
            authToken: "userAuthToken"
        }
    };

    const handleLogin = (e) => {
        e.preventDefault();

        // Check credentials
        if (email === credentials.admin.email && password === credentials.admin.password) {
            authenticateUser(credentials.admin);
        } else if (email === credentials.user.email && password === credentials.user.password) {
            authenticateUser(credentials.user);
        } else {
            setErrorMessage("Email atau password salah. Silahkan coba lagi.");
        }
    };

    const authenticateUser = ({ authToken, role, redirectPath }) => {
        // Save authentication details in local storage
        localStorage.setItem("authToken", authToken);
        localStorage.setItem("userRole", role);

        // Clear any existing error message
        setErrorMessage("");

        // Navigate to the specified path
        navigate(redirectPath);
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

                {errorMessage && <p className="error-message">{errorMessage}</p>}

                <button type="submit">Login</button>
            </form>
            <p>Belum punya akun? <Link to="/register">Register</Link></p>
        </div>
    );
};

export default Login;
