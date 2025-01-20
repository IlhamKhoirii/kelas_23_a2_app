import React, { useState, useEffect } from "react";
import { Container, Table, Button, Form, Modal, Navbar, Nav, Dropdown } from "react-bootstrap";
import { FaEdit, FaTrash, FaPlus, FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./AdminProductList.css";

const AdminProductList = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showCategoryModal, setShowCategoryModal] = useState(false);
    const [productForm, setProductForm] = useState({ id_kategori: "", nama_produk: "", deskripsi: "", harga: "", stok: "", gambar: null });
    const [categoryForm, setCategoryForm] = useState({ nama_kategori: "", deskripsi: "", gambar_kategori: null });
    const [isEditing, setIsEditing] = useState(false);
    const [editProductId, setEditProductId] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/produk");
                setProducts(response.data);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        const fetchCategories = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/kategori");
                setCategories(response.data);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };

        fetchProducts();
        fetchCategories();
    }, []);

    // Open modal to add or edit product
    const handleShowModal = (product = null) => {
        if (product) {
            setProductForm(product);
            setIsEditing(true);
            setEditProductId(product.id_produk);
        } else {
            setProductForm({ id_kategori: "", nama_produk: "", deskripsi: "", harga: "", stok: "", gambar: null });
            setIsEditing(false);
        }
        setShowModal(true);
    };

    // Open modal to add category
    const handleShowCategoryModal = () => {
        setCategoryForm({ nama_kategori: "", deskripsi: "", gambar_kategori: null });
        setShowCategoryModal(true);
    };

    // Close modal
    const handleCloseModal = () => setShowModal(false);
    const handleCloseCategoryModal = () => setShowCategoryModal(false);

    // Handle form changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setProductForm({ ...productForm, [name]: value });
    };

    // Handle category form changes
    const handleCategoryChange = (e) => {
        const { name, value } = e.target;
        setCategoryForm({ ...categoryForm, [name]: value });
    };

    // Handle image file input
    const handleImageChange = (e) => {
        setProductForm({ ...productForm, gambar: e.target.files[0] });
    };

    // Handle category image file input
    const handleCategoryImageChange = (e) => {
        setCategoryForm({ ...categoryForm, gambar_kategori: e.target.files[0] });
    };

    // Add or update product
    const handleSaveProduct = async () => {
        const formData = new FormData();
        formData.append("id_kategori", productForm.id_kategori);
        formData.append("nama_produk", productForm.nama_produk);
        formData.append("deskripsi", productForm.deskripsi);
        formData.append("harga", productForm.harga);
        formData.append("stok", productForm.stok);
        if (productForm.gambar) {
            formData.append("gambar", productForm.gambar);
        }

        try {
            if (isEditing) {
                await axios.put(`http://localhost:5000/api/produk/${editProductId}`, formData);
            } else {
                await axios.post("http://localhost:5000/api/produk", formData);
            }
            const response = await axios.get("http://localhost:5000/api/produk");
            setProducts(response.data);
        } catch (error) {
            console.error("Error saving product:", error);
        }

        handleCloseModal();
    };

    // Add category
    const handleSaveCategory = async () => {
        const formData = new FormData();
        formData.append("nama_kategori", categoryForm.nama_kategori);
        formData.append("deskripsi", categoryForm.deskripsi);
        if (categoryForm.gambar_kategori) {
            formData.append("gambar_kategori", categoryForm.gambar_kategori);
        }

        try {
            await axios.post("http://localhost:5000/api/kategori", formData);
            const response = await axios.get("http://localhost:5000/api/kategori");
            setCategories(response.data);
        } catch (error) {
            console.error("Error saving category:", error);
        }

        handleCloseCategoryModal();
    };

    // Delete product
    const handleDeleteProduct = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/produk/${id}`);
            setProducts(products.filter((product) => product.id_produk !== id));
        } catch (error) {
            console.error("Error deleting product:", error);
        }
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
                <Button variant="primary" className="mb-3 me-2" onClick={() => handleShowModal()}>
                    <FaPlus /> Tambah Produk
                </Button>
                <Button variant="secondary" className="mb-3" onClick={() => handleShowCategoryModal()}>
                    <FaPlus /> Tambah Kategori
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
                            <tr key={product.id_produk}>
                                <td>{product.id_produk}</td>
                                <td>{product.nama_produk}</td>
                                <td>Rp {parseFloat(product.harga).toLocaleString()}</td>
                                <td>{product.stok}</td>
                                <td>
                                    {product.gambar ? (
                                        <img
                                            src={`http://localhost:5000/uploads/${product.gambar}`}
                                            alt={product.nama_produk}
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
                                    <Button variant="danger" size="sm" onClick={() => handleDeleteProduct(product.id_produk)}>
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
                            <Form.Group controlId="formProductCategory" className="mb-3">
                                <Form.Label>Kategori Produk</Form.Label>
                                <Form.Control
                                    as="select"
                                    name="id_kategori"
                                    value={productForm.id_kategori}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Pilih Kategori</option>
                                    {categories.map((category) => (
                                        <option key={category.id_kategori} value={category.id_kategori}>
                                            {category.nama_kategori}
                                        </option>
                                    ))}
                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId="formProductName" className="mb-3">
                                <Form.Label>Nama Produk</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="nama_produk"
                                    value={productForm.nama_produk}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                            <Form.Group controlId="formProductDescription" className="mb-3">
                                <Form.Label>Deskripsi</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    name="deskripsi"
                                    value={productForm.deskripsi}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                            <Form.Group controlId="formProductPrice" className="mb-3">
                                <Form.Label>Harga</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="harga"
                                    value={productForm.harga}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                            <Form.Group controlId="formProductStock" className="mb-3">
                                <Form.Label>Stok</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="stok"
                                    value={productForm.stok}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                            <Form.Group controlId="formProductImage" className="mb-3">
                                <Form.Label>Gambar Produk</Form.Label>
                                <Form.Control
                                    type="file"
                                    name="gambar"
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

                {/* Modal for Adding Category */}
                <Modal show={showCategoryModal} onHide={handleCloseCategoryModal} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Tambah Kategori</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group controlId="formCategoryName" className="mb-3">
                                <Form.Label>Nama Kategori</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="nama_kategori"
                                    value={categoryForm.nama_kategori}
                                    onChange={handleCategoryChange}
                                    required
                                />
                            </Form.Group>
                            <Form.Group controlId="formCategoryDescription" className="mb-3">
                                <Form.Label>Deskripsi</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    name="deskripsi"
                                    value={categoryForm.deskripsi}
                                    onChange={handleCategoryChange}
                                    required
                                />
                            </Form.Group>
                            <Form.Group controlId="formCategoryImage" className="mb-3">
                                <Form.Label>Gambar Kategori</Form.Label>
                                <Form.Control
                                    type="file"
                                    name="gambar_kategori"
                                    accept="image/*"
                                    onChange={handleCategoryImageChange}
                                />
                            </Form.Group>
                            <Button variant="primary" onClick={handleSaveCategory}>
                                Tambah Kategori
                            </Button>
                        </Form>
                    </Modal.Body>
                </Modal>
            </Container>
        </div>
    );
};

export default AdminProductList;