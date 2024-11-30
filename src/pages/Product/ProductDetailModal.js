import React, { useReducer, useState, useContext } from "react";
import { Modal, Button, Image, InputGroup, FormControl, Alert } from "react-bootstrap";
import { CartContext } from "../../context/CartContext"; // Menggunakan konteks keranjang untuk menambahkan produk

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

const ProductDetailModal = ({ show, handleClose, product }) => {
    const { addToCart } = useContext(CartContext); // Fungsi dari konteks untuk menambahkan ke keranjang
    const [state, dispatch] = useReducer(quantityReducer, initialState); // Menggunakan useReducer
    const [showNotification, setShowNotification] = useState(false); // State untuk notifikasi sukses

    // Fungsi untuk menambahkan produk ke keranjang
    const handleAddToCart = () => {
        if (addToCart && typeof addToCart === "function") {
            addToCart(product, state.quantity); // Tambahkan produk dengan jumlah tertentu
        } else {
            console.error("addToCart function is not defined in CartContext.");
        }

        // Tampilkan notifikasi sukses
        setShowNotification(true);
        setTimeout(() => {
            setShowNotification(false); // Sembunyikan notifikasi setelah 2 detik
            handleClose(); // Tutup modal setelah menambahkan ke keranjang
        }, 2000);
    };

    // Jika tidak ada produk yang dipilih, jangan render modal
    if (!product) return null;

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>{product.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {/* Gambar produk */}
                <Image src={product.imageUrl} fluid className="mb-3" />
                {/* Detail produk */}
                <p><strong>Harga:</strong> Rp{product.price.toLocaleString()}</p>
                <p><strong>Stok:</strong> {product.stock}</p>
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
                                stock: product.stock,
                            })
                        }
                    />
                    <Button
                        variant="outline-secondary"
                        onClick={() =>
                            dispatch({ type: "increment", stock: product.stock })
                        }
                    >
                        +
                    </Button>
                </InputGroup>
            </Modal.Body>
            <Modal.Footer>
                {/* Tombol tambah ke keranjang */}
                <Button variant="primary" onClick={handleAddToCart}>
                    Tambah ke Keranjang
                </Button>
            </Modal.Footer>

            {/* Notifikasi berhasil ditambahkan */}
            {showNotification && (
                <Alert variant="success" className="notification-alert">
                    Barang berhasil ditambahkan ke keranjang!
                </Alert>
            )}
        </Modal>
    );
};

export default ProductDetailModal;
