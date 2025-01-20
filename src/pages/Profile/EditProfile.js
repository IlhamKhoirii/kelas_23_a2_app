import React, { useState, useContext, useEffect } from "react";
import { Form, Button, Container, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { CartContext } from "../../context/CartContext"; // Import CartContext
import axios from "axios";
import HeaderNavbar from "../../components/HeaderNavbar/HeaderNavbar"; // Import HeaderNavbar
import "./EditProfile.css"; // Optional: For custom styling if needed

const EditProfile = () => {
    const {
        namaPengguna,
        updateNamaPengguna,
        emailPengguna,
        updateEmailPengguna,
        alamat,
        updateAlamat,
        userId
    } = useContext(UserContext);

    const { cartItems } = useContext(CartContext); // Get cartItems from CartContext

    const [editedNamaPengguna, setEditedNamaPengguna] = useState(namaPengguna);
    const [editedEmailPengguna, setEditedEmailPengguna] = useState(emailPengguna);
    const [editedAlamat, setEditedAlamat] = useState(alamat);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false); // State for showing the success message
    const navigate = useNavigate();

    useEffect(() => {
        setEditedNamaPengguna(namaPengguna);
        setEditedEmailPengguna(emailPengguna);
        setEditedAlamat(alamat);
    }, [namaPengguna, emailPengguna, alamat]);

    const handleSave = async (e) => {
        e.preventDefault();
        try {
            // Update profile pengguna
            await axios.put(`http://localhost:5000/api/users/profile/${userId}`, {
                nama_user: editedNamaPengguna,
                email: editedEmailPengguna
            });

            // Update alamat pelanggan
            await axios.put(`http://localhost:5000/api/alamat-pelanggan/${userId}`, {
                alamat: editedAlamat
            });

            updateNamaPengguna(editedNamaPengguna);
            updateEmailPengguna(editedEmailPengguna);
            updateAlamat(editedAlamat);

            // Show success message overlay
            setShowSuccessMessage(true);

            // Automatically hide the overlay after a few seconds
            setTimeout(() => setShowSuccessMessage(false), 3000);
        } catch (error) {
            console.error("Error updating profile:", error);
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

                {/* Notification Overlay */}
                {showSuccessMessage && (
                    <div className="notification-overlay">
                        <Alert variant="success" className="text-center">
                            Akun berhasil diperbarui
                        </Alert>
                    </div>
                )}
            </Container>
        </div>
    );
};

export default EditProfile;