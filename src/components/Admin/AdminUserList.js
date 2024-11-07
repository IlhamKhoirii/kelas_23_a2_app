// src/components/Admin/AdminUserList.js
import React, { useState } from "react";
import { Container, Table, Button, Navbar, Nav, Dropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import "./AdminUserList.css";

const AdminUserList = () => {
    const navigate = useNavigate();

    // Mock data for users (in a real app, fetch this data from an API)
    const [users] = useState([
        { id: 1, username: "john_doe", email: "john@example.com", address: "123 Main St, City A" },
        { id: 2, username: "jane_smith", email: "jane@example.com", address: "456 Oak St, City B" },
        { id: 3, username: "alex_jones", email: "alex@example.com", address: "789 Pine St, City C" },
    ]);

    // Total users state
    const totalUsers = users.length;

    // Handle logout function
    const handleLogout = () => {
        localStorage.removeItem("authToken");
        localStorage.removeItem("userRole");
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

            {/* User Management Section */}
            <Container className="admin-user-list mt-4">
                <h2>Manajemen Pengguna</h2>
                <p>Total Pengguna Terdaftar: <strong>{totalUsers}</strong></p>

                {/* Users Table */}
                <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Alamat</th>
                            <th>Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                                <td>{user.address}</td>
                                <td>
                                    <Button variant="warning" size="sm" className="me-2">
                                        Lihat Detail
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        </>
    );
};

export default AdminUserList;
