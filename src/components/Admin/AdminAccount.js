// src/components/Admin/AdminAccount.js
import React, { useState } from "react";
import { Form, Button, Container, Navbar, Nav, Dropdown } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./AdminAccount.css";

const AdminAccount = () => {
    const navigate = useNavigate();

    // Mock admin data
    const [adminData, setAdminData] = useState({
        adminId: "12345",
        name: "Jane Smith",
        email: "admin@gmail.com",
        password: "admin123",
    });

    const [isEditing, setIsEditing] = useState(false);

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        // Logic to save the updated admin data
        console.log("Updated Admin Data:", adminData);
        setIsEditing(false); // Disable editing mode after saving
    };

    const handleLogout = () => {
        // Clear authentication and navigate to login
        localStorage.removeItem("authToken");
        navigate("/login");
    };

    return (
        <>
            {/* Admin Navbar */}
            <Navbar bg="dark" variant="dark" expand="lg">
                <Container>
                    <Navbar.Brand>Admin Dashboard</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link onClick={() => navigate("/admin/dashboard")}>Beranda</Nav.Link>
                            <Nav.Link onClick={() => navigate("/admin/products")}>Produk</Nav.Link>
                            <Nav.Link onClick={() => navigate("/admin/orders")}>Pemesanan</Nav.Link>
                            <Nav.Link onClick={() => navigate("/admin/users")}>Pengguna</Nav.Link>
                            <Nav.Link onClick={() => navigate("/admin/sales")}>Laporan Penjualan</Nav.Link>
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

            {/* Admin Account Content */}
            <Container className="admin-account-container mt-4">
                <h2>Informasi Akun Admin</h2>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="adminId">
                        <Form.Label>Admin ID</Form.Label>
                        <Form.Control
                            type="text"
                            value={adminData.adminId}
                            readOnly
                        />
                    </Form.Group>

                    <Form.Group controlId="name" className="mt-3">
                        <Form.Label>Nama Admin</Form.Label>
                        <Form.Control
                            type="text"
                            value={adminData.name}
                            readOnly={!isEditing}
                            onChange={(e) => setAdminData({ ...adminData, name: e.target.value })}
                        />
                    </Form.Group>

                    <Form.Group controlId="email" className="mt-3">
                        <Form.Label>Email Admin</Form.Label>
                        <Form.Control
                            type="email"
                            value={adminData.email}
                            readOnly={!isEditing}
                            onChange={(e) => setAdminData({ ...adminData, email: e.target.value })}
                        />
                    </Form.Group>

                    <Form.Group controlId="password" className="mt-3">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            value={adminData.password}
                            readOnly={!isEditing}
                            onChange={(e) => setAdminData({ ...adminData, password: e.target.value })}
                        />
                    </Form.Group>

                    {isEditing ? (
                        <Button variant="success" type="submit" className="mt-3">
                            Save Changes
                        </Button>
                    ) : (
                        <Button variant="primary" onClick={() => setIsEditing(true)} className="mt-3">
                            Edit Account
                        </Button>
                    )}
                </Form>
            </Container>
        </>
    );
};

export default AdminAccount;
