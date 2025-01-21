import React, { useReducer, useState, useEffect } from "react";
import {
    Modal,
    Button,
    Image,
    InputGroup,
    FormControl,
    Alert,
    Spinner,
} from "react-bootstrap";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// State awal untuk reducer
const initialState = { quantity: 1 };

// Reducer untuk mengatur jumlah produk
function quantityReducer(state, action) {
    switch (action.type) {
        case "increment":
            return { quantity: Math.min(state.quantity + 1, action.stock) }; // Tidak melebihi stok
        case "decrement":
            return { quantity: Math.max(state.quantity - 1, 1) }; // Tidak kurang dari 1
        case "set":
            return { quantity: Math.max(1, Math.min(action.value, action.stock)) }; // Validasi input manual
        default:
            throw new Error("Aksi tidak valid");
    }
}

const ProductDetailModal = ({ show, onHide, productId, addToCart }) => {
    const [product, setProduct] = useState(null);
    const [state, dispatch] = useReducer(quantityReducer, initialState);
    const [loading, setLoading] = useState(false); // State untuk loading
    const [error, setError] = useState(null); // State untuk menangkap error

    useEffect(() => {
        if (productId) {
            // Ambil detail produk dari backend berdasarkan ID
            const fetchProduct = async () => {
                setLoading(true);
                setError(null);
                try {
                    const response = await axios.get(
                        `http://localhost:5000/api/produk/${productId}`
                    );
                    setProduct(response.data); // Pastikan data dari API sesuai dengan model Produk.js
                } catch (err) {
                    setError("Gagal memuat detail produk. Silakan coba lagi.");
                    console.error("Error:", err.message);
                } finally {
                    setLoading(false);
                }
            };
            fetchProduct();
        }
    }, [productId]);

    // Fungsi untuk menambahkan produk ke keranjang
    const handleAddToCart = () => {
        if (!product) return;

        addToCart(product, state.quantity);

        // Tampilkan notifikasi sukses menggunakan toastify
        toast.success("Barang berhasil ditambahkan dalam Keranjang!");

        // Tutup modal setelah menambahkan ke keranjang
        setTimeout(() => {
            onHide();
        }, 2000);
    };

    if (!show) return null;

    return (
        <>
            <Modal show={show} onHide={onHide} centered>
                <Modal.Header closeButton>
                    <Modal.Title>
                        {loading
                            ? "Memuat..."
                            : product
                            ? product.nama_produk
                            : "Produk Tidak Ditemukan"}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {loading && (
                        <div className="text-center">
                            <Spinner animation="border" variant="primary" />
                            <p>Memuat detail produk...</p>
                        </div>
                    )}
                    {error && <Alert variant="danger">{error}</Alert>}
                    {product && !loading && (
                        <>
                            {/* Gambar produk */}
                            <Image
                                src={`http://localhost:5000/uploads/${product.gambar}`}
                                fluid
                                className="mb-3"
                            />
                            {/* Detail produk */}
                            <p>
                                <strong>Harga:</strong> Rp
                                {parseFloat(product.harga).toLocaleString()}
                            </p>
                            <p>
                                <strong>Stok:</strong> {product.stok}
                            </p>
                            <p>
                                <strong>Deskripsi:</strong> {product.deskripsi}
                            </p>
                            <p>
                                <strong>Terjual:</strong> {product.terjual}
                            </p>
                            {/* Input untuk jumlah produk */}
                            <InputGroup className="mb-3">
                                <Button
                                    variant="outline-secondary"
                                    onClick={() => dispatch({ type: "decrement" })}
                                >
                                    -
                                </Button>
                                <FormControl
                                    type="number"
                                    value={state.quantity}
                                    onChange={(e) =>
                                        dispatch({
                                            type: "set",
                                            value: Number(e.target.value),
                                            stock: product.stok,
                                        })
                                    }
                                />
                                <Button
                                    variant="outline-secondary"
                                    onClick={() =>
                                        dispatch({
                                            type: "increment",
                                            stock: product.stok,
                                        })
                                    }
                                >
                                    +
                                </Button>
                            </InputGroup>
                        </>
                    )}
                </Modal.Body>
                
                <Modal.Footer>
                    {/* Tombol tambah ke keranjang */}
                    <Button
                        variant="primary"
                        onClick={handleAddToCart}
                        disabled={!product || loading}
                    >
                        Tambah ke Keranjang
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Toast Container */}
            <ToastContainer />
        </>
    );
};

export default ProductDetailModal;