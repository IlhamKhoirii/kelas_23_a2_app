import React, { useState } from "react";
import { Modal, Button, Alert, Container, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "./UserProfileModal.css";

const UserProfileModal = ({ show, handleClose = () => {} }) => {
    const [showLogoutMessage, setShowLogoutMessage] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("authToken");
        sessionStorage.clear();
        setShowLogoutMessage(true);

        setTimeout(() => {
            navigate("/login");
            handleClose();  // Close the modal after logout
        }, 2000);
    };

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Profil</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Container>
                    <Row className="text-center">
                        <Col xs={12} className="mb-2">
                            <Link to="/edit-profile" onClick={handleClose}>
                                <Button variant="primary" className="w-100">
                                    Edit Profile
                                </Button>
                            </Link>
                        </Col>

                        <Col xs={12} className="mb-2">
                            <Link to="/order-history" onClick={handleClose}>
                                <Button variant="secondary" className="w-100">
                                    Riwayat Pesanan
                                </Button>
                            </Link>
                        </Col>

                        <Col xs={12} className="mb-2">
                            <Button variant="danger" className="w-100" onClick={handleLogout}>
                                Logout
                            </Button>
                        </Col>
                    </Row>

                    {showLogoutMessage && (
                        <Alert variant="success" className="mt-3 text-center">
                            Anda berhasil Logout!
                        </Alert>
                    )}
                </Container>
            </Modal.Body>
        </Modal>
    );
};

export default UserProfileModal;
