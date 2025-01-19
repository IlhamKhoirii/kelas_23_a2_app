import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./Login.css";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const API_URL = "http://localhost:5000/api/users/login";

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${API_URL}`, { email, password });
            const user = response.data.user;
            localStorage.setItem("user", JSON.stringify(user));
            localStorage.setItem("authToken", response.data.token);

            if (user.role === "admin") {
                navigate("/admin/dashboard");
            } else if (user.role === "pelanggan") {
                navigate("/home");
            }

            setErrorMessage("");
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                setErrorMessage(error.response.data.message);
            } else {
                setErrorMessage("Terjadi kesalahan. Silakan coba lagi.");
            }
        }
    };

    return (
        <div className="form-container">
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
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
            <p>
                Belum punya akun? <Link to="/register">Register</Link>
            </p>
        </div>
    );
};

export default Login;