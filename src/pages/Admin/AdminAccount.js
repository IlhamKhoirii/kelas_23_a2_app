import React, { useState, useEffect, useContext } from "react";
import { Form, Button, Container, Navbar, Nav, Dropdown } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserContext } from "../../context/UserContext";
import "./AdminAccount.css";

const AdminAccount = () => {
    const navigate = useNavigate();
    const { userId, namaPengguna, emailPengguna, updateNamaPengguna, updateEmailPengguna } = useContext(UserContext);
    const [adminData, setAdminData] = useState({
        id_user: userId,
        nama_user: namaPengguna,
        email: emailPengguna,
        password: "",
    });
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAdminData = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/users/${userId}`);
                setAdminData(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching admin data:", error);
                setError("Gagal memuat data admin.");
                setLoading(false);
            }
        };

        if (userId) {
            fetchAdminData();
        }
    }, [userId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:5000/api/users/profile/${adminData.id_user}`, adminData);
            setIsEditing(false); // Disable editing mode after saving
            updateNamaPengguna(adminData.nama_user);
            updateEmailPengguna(adminData.email);
            toast.success("Data Berhasil Diperbarui"); // Tampilkan notifikasi sukses
        } catch (error) {
            console.error("Error updating admin data:", error);
            toast.error("Gagal memperbarui data admin."); // Tampilkan notifikasi error
        }
    };

    const handleLogout = () => {
        // Clear authentication and navigate to login
        localStorage.removeItem("authToken");
        navigate("/login");
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

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

            {/* Admin Account Content */}
            <Container className="admin-account-container mt-4">
                <h2>Informasi Akun Admin</h2>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="adminId">
                        <Form.Label>Admin ID</Form.Label>
                        <Form.Control
                            type="text"
                            value={adminData.id_user}
                            readOnly
                        />
                    </Form.Group>

                    <Form.Group controlId="name" className="mt-3">
                        <Form.Label>Nama Admin</Form.Label>
                        <Form.Control
                            type="text"
                            value={adminData.nama_user}
                            readOnly={!isEditing}
                            onChange={(e) => setAdminData({ ...adminData, nama_user: e.target.value })}
                        />
                    </Form.Group>

                    <Form.Group controlId="email" className="mt-3">
                        <Form.Label>Email Admin</Form.Label>
                        <Form.Control
                            type="email"
                            value={adminData.email}
                            readOnly={!isEditing}
                            onChange={(e) => setAdminData({ ...adminData, email: e.target.value })}
                        />
                    </Form.Group>

                    <Form.Group controlId="password" className="mt-3">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            value={adminData.password}
                            readOnly={!isEditing}
                            onChange={(e) => setAdminData({ ...adminData, password: e.target.value })}
                        />
                    </Form.Group>

                    {isEditing ? (
                        <Button variant="success" type="submit" className="mt-3">
                            Save Changes
                        </Button>
                    ) : (
                        <Button variant="primary" onClick={() => setIsEditing(true)} className="mt-3">
                            Update Account
                        </Button>
                    )}
                </Form>
            </Container>

            <ToastContainer />
        </>
    );
};

export default AdminAccount;