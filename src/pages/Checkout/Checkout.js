import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom"; // Added 'Link' here
import { CartContext } from "../../context/CartContext";
import { UserContext } from "../../context/UserContext"; // Add UserContext for user details
import { Container, Row, Col, Form, Button, Modal, Navbar, Nav, InputGroup, FormControl, Image, Badge } from "react-bootstrap";
import { FaSearch, FaShoppingCart, FaUserCircle } from "react-icons/fa";
import './Checkout.css';
import HeaderNavbar from "../../components/HeaderNavbar/HeaderNavbar";

const Checkout = () => {
    const navigate = useNavigate();
    const { cartItems } = useContext(CartContext);
    const { profilePicture } = useContext(UserContext); // Access user details

    // Calculate the subtotal
    const calculateSubtotal = () => {
        return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    };

    const [name, setName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("COD");
    const [address, setAddress] = useState("");
    const [deliveryNotes, setDeliveryNotes] = useState("");
    const [showSuccess, setShowSuccess] = useState(false);

    const shippingCost = 10000; // Example fixed shipping cost
    const subtotal = calculateSubtotal();
    const total = subtotal + shippingCost;

    const handleCheckout = () => {
        if (name && phoneNumber && address) {
            setShowSuccess(true); // Show success notification
            setTimeout(() => {
                navigate("/"); // Redirect to the main page after 3 seconds
            }, 3000);
        } else {
            alert("Please fill in all required fields.");
        }
    };

    const handleEditCart = () => {
        navigate("/cart"); // Redirect to cart page
    };

    const handleProfileClick = () => {
        navigate("/profile"); // Navigate to the profile page
    };

    return (
        <>
            {/* Navbar */}
            <HeaderNavbar
                profilePicture={profilePicture}
                cartItems={cartItems}
                handleProfileClick={handleProfileClick}
            />

            {/* Checkout Container */}
            <Container className="checkout-container mt-4">
                <h2>Checkout</h2>
                <Row className="mt-4">
                    {/* Order Summary */}
                    <Col md={5} className="mb-4">
                        <div className="p-3 border rounded">
                            <h4>Order Summary</h4>
                            <div className="mt-3">
                                <p>Subtotal: Rp{subtotal.toLocaleString()}</p>
                                <p>Items: {cartItems.length}</p>
                                <p>Shipping Cost: Rp{shippingCost.toLocaleString()}</p>
                                <hr />
                                <p className="fw-bold">Total: Rp{total.toLocaleString()}</p>
                            </div>
                        </div>
                    </Col>

                    {/* Place Your Order Form */}
                    <Col md={7} className="mb-4">
                        <div className="p-3 border rounded">
                            <h4>Place Your Order</h4>
                            <Form className="mt-3">
                                {/* Name */}
                                <Form.Group className="mb-3" controlId="formName">
                                    <Form.Label>Your Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter your name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                    />
                                </Form.Group>

                                {/* Phone Number */}
                                <Form.Group className="mb-3" controlId="formPhoneNumber">
                                    <Form.Label>Phone Number</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter your phone number"
                                        value={phoneNumber}
                                        onChange={(e) => setPhoneNumber(e.target.value)}
                                        required
                                    />
                                </Form.Group>

                                {/* Payment Method */}
                                <Form.Group className="mb-3" controlId="formPaymentMethod">
                                    <Form.Label>Payment Method</Form.Label>
                                    <Form.Select
                                        value={paymentMethod}
                                        onChange={(e) => setPaymentMethod(e.target.value)}
                                    >
                                        <option value="COD">COD</option>
                                        <option value="Bank Transfer">Bank Transfer</option>
                                    </Form.Select>
                                </Form.Group>

                                {/* Address */}
                                <Form.Group className="mb-3" controlId="formAddress">
                                    <Form.Label>Full Address</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={3}
                                        placeholder="Enter your full address"
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                        required
                                    />
                                </Form.Group>

                                {/* Delivery Notes */}
                                <Form.Group className="mb-3" controlId="formDeliveryNotes">
                                    <Form.Label>Delivery Notes</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={2}
                                        placeholder="Additional delivery notes (optional)"
                                        value={deliveryNotes}
                                        onChange={(e) => setDeliveryNotes(e.target.value)}
                                    />
                                </Form.Group>

                                {/* Edit Cart and Checkout Buttons */}
                                <div className="checkout-buttons">
                                    <Button variant="secondary" onClick={handleEditCart}>
                                        Edit Cart
                                    </Button>
                                    <Button variant="primary" onClick={handleCheckout}>
                                        Checkout
                                    </Button>
                                </div>
                            </Form>
                        </div>
                    </Col>
                </Row>

                {/* Success Message Modal */}
                <Modal show={showSuccess} onHide={() => setShowSuccess(false)} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Order Successful</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>Your order has been placed successfully! Please check your order history.</p>
                    </Modal.Body>
                </Modal>
            </Container>
        </>
    );
};

export default Checkout;
