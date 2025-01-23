import React from "react";
import { Navbar, Container, Nav, Dropdown } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const NavbarAdmin = ({ handleLogout }) => {
    const navigate = useNavigate();

    return (
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
    );
};

export default NavbarAdmin;