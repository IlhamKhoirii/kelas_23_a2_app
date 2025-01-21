import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import NavbarAdmin from "../../components/NavbarAdmin/NavbarAdmin";
import "./AdminDashboard.css";

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [totalUsers, setTotalUsers] = useState(0);
    const [totalOrders, setTotalOrders] = useState(0);
    const [totalProducts, setTotalProducts] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const usersResponse = await axios.get("http://localhost:5000/api/users");
                setTotalUsers(usersResponse.data.length);

                const ordersResponse = await axios.get("http://localhost:5000/api/pesanan");
                setTotalOrders(ordersResponse.data.length);

                const productsResponse = await axios.get("http://localhost:5000/api/produk");
                setTotalProducts(productsResponse.data.length);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("authToken");
        localStorage.removeItem("userRole");
        window.location.href = "/login";
    };

    return (
        <div className="admin-dashboard">
            <NavbarAdmin handleLogout={handleLogout} />
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

                    {/* Total Orders Section */}
                    <Col md={4}>
                        <Card className="text-center mb-3">
                            <Card.Body>
                                <Card.Title>Total Pemesanan</Card.Title>
                                <Card.Text>
                                    <h4>{totalOrders}</h4>
                                    Pemesanan Baru
                                </Card.Text>
                                <Button variant="primary" onClick={() => navigate("/admin/orders")}>
                                    Lihat Daftar Pemesanan
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