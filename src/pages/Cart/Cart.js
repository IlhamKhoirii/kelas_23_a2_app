// src/components/Cart/Cart.js
import React, { useContext, useState } from 'react';
import {
    Container, Row, Col, Image, Button,
    InputGroup, FormControl, Navbar, Nav, Badge, Alert
} from 'react-bootstrap';
import HeaderNavbar from "../../components/HeaderNavbar/HeaderNavbar";
import { useNavigate, Link } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';
import { UserContext } from '../../context/UserContext';
import { FaSearch, FaShoppingCart, FaUserCircle } from 'react-icons/fa';
import './Cart.css';

const Cart = () => {
    const navigate = useNavigate();
    const { cartItems, updateCartItemQuantity, removeCartItem, clearCart } = useContext(CartContext);
    const { profilePicture, userName } = useContext(UserContext);
    const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const [showOverlay, setShowOverlay] = useState(false); // State for showing overlay alert

    // Define handleProfileClick to prevent the error
    const handleProfileClick = () => {
        console.log("Profile clicked");
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
            {/* Navbar (Header) */}
            <HeaderNavbar
                profilePicture={profilePicture}
                cartItems={cartItems}
                handleProfileClick={handleProfileClick}
            />

            {/* Cart Component */}
            <Container className="cart-container">
                <h2 className="cart-title">Keranjang</h2>

                {/* Overlay Alert */}
                {showOverlay && (
                    <div className="overlay">
                        <Alert variant="danger" className="text-center overlay-alert">
                            Keranjang Kosong!
                        </Alert>
                    </div>
                )}

                <Row className="cart-items">
                    {cartItems.map((item) => (
                        <Col md={12} className="cart-item mb-4" key={item.id}>
                            <Row>
                                <Col md={2}>
                                    <Image src={item.imageUrl} alt={item.name} fluid />
                                </Col>
                                <Col md={3}>
                                    <h5>{item.name}</h5>
                                </Col>
                                <Col md={3}>
                                    <InputGroup>
                                        <Button
                                            variant="outline-secondary"
                                            onClick={() => updateCartItemQuantity(item.id, item.quantity - 1)}
                                        >
                                            -
                                        </Button>
                                        <FormControl
                                            type="number"
                                            value={item.quantity}
                                            onChange={(e) => updateCartItemQuantity(item.id, Number(e.target.value))}
                                        />
                                        <Button
                                            variant="outline-secondary"
                                            onClick={() => updateCartItemQuantity(item.id, item.quantity + 1)}
                                        >
                                            +
                                        </Button>
                                    </InputGroup>
                                </Col>
                                <Col md={2}>
                                    <p>Subtotal: Rp{(item.price * item.quantity).toLocaleString()}</p>
                                </Col>
                                <Col md={2}>
                                    <Button variant="danger" onClick={() => removeCartItem(item.id)}>
                                        Remove
                                    </Button>
                                </Col>
                            </Row>
                        </Col>
                    ))}
                </Row>
                
                <Row className="cart-summary">
                    <Col md={6}>
                        <h4>Total: Rp{total.toLocaleString()}</h4>
                    </Col>
                    <Col md={6} className="text-end">
                        <div className="d-flex justify-content-between button-group mt-3">
                            <Button variant="secondary" onClick={handleContinueShopping}>
                                Lanjutkan Belanja
                            </Button>
                            <Button variant="warning" onClick={clearCart}>
                                Clear Cart
                            </Button>
                            <Button variant="primary" onClick={handleCheckout}>
                                Checkout
                            </Button>
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default Cart;
