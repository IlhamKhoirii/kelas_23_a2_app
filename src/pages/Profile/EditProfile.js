import React, { useState, useContext, useEffect } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { CartContext } from "../../context/CartContext"; // Import CartContext
import axios from "axios";
import HeaderNavbar from "../../components/HeaderNavbar/HeaderNavbar"; // Import HeaderNavbar
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./EditProfile.css"; // Optional: For custom styling if needed

const EditProfile = () => {
    const {
        namaPengguna,
        updateNamaPengguna,
        emailPengguna,
        updateEmailPengguna,
        alamat,
        updateAlamat,
        noTelp,
        updateNoTelp,
        userId
    } = useContext(UserContext);

    const { cartItems } = useContext(CartContext); // Get cartItems from CartContext

    const [editedNamaPengguna, setEditedNamaPengguna] = useState(namaPengguna);
    const [editedEmailPengguna, setEditedEmailPengguna] = useState(emailPengguna);
    const [editedAlamat, setEditedAlamat] = useState(alamat);
    const [editedNoTelp, setEditedNoTelp] = useState(noTelp);
    const navigate = useNavigate();

    useEffect(() => {
        setEditedNamaPengguna(namaPengguna);
        setEditedEmailPengguna(emailPengguna);
        setEditedAlamat(alamat);
        setEditedNoTelp(noTelp);
    }, [namaPengguna, emailPengguna, alamat, noTelp]);

    const handleSave = async (e) => {
        e.preventDefault();
        try {
            // Update profile pengguna
            await axios.put(`http://localhost:5000/api/users/profile/${userId}`, {
                nama_user: editedNamaPengguna,
                email: editedEmailPengguna,
                no_telp: editedNoTelp
            });

            // Update alamat pelanggan
            await axios.put(`http://localhost:5000/api/alamat-pelanggan/${userId}`, {
                alamat: editedAlamat
            });

            updateNamaPengguna(editedNamaPengguna);
            updateEmailPengguna(editedEmailPengguna);
            updateAlamat(editedAlamat);
            updateNoTelp(editedNoTelp);

            // Show success message using toast
            toast.success("Akun berhasil diperbarui!");

            // Automatically navigate to profile after a few seconds (optional)
            // setTimeout(() => {
            //     navigate("/profile");
            // }, 3000);
        } catch (error) {
            console.error("Error updating profile:", error);
            toast.error("Gagal memperbarui akun. Silakan coba lagi.");
        }
    };

    const handleProfileClick = () => {
        navigate("/profile");
    };

    return (
        <div className="edit-profile-page">
            {/* HeaderNavbar */}
            <HeaderNavbar cartItems={cartItems} handleProfileClick={handleProfileClick} />

            {/* Edit Profile Form */}
            <Container className="mt-4">
                <Form onSubmit={handleSave}>
                    <Form.Group className="mb-3" controlId="formUserId">
                        <Form.Label>User ID (Unique)</Form.Label>
                        <Form.Control type="text" value={userId} readOnly />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formNamaPengguna">
                        <Form.Label>Nama</Form.Label>
                        <Form.Control
                            type="text"
                            value={editedNamaPengguna}
                            onChange={(e) => setEditedNamaPengguna(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formNoTelp">
                        <Form.Label>Nomor Telepon</Form.Label>
                        <Form.Control
                            type="text"
                            value={editedNoTelp}
                            onChange={(e) => setEditedNoTelp(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formEmailPengguna">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            value={editedEmailPengguna}
                            onChange={(e) => setEditedEmailPengguna(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formAlamat">
                        <Form.Label>Alamat</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            value={editedAlamat}
                            onChange={(e) => setEditedAlamat(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Update Akun
                    </Button>
                </Form>
            </Container>

            {/* Toast Container */}
            <ToastContainer />
        </div>
    );
};

export default EditProfile;