// src/components/Profile/UserProfileModal.js
import React, { useState } from "react";
import { Modal, Button, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const UserProfileModal = ({ show, handleClose }) => {
    const [showLogoutMessage, setShowLogoutMessage] = useState(false); // State for the logout notification
    const navigate = useNavigate(); // Initialize useNavigate

    const handleLogout = () => {
        // Clear any authentication tokens or session data
        localStorage.removeItem("authToken"); // Example of clearing a token from localStorage
        sessionStorage.clear(); // Clear session storage

        // Show logout notification
        setShowLogoutMessage(true);

        // Redirect to the login page after a short delay
        setTimeout(() => {
            navigate("/login");
            handleClose(); // Close the modal
        }, 2000); // 2-second delay before redirect
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Profil Pengguna</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Selamat datang, John Doe!</p>
                <div className="modal-links">
                    <Link to="/edit-profile" onClick={handleClose}>
                        <Button variant="primary" className="mb-2">Edit Profile</Button>
                    </Link>
                    <Link to="/order-history" onClick={handleClose}>
                        <Button variant="secondary" className="mb-2">Riwayat Pemesanan</Button>
                    </Link>
                    {/* Logout Button */}
                    <Button variant="danger" onClick={handleLogout}>Logout</Button>
                </div>

                {/* Notification for successful logout */}
                {showLogoutMessage && (
                    <Alert variant="success" className="mt-3 text-center">
                        Anda berhasil Logout!
                    </Alert>
                )}
            </Modal.Body>
        </Modal>
    );
};

export default UserProfileModal;
