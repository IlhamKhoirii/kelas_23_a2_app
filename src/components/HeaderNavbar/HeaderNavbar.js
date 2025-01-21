import React, { useContext, useState } from "react";
import { Navbar, Container, Nav, InputGroup, FormControl, Button, Badge, Modal } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { FaSearch, FaUserCircle, FaShoppingCart } from "react-icons/fa";
import { UserContext } from "../../context/UserContext";
import axios from "axios";
import "./HeaderNavbar.css";

const HeaderNavbar = ({ cartItems = [], handleProfileClick }) => {
    const { namaPengguna } = useContext(UserContext);
    const [searchQuery, setSearchQuery] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState("");
    const navigate = useNavigate();

    const handleSearch = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/produk", {
                params: { query: searchQuery }
            });
            if (response.data.length > 0) {
                navigate(`/products/${response.data[0].id_produk}`);
            } else {
                setModalMessage("Barang tidak tersedia");
                setShowModal(true);
            }
        } catch (error) {
            console.error("Error searching for product:", error);
            setModalMessage("Terjadi kesalahan saat mencari barang");
            setShowModal(true);
        }
    };

    const handleCloseModal = () => setShowModal(false);

    return (
        <>
            <Navbar bg="light" expand="lg" className="mb-4">
                <Container>
                    <Navbar.Brand href="/"><h1>Toko Yenni</h1></Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto d-flex align-items-center">
                            {/* Navbar Links */}
                            <Nav.Link as={Link} to="/" className="me-3">Beranda</Nav.Link>
                            <Nav.Link as={Link} to="/products" className="me-3">Produk</Nav.Link>
                            <Nav.Link as={Link} to="/store-info" className="me-3">Informasi Toko</Nav.Link>

                            {/* Search Bar */}
                            <InputGroup className="me-3 search-bar">
                                <FormControl
                                    type="search"
                                    placeholder="Cari barang..."
                                    aria-label="Search"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                                <Button variant="outline-success" onClick={handleSearch}>
                                    <FaSearch />
                                </Button>
                            </InputGroup>

                            {/* Profile Section */}
                            <Nav.Link onClick={handleProfileClick} className="d-flex align-items-center me-3 profile-section">
                                <FaUserCircle size={32} className="me-2 profile-picture" />
                                <span className="user-name">{namaPengguna}</span>
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

            {/* Modal for search results */}
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Pemberitahuan</Modal.Title>
                </Modal.Header>
                <Modal.Body>{modalMessage}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Tutup
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default HeaderNavbar;