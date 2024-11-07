// src/components/Admin/AdminFeedback.js
import React, { useState } from "react";
import { Container, Table, Navbar, Nav, Dropdown } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./AdminFeedback.css";

const AdminFeedback = () => {
    const navigate = useNavigate();

    const [feedbackData] = useState([
        // Mock data for user feedback (in a real app, fetch this data from an API)
        {
            id: 1,
            userId: "U001",
            username: "john_doe",
            email: "john.doe@example.com",
            message: "The website frequently crashes when I try to place an order.",
        },
        {
            id: 2,
            userId: "U002",
            username: "jane_smith",
            email: "jane.smith@example.com",
            message: "There is an error on the checkout page. I cannot complete my purchase.",
        },
        {
            id: 3,
            userId: "U003",
            username: "alice_jones",
            email: "alice.jones@example.com",
            message: "The search function does not work properly on mobile devices.",
        },
    ]);

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
                            <Nav.Link onClick={() => navigate("/admin/feedback")}>User Feedback</Nav.Link>
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

            {/* Feedback Content */}
            <Container className="admin-feedback mt-4">
                <h2>User Feedback</h2>

                {/* Feedback Table */}
                <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>User ID</th>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Message</th>
                        </tr>
                    </thead>
                    <tbody>
                        {feedbackData.map((feedback, index) => (
                            <tr key={feedback.id}>
                                <td>{index + 1}</td>
                                <td>{feedback.userId}</td>
                                <td>{feedback.username}</td>
                                <td>{feedback.email}</td>
                                <td>{feedback.message}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        </>
    );
};

export default AdminFeedback;
