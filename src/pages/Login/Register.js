import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Register = () => {
    const [namaUser, setNamaUser] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("pelanggan");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post("http://localhost:5000/api/users/register", {
                nama_user: namaUser,
                email,
                password,
                role,
            });
            alert(res.data.message || "Registrasi berhasil");
            navigate("/login");
        } catch (err) {
            alert(err.response?.data?.message || "Registrasi gagal. Periksa kembali data Anda.");
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
                <select value={role} onChange={(e) => setRole(e.target.value)}>
                    <option value="pelanggan">Pelanggan</option>
                    <option value="admin">Admin</option>
                </select>

                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default Register;
