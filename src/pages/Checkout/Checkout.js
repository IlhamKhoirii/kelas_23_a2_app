import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import { UserContext } from "../../context/UserContext";
import { Container, Row, Col, Form, Button, Modal } from "react-bootstrap";
import HeaderNavbar from "../../components/HeaderNavbar/HeaderNavbar";
import axios from "axios";
import './Checkout.css';

const Checkout = () => {
    const navigate = useNavigate();
    const { cartItems, clearCart } = useContext(CartContext);
    const { userId, profilePicture } = useContext(UserContext);

    const [user, setUser] = useState({});
    const [addresses, setAddresses] = useState([]);
    const [paymentMethods, setPaymentMethods] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState("");
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
    const [deliveryNotes, setDeliveryNotes] = useState("");
    const [showSuccess, setShowSuccess] = useState(false);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                // Fetch user data
                const userResponse = await axios.get(`http://localhost:5000/api/users/${userId}`);
                setUser(userResponse.data);

                // Fetch addresses
                const addressResponse = await axios.get(`http://localhost:5000/api/alamat/${userId}`);
                setAddresses(addressResponse.data);

                // Debugging log for addresses
                console.log("Fetched addresses:", addressResponse.data);

                // Fetch payment methods
                const paymentMethodsResponse = await axios.get("http://localhost:5000/api/metode-pembayaran");
                setPaymentMethods(paymentMethodsResponse.data);

                // Debugging log for payment methods
                console.log("Fetched payment methods:", paymentMethodsResponse.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchUserData();
    }, [userId]);

    const calculateSubtotal = () => {
        return cartItems.reduce((acc, item) => acc + item.harga * item.quantity, 0);
    };

    const shippingCost = 10000; // Example fixed shipping cost
    const subtotal = calculateSubtotal();
    const total = subtotal + shippingCost;

    const handleCheckout = async () => {
        if (selectedAddress && selectedPaymentMethod) {
            try {
                const orderResponse = await axios.post("http://localhost:5000/api/pesanan", {
                    id_user: userId,
                    total_barang: cartItems.length,
                    status: "tertunda",
                });

                const orderId = orderResponse.data.pesanan.id_pesanan;

                await axios.post("http://localhost:5000/api/detail-pesanan", {
                    id_pesanan: orderId,
                    id_produk: cartItems.map(item => item.id_produk),
                    id_alamat: selectedAddress,
                    id_metode_pengiriman: 1, // Assuming a default shipping method
                    kuantitas: cartItems.map(item => item.quantity),
                });

                await axios.post("http://localhost:5000/api/metode-pembayaran", {
                    id_pesanan: orderId,
                    id_metode_pembayaran: selectedPaymentMethod,
                    jumlah_bayar: total,
                    status_pembayaran: "pending",
                });

                clearCart();
                setShowSuccess(true); // Show success notification
                setTimeout(() => {
                    navigate("/"); // Redirect to the main page after 3 seconds
                }, 3000);
            } catch (error) {
                console.error("Error during checkout:", error);
                alert("Terjadi kesalahan saat melakukan checkout. Silakan coba lagi.");
            }
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
                                        value={user.nama_user || ""}
                                        readOnly
                                    />
                                </Form.Group>

                                {/* Phone Number */}
                                <Form.Group className="mb-3" controlId="formPhoneNumber">
                                    <Form.Label>Phone Number</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={user.phoneNumber || ""}
                                        readOnly
                                    />
                                </Form.Group>

                                {/* Payment Method */}
                                <Form.Group className="mb-3" controlId="formPaymentMethod">
                                    <Form.Label>Payment Method</Form.Label>
                                    <Form.Select
                                        value={selectedPaymentMethod}
                                        onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                                    >
                                        <option value="">Select Payment Method</option>
                                        {paymentMethods && paymentMethods.map((method) => (
                                            <option key={method.id_metode_pembayaran} value={method.id_metode_pembayaran}>
                                                {method.nama_metode}
                                            </option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>

                                {/* Address */}
                                <Form.Group className="mb-3" controlId="formAddress">
                                    <Form.Label>Full Address</Form.Label>
                                    <Form.Select
                                        value={selectedAddress}
                                        onChange={(e) => setSelectedAddress(e.target.value)}
                                    >
                                        <option value="">Select Address</option>
                                        {addresses && addresses.map((address) => (
                                            <option key={address.id_alamat} value={address.id_alamat}>
                                                {address.alamat_lengkap}
                                            </option>
                                        ))}
                                    </Form.Select>
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
