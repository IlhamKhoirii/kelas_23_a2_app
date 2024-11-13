// src/components/StoreInfo/StoreInfo.js
import React from 'react';
import './StoreInfo.css';
import { Navbar, Nav, Container, InputGroup, FormControl, Button, Image, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaSearch, FaUserCircle, FaShoppingCart } from 'react-icons/fa';

const StoreInfo = () => {
    // Placeholder variables for profile picture and cart items
    const profilePicture = ""; // Replace with actual profile picture URL or state
    const cartItems = []; // Replace with actual cart items or state

    // Placeholder function for handling profile click
    const handleProfileClick = () => {
        console.log("Profile clicked");
    };

    return (
        <div>
            {/* Navbar */}
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

            {/* Store Information Content */}
            <div className="store-info-container">
                <h1 className="store-title">Informasi Toko</h1>
                <p className="store-description">
                Selamat datang di toko kelontong online kami! Kami menyediakan berbagai kebutuhan sehari-hari untuk membuat pengalaman berbelanja Anda mudah dan nyaman.
                </p>
                <p className="delivery-restriction">
                    <strong>Cakupan Pengiriman:</strong> Saat ini, kami hanya melayani pengiriman di tingkat kabupaten. Pastikan alamat Anda berada di dalam area ini untuk melakukan pemesanan.
                </p>
                <div className="contact-info">
                    <h3>Kontak kami</h3>
                    <p>Email: support@gmail.com</p>
                    <p>Telepon: (123) 456-7890</p>
                </div>
            </div>

        </div>
    );
};

export default StoreInfo;
