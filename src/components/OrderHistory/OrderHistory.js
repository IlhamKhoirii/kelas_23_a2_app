// src/components/OrderHistory/OrderHistory.js
import React, { useState, useContext } from "react";
import {
    Navbar,
    Container,
    Nav,
    FormControl,
    Button,
    Table,
    Badge,
    Image,
    InputGroup,
} from "react-bootstrap";
import { FaSearch, FaShoppingCart, FaUserCircle } from "react-icons/fa";
import { UserContext } from "../../context/UserContext";
import { Link } from "react-router-dom";
import UserProfileModal from "../Profile/UserProfileModal";
import "./OrderHistory.css"; // Import CSS untuk styling

const OrderHistory = () => {
    const { profilePicture } = useContext(UserContext);
    const [showProfileModal, setShowProfileModal] = useState(false);
    const [cartItems] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState("Semua");

    const handleProfileClick = () => setShowProfileModal(true);
    const handleCloseModal = () => setShowProfileModal(false);

    // Contoh data pesanan
    const orders = [
        { id: 1, date: "2024-10-15", status: "Selesai", total: 150000 },
        { id: 2, date: "2024-10-10", status: "Dikirim", total: 75000 },
        { id: 3, date: "2024-10-05", status: "Belum Bayar", total: 50000 },
        { id: 4, date: "2024-09-20", status: "Dibatalkan", total: 90000 },
        { id: 5, date: "2024-09-15", status: "Sedang Dikemas", total: 120000 },
        { id: 6, date: "2024-09-10", status: "Pengembalian Barang", total: 60000 },
    ];

    // Filter pesanan berdasarkan status yang dipilih
    const filteredOrders = selectedStatus === "Semua" ? orders : orders.filter(order => order.status === selectedStatus);

    return (
        <div className="page-container">
            <div className="content-wrap">
                {/* Header Navbar */}
                <Navbar bg="light" expand="lg" className="mb-4">
            <Container>
                <Navbar.Brand href="/"><h1>Toko Yenni</h1></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto d-flex align-items-center">
                        {/* Added Navbar Links */}
                        <Nav.Link as={Link} to="/" className="me-3">Beranda</Nav.Link>
                        <Nav.Link as={Link} to="/products" className="me-3">Produk</Nav.Link>
                        <Nav.Link as={Link} to="/store-info" className="me-3">Informasi Toko</Nav.Link>

                        {/* Search Bar */}
                        <InputGroup className="me-3 search-bar">
                            <FormControl type="search" placeholder="Cari barang..." aria-label="Search" />
                            <Button variant="outline-success">
                                <FaSearch />
                            </Button>
                        </InputGroup>

                        {/* Profile Section */}
                        <Nav.Link onClick={handleProfileClick} className="d-flex align-items-center me-3 profile-section">
                            {profilePicture ? (
                                <Image src={profilePicture} roundedCircle width={32} height={32} alt="User" className="me-2 profile-picture" />
                            ) : (
                                <FaUserCircle size={32} className="me-2 profile-picture" />
                            )}
                            <span className="user-name">Evelyn</span>
                        </Nav.Link>

                        {/* Cart Icon with Badge */}
                        <Nav.Link as={Link} to="/cart" className="position-relative cart-icon">
                            <FaShoppingCart size={24} />
                            {cartItems.length > 0 && (
                                <Badge pill bg="danger" className="cart-badge position-absolute top-0 start-100 translate-middle">
                                    {cartItems.length}
                                </Badge>
                            )}
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
            </Navbar>

                {/* Filter Status */}
                <Container className="mt-4">
                    <h2>Riwayat Pesanan</h2>
                    <div className="d-flex justify-content-start my-3">
                        {["Semua", "Belum Bayar", "Sedang Dikemas", "Dikirim", "Selesai", "Dibatalkan", "Pengembalian Barang"].map((status) => (
                            <Button
                                key={status}
                                variant={selectedStatus === status ? "primary" : "outline-primary"}
                                onClick={() => setSelectedStatus(status)}
                                className="me-2"
                            >
                                {status}
                            </Button>
                        ))}
                    </div>

                    {/* Tabel Riwayat Pesanan */}
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Order ID</th>
                                <th>Tanggal</th>
                                <th>Status</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredOrders.map((order) => (
                                <tr key={order.id}>
                                    <td>{order.id}</td>
                                    <td>{order.date}</td>
                                    <td>{order.status}</td>
                                    <td>Rp{order.total.toLocaleString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Container>

                {/* User Profile Modal */}
                <UserProfileModal show={showProfileModal} handleClose={handleCloseModal} />
            </div>

            {/* Footer */}
            <footer className="footer">
                <p>&copy; 2024 Toko Kelontong. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default OrderHistory;
