import React, { useContext, useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, Image, Modal, Alert, InputGroup, FormControl } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { CartContext } from "../../context/CartContext";
import { UserContext } from "../../context/UserContext";
import HeaderNavbar from "../../components/HeaderNavbar/HeaderNavbar";
import "./Cart.css";

const Cart = () => {
    const { cartItems, setCartItems, updateCartItemQuantity, removeCartItem, clearCart } = useContext(CartContext);
    const { profilePicture, userName } = useContext(UserContext);
    const total = cartItems.reduce((acc, item) => acc + item.harga * item.quantity, 0);
    const [showOverlay, setShowOverlay] = useState(false); // State for showing overlay alert
    const [showProfileModal, setShowProfileModal] = useState(false); // State for showing profile modal
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const user = JSON.parse(localStorage.getItem("user"));
                const response = await axios.get("http://localhost:5000/api/keranjang", {
                    params: { id_user: user.id_user }
                });
                setCartItems(response.data);
            } catch (error) {
                console.error("Error fetching cart items:", error);
            }
        };

        fetchCartItems();
    }, [setCartItems]);

    const handleProfileClick = () => {
        setShowProfileModal(true);
    };

    const handleCloseProfileModal = () => {
        setShowProfileModal(false);
    };

    const handleCheckout = () => {
        if (cartItems.length === 0) {
            setShowOverlay(true);
            setTimeout(() => setShowOverlay(false), 2000); // Hide overlay after 2 seconds
        } else {
            navigate('/checkout');
        }
    };

    const handleContinueShopping = () => {
        navigate('/home');
    };

    return (
        <>
            <HeaderNavbar cartItems={cartItems} handleProfileClick={handleProfileClick} />
            <Container className="cart-container mt-4">
                <h2 className="cart-title">Keranjang Belanja</h2>
                <Row>
                    <Col md={8}>
                        {cartItems.length === 0 ? (
                            <Alert variant="info">Keranjang Anda kosong.</Alert>
                        ) : (
                            cartItems.map((item) => (
                                <Card key={item.id_produk} className="mb-3 cart-item">
                                    <Card.Body>
                                        <Row>
                                            <Col md={4}>
                                                <Image src={`http://localhost:5000/uploads/${item.gambar}`} fluid />
                                            </Col>
                                            <Col md={8} className="cart-item-details">
                                                <h5>{item.nama_produk}</h5>
                                                <p>Harga: Rp{parseFloat(item.harga).toLocaleString()}</p>
                                                <p>Jumlah: {item.quantity}</p>
                                                <InputGroup className="mb-3">
                                                    <Button
                                                        variant="outline-secondary"
                                                        onClick={() => updateCartItemQuantity(item.id_produk, item.quantity - 1)}
                                                    >
                                                        -
                                                    </Button>
                                                    <FormControl
                                                        type="number"
                                                        value={item.quantity}
                                                        onChange={(e) =>
                                                            updateCartItemQuantity(item.id_produk, Number(e.target.value))
                                                        }
                                                    />
                                                    <Button
                                                        variant="outline-secondary"
                                                        onClick={() => updateCartItemQuantity(item.id_produk, item.quantity + 1)}
                                                    >
                                                        +
                                                    </Button>
                                                </InputGroup>
                                                <Button variant="danger" onClick={() => removeCartItem(item.id_produk)}>
                                                    Hapus
                                                </Button>
                                            </Col>
                                        </Row>
                                    </Card.Body>
                                </Card>
                            ))
                        )}
                    </Col>
                    <Col md={4}>
                        <Card className="cart-summary">
                            <Card.Body>
                                <h4>Total: Rp{parseFloat(total).toLocaleString()}</h4>
                                <Button variant="success" onClick={handleCheckout}>
                                    Checkout
                                </Button>
                                <Button variant="secondary" onClick={handleContinueShopping}>
                                    Lanjut Belanja
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                {/* Overlay notification */}
                {showOverlay && (
                    <div className="overlay">
                        <div className="overlay-message">
                            <p>Keranjang Anda kosong!</p>
                        </div>
                    </div>
                )}

                {/* Profile Modal */}
                {showProfileModal && (
                    <Modal show={showProfileModal} onHide={handleCloseProfileModal}>
                        <Modal.Header closeButton>
                            <Modal.Title>Profil Pengguna</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <p>Nama: {userName}</p>
                            <Image src={profilePicture} roundedCircle />
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleCloseProfileModal}>
                                Tutup
                            </Button>
                        </Modal.Footer>
                    </Modal>
                )}
            </Container>
        </>
    );
};

export default Cart;