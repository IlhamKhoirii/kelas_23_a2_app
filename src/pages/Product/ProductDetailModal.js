// src/components/ProductDetailModal/ProductDetailModal.js
import React, { useState, useContext } from "react";
import { Modal, Button, Image, InputGroup, FormControl } from "react-bootstrap";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { CartContext } from "../../context/CartContext";

const ProductDetailModal = ({ show, handleClose, product }) => {
    const { addToCart } = useContext(CartContext); // Using the CartContext to get addToCart function
    const [quantity, setQuantity] = useState(1);
    const navigate = useNavigate(); // Initialize useNavigate
    const [showNotification, setShowNotification] = useState(false); // State for notification

    // Increment quantity, ensuring it does not exceed the product's stock
    const incrementQuantity = () => {
        if (quantity < product.stock) {
            setQuantity(quantity + 1);
        }
    };

    // Decrement quantity, ensuring it does not go below 1
    const decrementQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    // Function to handle adding the product to the cart
    const handleAddToCart = () => {
        if (addToCart && typeof addToCart === "function") {
            addToCart(product, quantity); // Add the product with the specified quantity to the cart
        } else {
            console.error("addToCart function is not defined in CartContext.");
        }

        // Show a temporary notification
        setShowNotification(true);
        setTimeout(() => setShowNotification(false), 2000); // Hide notification after 2 seconds

        // Navigate to the cart page
        navigate("/cart");
    };

    // Return null if no product is provided to prevent rendering errors
    if (!product) return null;

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>{product.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Image src={product.imageUrl} fluid className="mb-3" />
                <p><strong>Harga:</strong> Rp{product.price.toLocaleString()}</p>
                <p><strong>Stok:</strong> {product.stock}</p>
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
                <Button variant="primary" onClick={handleAddToCart}>
                    Tambah ke Keranjang
                </Button>
            </Modal.Footer>

            {/* Notification Message */}
            {showNotification && (
                <div className="notification">
                    Barang berhasil ditambahkan ke keranjang!
                </div>
            )}
        </Modal>
    );
};

export default ProductDetailModal;
