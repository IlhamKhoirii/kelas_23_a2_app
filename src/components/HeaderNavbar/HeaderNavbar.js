// src/pages/components/HeaderNavbar.js
import React from "react";
import { Navbar, Container, Nav, InputGroup, FormControl, Button, Image, Badge } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { FaSearch, FaUserCircle, FaShoppingCart } from "react-icons/fa";
import "./HeaderNavbar.css";

const HeaderNavbar = ({ profilePicture, cartItems, handleProfileClick }) => {
    return (
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
    );
};

export default HeaderNavbar;
