import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./Login.css";

const Register = () => {
    const [namaUser, setNamaUser] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("pelanggan"); // Default role is pelanggan
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const API_URL = "http://localhost:5000/api/users/register";

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(API_URL, {
                nama_user: namaUser,
                email,
                password,
                role,
            });
            alert(res.data.message || "Registrasi berhasil");
            navigate("/login");
        } catch (err) {
            setErrorMessage(err.response?.data?.message || "Registrasi gagal. Periksa kembali data Anda.");
        }
    };

    return (
        <div className="form-container">
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <label>Nama Lengkap</label>
                <input
                    type="text"
                    value={namaUser}
                    onChange={(e) => setNamaUser(e.target.value)}
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

                <label>Role</label>
                <select value={role} onChange={(e) => setRole(e.target.value)} required>
                    <option value="pelanggan">Pelanggan</option>
                    <option value="admin">Admin</option>
                </select>

                {errorMessage && <p className="error-message">{errorMessage}</p>}
                <button type="submit">Register</button>
            </form>
            <p>
                Sudah punya akun? <Link to="/login">Login</Link>
            </p>
        </div>
    );
};

export default Register;