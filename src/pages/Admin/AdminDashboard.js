import React, { useState, useEffect } from "react";
import { Navbar, Nav, Container, Button, Dropdown, Card, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import axios from "axios";
import "./AdminDashboard.css";

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [showLogoutMessage, setShowLogoutMessage] = useState(false);

    const [totalUsers, setTotalUsers] = useState(0);
    const [totalFeedback, setTotalFeedback] = useState(0);
    const [totalProducts, setTotalProducts] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch total users
                const usersResponse = await axios.get("http://localhost:5000/api/users");
                setTotalUsers(usersResponse.data.length);

                // Fetch total feedback (assuming there's an endpoint for feedback)
                const feedbackResponse = await axios.get("http://localhost:5000/api/feedback");
                setTotalFeedback(feedbackResponse.data.length);

                // Fetch total products
                const productsResponse = await axios.get("http://localhost:5000/api/produk/total");
                setTotalProducts(productsResponse.data.totalProduk);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

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

            {/* Overlay notification */}
            {showLogoutMessage && (
                <div className="logout-overlay">
                    <div className="logout-message">
                        <p>Anda berhasil Logout!</p>
                    </div>
                </div>
            )}

            <Container className="mt-4">
                <Row className="dashboard-summary">
                    {/* Total Users Section */}
                    <Col md={4}>
                        <Card className="text-center mb-3">
                            <Card.Body>
                                <Card.Title>Total Pengguna</Card.Title>
                                <Card.Text>
                                    <h4>{totalUsers}</h4>
                                    Pengguna Terdaftar
                                </Card.Text>
                                <Button variant="primary" onClick={() => navigate("/admin/users")}>
                                    Lihat Daftar Pengguna
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>

                    {/* Total Feedback Section */}
                    <Col md={4}>
                        <Card className="text-center mb-3">
                            <Card.Body>
                                <Card.Title>Total Feedback</Card.Title>
                                <Card.Text>
                                    <h4>{totalFeedback}</h4>
                                    Feedback Baru
                                </Card.Text>
                                <Button variant="primary" onClick={() => navigate("/admin/feedback")}>
                                    Lihat Feedback Pengguna
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>

                    {/* Total Products Section */}
                    <Col md={4}>
                        <Card className="text-center mb-3">
                            <Card.Body>
                                <Card.Title>Total Produk</Card.Title>
                                <Card.Text>
                                    <h4>{totalProducts}</h4>
                                    Produk Tersedia
                                </Card.Text>
                                <Button variant="primary" onClick={() => navigate("/admin/products")}>
                                    Lihat Daftar Produk
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default AdminDashboard;