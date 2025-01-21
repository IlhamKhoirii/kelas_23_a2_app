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
import PropTypes from "prop-types";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const initialState = { quantity: 1 };

function quantityReducer(state, action) {
    switch (action.type) {
        case "increment":
            return { quantity: Math.min(state.quantity + 1, action.stock) };
        case "decrement":
            return { quantity: Math.max(state.quantity - 1, 1) };
        case "set":
            return { quantity: Math.max(1, Math.min(action.value, action.stock)) };
        default:
            throw new Error("Invalid action type");
    }
}

const ProductDetailModal = ({ show, onHide, productId, addToCart }) => {
    const [product, setProduct] = useState(null);
    const [state, dispatch] = useReducer(quantityReducer, initialState);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (productId) {
            const fetchProduct = async () => {
                setLoading(true);
                setError(null);
                try {
                    const response = await axios.get(
                        `http://localhost:5000/api/produk/${productId}`
                    );
                    setProduct(response.data);
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

    const handleAddToCart = () => {
        if (!product) return;

        if (typeof addToCart === "function") {
            addToCart(product, state.quantity);
            toast.success("Barang berhasil ditambahkan dalam Keranjang!");
            setTimeout(() => {
                onHide();
            }, 2000);
        } else {
            console.error("addToCart is not a function");
            toast.error("Terjadi kesalahan saat menambahkan produk ke keranjang.");
        }
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
                            <Image
                                src={`http://localhost:5000/uploads/${product.gambar}`}
                                fluid
                                className="mb-3"
                            />
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
                    <Button
                        variant="primary"
                        onClick={handleAddToCart}
                        disabled={!product || loading}
                    >
                        Tambah ke Keranjang
                    </Button>
                </Modal.Footer>
            </Modal>
            <ToastContainer />
        </>
    );
};

// Validasi prop dengan PropTypes
ProductDetailModal.propTypes = {
    show: PropTypes.bool.isRequired,
    onHide: PropTypes.func.isRequired,
    productId: PropTypes.number.isRequired,
    addToCart: PropTypes.func.isRequired,
};

export default ProductDetailModal;
