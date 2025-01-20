import React, { useState, useEffect } from "react";
import { Container, Table, Button, Form, Modal, Navbar, Nav, Dropdown } from "react-bootstrap";
import { FaEdit, FaTrash, FaPlus, FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminUserList = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [alamatPelanggan, setAlamatPelanggan] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [userForm, setUserForm] = useState({ id_user: "", nama_user: "", email: "", alamat: "" });

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/users");
                setUsers(response.data);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };

        const fetchAlamatPelanggan = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/alamat-pelanggan");
                setAlamatPelanggan(response.data);
            } catch (error) {
                console.error("Error fetching alamat pelanggan:", error);
            }
        };

        fetchUsers();
        fetchAlamatPelanggan();
    }, []);

    const handleShowModal = (user = null) => {
        if (user) {
            const alamat = alamatPelanggan.find(alamat => alamat.id_user === user.id_user);
            setUserForm({ id_user: user.id_user, nama_user: user.nama_user, email: user.email, alamat: alamat ? alamat.alamat : "" });
            setIsEditing(true);
        } else {
            setUserForm({ id_user: "", nama_user: "", email: "", alamat: "" });
            setIsEditing(false);
        }
        setShowModal(true);
    };

    const handleCloseModal = () => setShowModal(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserForm({ ...userForm, [name]: value });
    };

    const handleSaveUser = async () => {
        const { id_user, nama_user, email, alamat } = userForm;

        try {
            if (isEditing) {
                await axios.put(`http://localhost:5000/api/users/${id_user}`, { nama_user, email });
                await axios.put(`http://localhost:5000/api/alamat-pelanggan/${id_user}`, { alamat });
                toast.success("Berhasil Update");
            } else {
                const userResponse = await axios.post("http://localhost:5000/api/users", { nama_user, email });
                const newUser = userResponse.data;
                await axios.post("http://localhost:5000/api/alamat-pelanggan", { id_user: newUser.id_user, alamat });
                toast.success("Pengguna Berhasil Ditambahkan");
            }
            const usersResponse = await axios.get("http://localhost:5000/api/users");
            setUsers(usersResponse.data);
            const alamatResponse = await axios.get("http://localhost:5000/api/alamat-pelanggan");
            setAlamatPelanggan(alamatResponse.data);
        } catch (error) {
            console.error("Error saving user:", error);
            toast.error("Gagal menyimpan pengguna");
        }

        handleCloseModal();
    };

    const handleDeleteUser = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/users/${id}`);
            setUsers(users.filter((user) => user.id_user !== id));
            toast.success("Pengguna Berhasil Terhapus");
        } catch (error) {
            console.error("Error deleting user:", error);
            toast.error("Gagal menghapus pengguna");
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("authToken");
        sessionStorage.clear();
        navigate("/login");
    };

    return (
        <div>
            {/* Admin Dashboard Navbar */}
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
            <Container className="mt-4">
                <h2>Manajemen Pengguna</h2>
                <Button variant="primary" className="mb-3" onClick={() => handleShowModal()}>
                    <FaPlus /> Tambah Pengguna
                </Button>

                {/* Users Table */}
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nama Pengguna</th>
                            <th>Email</th>
                            <th>Alamat</th>
                            <th>Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => {
                            const alamat = alamatPelanggan.find(alamat => alamat.id_user === user.id_user);
                            return (
                                <tr key={user.id_user}>
                                    <td>{user.id_user}</td>
                                    <td>{user.nama_user}</td>
                                    <td>{user.email}</td>
                                    <td>{alamat ? alamat.alamat : "Tidak ada alamat"}</td>
                                    <td>
                                        <Button variant="warning" size="sm" className="me-2" onClick={() => handleShowModal(user)}>
                                            <FaEdit /> Edit
                                        </Button>
                                        <Button variant="danger" size="sm" onClick={() => handleDeleteUser(user.id_user)}>
                                            <FaTrash /> Hapus
                                        </Button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
            </Container>

            {/* Modal for Adding/Editing User */}
            <Modal show={showModal} onHide={handleCloseModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>{isEditing ? "Edit Pengguna" : "Tambah Pengguna"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formUserName" className="mb-3">
                            <Form.Label>Nama Pengguna</Form.Label>
                            <Form.Control
                                type="text"
                                name="nama_user"
                                value={userForm.nama_user}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formUserEmail" className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                value={userForm.email}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formUserAlamat" className="mb-3">
                            <Form.Label>Alamat</Form.Label>
                            <Form.Control
                                as="textarea"
                                name="alamat"
                                value={userForm.alamat}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Button variant="primary" onClick={handleSaveUser}>
                            {isEditing ? "Update Pengguna" : "Tambah Pengguna"}
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>

            <ToastContainer />
        </div>
    );
};

export default AdminUserList;