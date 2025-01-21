import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import { UserContext } from "../../context/UserContext";
import { Container, Row, Col, Form, Button, Modal } from "react-bootstrap";
import HeaderNavbar from "../../components/HeaderNavbar/HeaderNavbar";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import "./Checkout.css";

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
        const userResponse = await axios.get(
          `http://localhost:5000/api/users/${userId}`
        );
        setUser(userResponse.data);

        // Fetch addresses
        const addressResponse = await axios.get(
          `http://localhost:5000/api/alamat-pelanggan/${userId}`
        );
        setAddresses(addressResponse.data);

        // Debugging log for addresses
        console.log("Fetched addresses:", addressResponse.data);

        // Fetch payment methods
        const paymentMethodsResponse = await axios.get(
          "http://localhost:5000/api/metode-pembayaran"
        );
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
        const orderResponse = await axios.post(
          "http://localhost:5000/api/pesanan",
          {
            id_user: userId,
            total_barang: cartItems.length,
            status: "tertunda",
            catatan_pengiriman: deliveryNotes,
          }
        );

        const orderId = orderResponse.data.pesanan.id_pesanan;

        await axios.post("http://localhost:5000/api/detail-pesanan", {
          id_pesanan: orderId,
          id_alamat: selectedAddress,
          id_metode_pengiriman: selectedPaymentMethod,
          kuantitas: cartItems.reduce((acc, item) => acc + item.quantity, 0),
        });

        toast.success("Pesanan Anda telah berhasil dilakukan! Silakan periksa riwayat pesanan Anda");

        // Clear cart and navigate to home after a delay
        setTimeout(() => {
          clearCart();
          navigate("/home");
        }, 3000);
      } catch (error) {
        console.error("Error during checkout:", error);
        toast.error("Gagal membuat pesanan. Silakan coba lagi.");
      }
    } else {
      toast.error("Silakan pilih alamat dan metode pembayaran.");
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
        <h2>Pembayaran</h2>
        <Row className="mt-4">
          {/* Order Summary */}
          <Col md={5} className="mb-4">
            <div className="p-3 border rounded">
              <h4>Ringkasan Pesanan</h4>
              <div className="mt-3">
                <p>Subtotal: Rp{subtotal.toLocaleString()}</p>
                <p>Total Barang: {cartItems.length}</p>
                <p>Biaya Pengiriman: Rp{shippingCost.toLocaleString()}</p>
                <hr />
                <p className="fw-bold">
                  Total Pembayaran: Rp{total.toLocaleString()}
                </p>
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
                  <Form.Label>Nama Penerima</Form.Label>
                  <Form.Control
                    type="text"
                    value={user.nama_user || ""}
                    readOnly
                  />
                </Form.Group>

                {/* Phone Number */}
                <Form.Group className="mb-3" controlId="formPhoneNumber">
                  <Form.Label>Nomor Telpon</Form.Label>
                  <Form.Control
                    type="text"
                    value={user.no_telp || ""}
                    readOnly
                  />
                </Form.Group>

                {/* Payment Method */}
                <Form.Group className="mb-3" controlId="formPaymentMethod">
                  <Form.Label>Metode Pembayaran</Form.Label>
                  <Form.Select
                    value={selectedPaymentMethod}
                    onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                  >
                    <option value="">Pilih Metode Pembayaran</option>
                    {paymentMethods.map((method) => (
                      <option
                        key={method.id_metode_pembayaran}
                        value={method.id_metode_pembayaran}
                      >
                        {method.nama_metode}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>

                {/* Address Selection */}
                <Form.Group className="mb-3" controlId="formAddress">
                  <Form.Label>Alamat Pengiriman</Form.Label>
                  <Form.Select
                    value={selectedAddress}
                    onChange={(e) => setSelectedAddress(e.target.value)}
                  >
                    <option value="">Pilih Alamat</option>
                    {addresses.map((address) => (
                      <option key={address.id_alamat} value={address.id_alamat}>
                        {address.alamat}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
                {/* Delivery Notes */}
                <Form.Group className="mb-3" controlId="formDeliveryNotes">
                  <Form.Label>Catatan Pengiriman</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={2}
                    placeholder="Catatan pengiriman tambahan (opsional)"
                    value={deliveryNotes}
                    onChange={(e) => setDeliveryNotes(e.target.value)}
                  />
                </Form.Group>

                {/* Edit Cart and Checkout Buttons */}
                <div className="checkout-buttons">
                  <Button variant="secondary" onClick={handleEditCart}>
                    Edit Keranjang
                  </Button>
                  <Button variant="primary" onClick={handleCheckout}>
                    Pembayaran
                  </Button>
                </div>
              </Form>
            </div>
          </Col>
        </Row>

        {/* Success Message Modal */}
        <Modal show={showSuccess} onHide={() => setShowSuccess(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>Pesanan Berhasil</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>
              Pesanan Anda telah berhasil dilakukan! Silakan periksa riwayat
              pesanan Anda.
            </p>
          </Modal.Body>
        </Modal>
      </Container>

      {/* Toast Container */}
      <ToastContainer />
    </>
  );
};

export default Checkout;