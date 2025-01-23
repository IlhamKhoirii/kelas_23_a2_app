import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Table, Navbar, Nav, Dropdown } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./AdminFeedback.css";

const AdminFeedback = () => {
    const navigate = useNavigate();
    const [feedbackData, setFeedbackData] = useState([]);

    useEffect(() => {
        const fetchFeedback = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/feedback");
                setFeedbackData(response.data);
            } catch (error) {
                console.error("Error fetching feedback data:", error);
            }
        };
        fetchFeedback();
    }, []);

    const handleLogout = () => {
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
                            <th>Nama User</th>
                            <th>Email</th>
                            <th>Pesan</th>
                        </tr>
                    </thead>
                    <tbody>
                        {feedbackData.map((feedback, index) => (
                            <tr key={feedback.id_feedback}>
                                <td>{index + 1}</td>
                                <td>{feedback.id_user}</td>
                                <td>{feedback.nama_user}</td>
                                <td>{feedback.email}</td>
                                <td>{feedback.pesan}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        </>
    );
};

export default AdminFeedback;
