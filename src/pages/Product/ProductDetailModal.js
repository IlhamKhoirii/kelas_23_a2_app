import React, { useState, useContext } from "react";
import { Modal, Button, Image, InputGroup, FormControl, Alert } from "react-bootstrap";
import { CartContext } from "../../context/CartContext"; // Menggunakan konteks keranjang untuk menambahkan produk

const ProductDetailModal = ({ show, handleClose, product }) => {
    const { addToCart } = useContext(CartContext); // Fungsi dari konteks untuk menambahkan ke keranjang
    const [quantity, setQuantity] = useState(1); // State untuk jumlah produk yang akan ditambahkan
    const [showNotification, setShowNotification] = useState(false); // State untuk notifikasi sukses

    // Increment jumlah produk hingga batas stok
    const incrementQuantity = () => {
        if (quantity < product.stock) {
            setQuantity(quantity + 1);
        }
    };

    // Decrement jumlah produk hingga batas minimum 1
    const decrementQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    // Fungsi untuk menambahkan produk ke keranjang
    const handleAddToCart = () => {
        if (addToCart && typeof addToCart === "function") {
            addToCart(product, quantity); // Tambahkan produk dengan jumlah tertentu
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
                    <Button variant="outline-secondary" onClick={decrementQuantity}>-</Button>
                    <FormControl
                        type="number"
                        value={quantity}
                        onChange={(e) =>
                            setQuantity(
                                Math.max(1, Math.min(product.stock, Number(e.target.value)))
                            )
                        }
                    />
                    <Button variant="outline-secondary" onClick={incrementQuantity}>+</Button>
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