import React, { useState, useEffect } from "react";
import { Container, Table, Button, Form, Modal, Navbar, Nav, Dropdown } from "react-bootstrap";
import { FaEdit, FaTrash, FaPlus, FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import NavbarAdmin from "../../components/NavbarAdmin/NavbarAdmin";
import 'react-toastify/dist/ReactToastify.css';

const AdminProductList = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showCategoryModal, setShowCategoryModal] = useState(false);
    const [showDeleteCategoryModal, setShowDeleteCategoryModal] = useState(false); // State untuk modal hapus kategori
    const [productForm, setProductForm] = useState({ id_kategori: "", nama_produk: "", deskripsi: "", harga: "", stok: "", gambar: null });
    const [categoryForm, setCategoryForm] = useState({ nama_kategori: "", deskripsi: "", gambar_kategori: null });
    const [isEditing, setIsEditing] = useState(false);
    const [editProductId, setEditProductId] = useState(null);
    const [selectedCategoryId, setSelectedCategoryId] = useState(null); // State untuk kategori yang dipilih untuk dihapus

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

    const handleShowCategoryModal = () => {
        setCategoryForm({ nama_kategori: "", deskripsi: "", gambar_kategori: null });
        setShowCategoryModal(true);
    };

    const handleShowDeleteCategoryModal = () => {
        setShowDeleteCategoryModal(true);
    };

    const handleCloseModal = () => setShowModal(false);
    const handleCloseCategoryModal = () => setShowCategoryModal(false);
    const handleCloseDeleteCategoryModal = () => setShowDeleteCategoryModal(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProductForm({ ...productForm, [name]: value });
    };

    const handleCategoryChange = (e) => {
        const { name, value } = e.target;
        setCategoryForm({ ...categoryForm, [name]: value });
    };

    const handleImageChange = (e) => {
        setProductForm({ ...productForm, gambar: e.target.files[0] });
    };

    const handleCategoryImageChange = (e) => {
        setCategoryForm({ ...categoryForm, gambar_kategori: e.target.files[0] });
    };

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
                toast.success("Produk Berhasil Ditambahkan"); // Notifikasi sukses
            }
            const response = await axios.get("http://localhost:5000/api/produk");
            setProducts(response.data);
        } catch (error) {
            console.error("Error saving product:", error);
        }

        handleCloseModal();
    };

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
            toast.success("Kategori Berhasil Ditambahkan"); // Notifikasi sukses
        } catch (error) {
            console.error("Error saving category:", error);
        }

        handleCloseCategoryModal();
    };

    const handleDeleteProduct = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/produk/${id}`);
            setProducts(products.filter((product) => product.id_produk !== id));
            toast.success("Produk Berhasil Terhapus");
        } catch (error) {
            console.error("Error deleting product:", error);
            toast.error("Gagal menghapus produk");
        }
    };

    const handleDeleteCategory = async () => {
        try {
            await axios.delete(`http://localhost:5000/api/kategori/${selectedCategoryId}`);
            setCategories(categories.filter((category) => category.id_kategori !== selectedCategoryId));
            toast.success("Kategori Berhasil Dihapus");
        } catch (error) {
            console.error("Error deleting category:", error);
            toast.error("Gagal menghapus kategori");
        }
        handleCloseDeleteCategoryModal();
    };

    const handleLogout = () => {
        localStorage.removeItem("authToken");
        sessionStorage.clear();
        navigate("/login");
    };

    return (
        <div>
            {/* Admin Dashboard Navbar */}
            <NavbarAdmin handleLogout={handleLogout} />

            {/* Product Management Section */}
            <Container className="mt-4">
                <h2>Manajemen Produk</h2>
                <Button variant="primary" className="mb-3 me-2" onClick={() => handleShowModal()}>
                    <FaPlus /> Tambah Produk
                </Button>
                <Button variant="secondary" className="mb-3 me-2" onClick={() => handleShowCategoryModal()}>
                    <FaPlus /> Tambah Kategori
                </Button>
                <Button variant="danger" className="mb-3" onClick={() => handleShowDeleteCategoryModal()}>
                    <FaTrash /> Hapus Kategori
                </Button>

                {/* Products Table */}
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nama Produk</th>
                            <th>Kategori</th>
                            <th>Harga</th>
                            <th>Stok</th>
                            <th>Gambar</th>
                            <th>Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => {
                            const category = categories.find(cat => cat.id_kategori === product.id_kategori);
                            return (
                                <tr key={product.id_produk}>
                                    <td>{product.id_produk}</td>
                                    <td>{product.nama_produk}</td>
                                    <td>{category ? category.nama_kategori : "Tidak ada kategori"}</td>
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
                            );
                        })}
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

                {/* Modal for Deleting Category */}
                <Modal show={showDeleteCategoryModal} onHide={handleCloseDeleteCategoryModal} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Hapus Kategori</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group controlId="formDeleteCategory" className="mb-3">
                                <Form.Label>Pilih Kategori untuk Dihapus</Form.Label>
                                <Form.Control
                                    as="select"
                                    value={selectedCategoryId}
                                    onChange={(e) => setSelectedCategoryId(e.target.value)}
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
                            <Button variant="danger" onClick={handleDeleteCategory}>
                                Hapus Kategori
                            </Button>
                        </Form>
                    </Modal.Body>
                </Modal>
            </Container>
            <ToastContainer />
        </div>
    );
};

export default AdminProductList;