// src/components/Admin/AdminDashboard.js
import React, { useState } from "react";
import { Navbar, Nav, Container, Table, Button, Dropdown, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { FaUserCircle } from "react-icons/fa"; // Import the profile icon
import "./AdminDashboard.css";

const AdminDashboard = () => {
    const navigate = useNavigate(); // Initialize useNavigate
    const [showLogoutMessage, setShowLogoutMessage] = useState(false); // State for the notification

    // Function to handle logout
    const handleLogout = () => {
        localStorage.removeItem("authToken");
        sessionStorage.clear();
        setShowLogoutMessage(true);
        setTimeout(() => {
            navigate("/login");
        }, 2000);
    };

    return (
        <div className="admin-dashboard">
            <Navbar bg="dark" variant="dark" expand="lg">
                <Container>
                    <Navbar.Brand href="#dashboard">Admin Dashboard</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="#home">Beranda</Nav.Link>
                            <Nav.Link href="#products">Produk</Nav.Link>
                            <Nav.Link href="#orders">Pemesanan</Nav.Link>
                            <Nav.Link href="#users">Pengguna</Nav.Link>
                            <Nav.Link href="#sales-report">Laporan Penjualan</Nav.Link>
                        </Nav>
                        <Dropdown align="end">
                            <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                                <FaUserCircle size={24} />
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item onClick={() => navigate("/admin-account")}>
                                    Akun Admin
                                </Dropdown.Item>
                                <Dropdown.Divider />
                                <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            {showLogoutMessage && (
                <Alert variant="success" className="mt-3 text-center">
                    Anda berhasil Logout!
                </Alert>
            )}
        </div>
    );
};

export default AdminDashboard;
