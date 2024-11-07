// src/components/Admin/AdminProductList.js
import React, { useState } from "react";
import { Container, Table, Button, Form, Modal, Navbar, Nav, Dropdown } from "react-bootstrap";
import { FaEdit, FaTrash, FaPlus, FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./AdminProductList.css";

const AdminProductList = () => {
    const navigate = useNavigate();

    // Mock product data
    const [products, setProducts] = useState([
        { id: 1, name: "Product 1", price: 10000, stock: 10, image: null },
        { id: 2, name: "Product 2", price: 20000, stock: 5, image: null },
    ]);

    const [showModal, setShowModal] = useState(false);
    const [productForm, setProductForm] = useState({ name: "", price: "", stock: "", image: null });
    const [isEditing, setIsEditing] = useState(false);
    const [editProductId, setEditProductId] = useState(null);

    // Open modal to add or edit product
    const handleShowModal = (product = null) => {
        if (product) {
            setProductForm(product);
            setIsEditing(true);
            setEditProductId(product.id);
        } else {
            setProductForm({ name: "", price: "", stock: "", image: null });
            setIsEditing(false);
        }
        setShowModal(true);
    };

    // Close modal
    const handleCloseModal = () => setShowModal(false);

    // Handle form changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setProductForm({ ...productForm, [name]: value });
    };

    // Handle image file input
    const handleImageChange = (e) => {
        setProductForm({ ...productForm, image: e.target.files[0] });
    };

    // Add or update product
    const handleSaveProduct = () => {
        if (isEditing) {
            setProducts((prev) =>
                prev.map((product) =>
                    product.id === editProductId ? { ...productForm, id: editProductId } : product
                )
            );
        } else {
            setProducts((prev) => [...prev, { ...productForm, id: Date.now() }]);
        }
        handleCloseModal();
    };

    // Delete product
    const handleDeleteProduct = (id) => {
        setProducts(products.filter((product) => product.id !== id));
    };

    // Handle logout
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

            {/* Product Management Section */}
            <Container className="mt-4">
                <h2>Manajemen Produk</h2>
                <Button variant="primary" className="mb-3" onClick={() => handleShowModal()}>
                    <FaPlus /> Tambah Produk
                </Button>

                {/* Products Table */}
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nama Produk</th>
                            <th>Harga</th>
                            <th>Stok</th>
                            <th>Gambar</th>
                            <th>Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product.id}>
                                <td>{product.id}</td>
                                <td>{product.name}</td>
                                <td>Rp {product.price.toLocaleString()}</td>
                                <td>{product.stock}</td>
                                <td>
                                    {product.image ? (
                                        <img
                                            src={URL.createObjectURL(product.image)}
                                            alt={product.name}
                                            width="50"
                                            height="50"
                                        />
                                    ) : (
                                        "No Image"
                                    )}
                                </td>
                                <td>
                                    <Button variant="warning" size="sm" className="me-2" onClick={() => handleShowModal(product)}>
                                        <FaEdit /> Edit
                                    </Button>
                                    <Button variant="danger" size="sm" onClick={() => handleDeleteProduct(product.id)}>
                                        <FaTrash /> Hapus
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>

                {/* Modal for Adding/Editing Product */}
                <Modal show={showModal} onHide={handleCloseModal} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>{isEditing ? "Edit Produk" : "Tambah Produk"}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group controlId="formProductName" className="mb-3">
                                <Form.Label>Nama Produk</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="name"
                                    value={productForm.name}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                            <Form.Group controlId="formProductPrice" className="mb-3">
                                <Form.Label>Harga</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="price"
                                    value={productForm.price}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                            <Form.Group controlId="formProductStock" className="mb-3">
                                <Form.Label>Stok</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="stock"
                                    value={productForm.stock}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                            <Form.Group controlId="formProductImage" className="mb-3">
                                <Form.Label>Gambar Produk</Form.Label>
                                <Form.Control
                                    type="file"
                                    name="image"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                />
                            </Form.Group>
                            <Button variant="primary" onClick={handleSaveProduct}>
                                {isEditing ? "Update Produk" : "Tambah Produk"}
                            </Button>
                        </Form>
                    </Modal.Body>
                </Modal>
            </Container>
        </div>
    );
};

export default AdminProductList;
