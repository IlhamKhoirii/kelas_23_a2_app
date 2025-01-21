import React, { useState, useContext, useEffect } from "react";
import {
  Container,
  Button,
  Table,
} from "react-bootstrap";
import HeaderNavbar from "../../components/HeaderNavbar/HeaderNavbar";
import { UserContext } from "../../context/UserContext";
import { CartContext } from "../../context/CartContext";
import UserProfileModal from "../Profile/UserProfileModal";
import axios from "axios";
import "./OrderHistory.css"; // Import CSS untuk styling

const OrderHistory = () => {
  const { profilePicture, userId } = useContext(UserContext);
  const { cartItems } = useContext(CartContext);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [orders, setOrders] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("Semua");

  const handleProfileClick = () => setShowProfileModal(true);
  const handleCloseModal = () => setShowProfileModal(false);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/pesanan/user/${userId}`);
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, [userId]);

  // Filter pesanan berdasarkan status yang dipilih
  const filteredOrders = selectedStatus === "Semua" ? orders : orders.filter(order => order.status === selectedStatus);

  return (
    <div className="page-container">
      <div className="content-wrap">
        {/* Header Navbar */}
        <HeaderNavbar
          profilePicture={profilePicture}
          cartItems={cartItems}
          handleProfileClick={handleProfileClick}
        />

        {/* Filter Status */}
        <Container className="mt-4">
          <h2>Riwayat Pesanan</h2>
          <div className="d-flex justify-content-start my-3">
            {["Semua", "Belum Bayar", "Sedang Dikemas", "Dikirim", "Selesai", "Dibatalkan", "Pengembalian Barang"].map((status) => (
              <Button
                key={status}
                variant={selectedStatus === status ? "primary" : "outline-primary"}
                onClick={() => setSelectedStatus(status)}
                className="me-2"
              >
                {status}
              </Button>
            ))}
          </div>

          {/* Tabel Riwayat Pesanan */}
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Tanggal</th>
                <th>Status</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order.id_pesanan}>
                  <td>{order.id_pesanan}</td>
                  <td>{new Date(order.dibuat_pada).toLocaleDateString()}</td>
                  <td>{order.status}</td>
                  <td>{order.total_barang.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>

        {/* User Profile Modal */}
        <UserProfileModal show={showProfileModal} handleClose={handleCloseModal} />
      </div>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2024 Toko Kelontong. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default OrderHistory;