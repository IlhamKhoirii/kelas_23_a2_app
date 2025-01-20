import React, { useContext, useState, useEffect } from 'react';
import {
    Container, Row, Col, Image, Button,
    InputGroup, FormControl, Alert
} from 'react-bootstrap';
import HeaderNavbar from "../../components/HeaderNavbar/HeaderNavbar";
import { useNavigate, Link } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';
import { UserContext } from '../../context/UserContext';
import UserProfileModal from "../Profile/UserProfileModal"; // Import UserProfileModal
import { FaSearch, FaShoppingCart, FaUserCircle } from 'react-icons/fa';
import './Cart.css';
import axios from 'axios';

const Cart = () => {
    const navigate = useNavigate();
    const { cartItems, setCartItems, updateCartItemQuantity, removeCartItem, clearCart } = useContext(CartContext);
    const { profilePicture, userName } = useContext(UserContext);
    const total = cartItems.reduce((acc, item) => acc + item.produk.harga * item.jumlah, 0);
    const [showOverlay, setShowOverlay] = useState(false); // State for showing overlay alert
    const [showProfileModal, setShowProfileModal] = useState(false); // State for showing profile modal

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

    const handleUpdateQuantity = async (id_produk, jumlah) => {
        try {
            const user = JSON.parse(localStorage.getItem("user"));
            await axios.put("http://localhost:5000/api/keranjang", {
                id_user: user.id_user,
                id_produk,
                jumlah
            });
            setCartItems(prevItems => prevItems.map(item =>
                item.id_produk === id_produk ? { ...item, jumlah } : item
            ));
        } catch (error) {
            console.error("Error updating cart item quantity:", error);
        }
    };

    const handleRemoveItem = async (id_produk) => {
        try {
            const user = JSON.parse(localStorage.getItem("user"));
            await axios.delete("http://localhost:5000/api/keranjang", {
                data: { id_user: user.id_user, id_produk }
            });
            setCartItems(prevItems => prevItems.filter(item => item.id_produk !== id_produk));
        } catch (error) {
            console.error("Error removing cart item:", error);
        }
    };

    return (
        <div>
            <HeaderNavbar profilePicture={profilePicture} cartItems={cartItems} handleProfileClick={handleProfileClick} />
            <Container>
                <h2>Keranjang Belanja</h2>
                {cartItems.length === 0 ? (
                    <Alert variant="info">Keranjang Anda kosong.</Alert>
                ) : (
                    <Row>
                        {cartItems.map(item => (
                            <Col key={item.id_produk} sm={12} md={6} lg={4}>
                                <div className="cart-item">
                                    <Image src={`http://localhost:5000/uploads/${item.produk.gambar}`} fluid />
                                    <div className="cart-item-details">
                                        <h5>{item.produk.nama_produk}</h5>
                                        <p>Harga: Rp{parseFloat(item.produk.harga).toLocaleString()}</p>
                                        <p>Jumlah: {item.jumlah}</p>
                                        <InputGroup className="mb-3">
                                            <Button variant="outline-secondary" onClick={() => handleUpdateQuantity(item.id_produk, item.jumlah - 1)} disabled={item.jumlah <= 1}>-</Button>
                                            <FormControl type="number" value={item.jumlah} onChange={(e) => handleUpdateQuantity(item.id_produk, parseInt(e.target.value))} />
                                            <Button variant="outline-secondary" onClick={() => handleUpdateQuantity(item.id_produk, item.jumlah + 1)} disabled={item.jumlah >= item.produk.stok}>+</Button>
                                        </InputGroup>
                                        <Button variant="danger" onClick={() => handleRemoveItem(item.id_produk)}>Hapus</Button>
                                    </div>
                                </div>
                            </Col>
                        ))}
                    </Row>
                )}
                <div className="cart-summary">
                    <h4>Total: Rp{total.toLocaleString()}</h4>
                    <Button variant="primary" onClick={handleCheckout}>Checkout</Button>
                    <Button variant="secondary" onClick={handleContinueShopping}>Lanjut Belanja</Button>
                </div>
                {showOverlay && (
                    <Alert variant="warning" className="overlay-alert">
                        Keranjang Anda kosong.
                    </Alert>
                )}
            </Container>

            {/* User Profile Modal */}
            {showProfileModal && (
                <UserProfileModal show={showProfileModal} onHide={handleCloseProfileModal} />
            )}
        </div>
    );
};

export default Cart;