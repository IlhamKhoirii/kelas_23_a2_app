import React, { useState, useEffect } from "react";
import { Container, Table, Dropdown, Navbar, Nav, Modal, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NavbarAdmin from "../../components/NavbarAdmin/NavbarAdmin";
import "./AdminOrderList.css";

const AdminOrderList = () => {
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedOrderId, setSelectedOrderId] = useState(null);
    const [selectedStatus, setSelectedStatus] = useState("");

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/pesanan");
                setOrders(response.data);
            } catch (error) {
                console.error("Error fetching orders:", error);
            }
        };

        fetchOrders();
    }, []);

    // Update order status
    const updateOrderStatus = async () => {
        try {
            await axios.put(`http://localhost:5000/api/pesanan/${selectedOrderId}`, { status: selectedStatus });
            setOrders((prevOrders) =>
                prevOrders.map((order) =>
                    order.id_pesanan === selectedOrderId ? { ...order, status: selectedStatus } : order
                )
            );
            setShowModal(false);
            toast.success("Berhasil Update Status Pesanan"); // Tampilkan notifikasi sukses
        } catch (error) {
            console.error("Error updating order status:", error);
        }
    };

    const handleShowModal = (orderId, currentStatus) => {
        setSelectedOrderId(orderId);
        setSelectedStatus(currentStatus);
        setShowModal(true);
    };

    const handleCloseModal = () => setShowModal(false);

    const handleLogout = () => {
        localStorage.removeItem("authToken");
        localStorage.removeItem("userRole");
        navigate("/login");
    };

    return (
        <>
            {/* Admin Navbar */}
            <NavbarAdmin handleLogout={handleLogout} />

            {/* Orders Table */}
            <Container className="admin-order-list mt-4">
                <h2>Manajemen Pemesanan</h2>
                <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Tanggal Order</th>
                            <th>Nama Pemesan</th>
                            <th>Nomor HP</th>
                            <th>Alamat Pengiriman</th>
                            <th>Produk Dipesan</th>
                            <th>Total Pembayaran</th>
                            <th>Metode Pembayaran</th>
                            <th>Status Pengiriman</th>
                            <th>Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders && orders.map((order) => (
                            <tr key={order.id_pesanan}>
                                <td>{order.id_pesanan}</td>
                                <td>{new Date(order.dibuat_pada).toLocaleDateString()}</td>
                                <td>{order.user?.nama_user}</td>
                                <td>{order.user?.no_telp}</td>
                                <td>{order.user?.alamat}</td>
                                <td>
                                    {order.detailPesanan && order.detailPesanan.map((item, index) => (
                                        <div key={index}>
                                            {item.produk?.nama_produk} (x{item.kuantitas})
                                        </div>
                                    ))}
                                </td>
                                <td>Rp {order.total_barang.toLocaleString()}</td>
                                <td>{order.metodePembayaran}</td>
                                <td>{order.status}</td>
                                <td>
                                    <Button variant="secondary" onClick={() => handleShowModal(order.id_pesanan, order.status)}>
                                        Update Status
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>

            {/* Modal for Updating Order Status */}
            <Modal show={showModal} onHide={handleCloseModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Update Status</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formOrderStatus">
                            <Form.Label>Status Pengiriman</Form.Label>
                            <Form.Control
                                as="select"
                                value={selectedStatus}
                                onChange={(e) => setSelectedStatus(e.target.value)}
                            >
                                <option value="tertunda">Tertunda</option>
                                <option value="diproses">Diproses</option>
                                <option value="dikirim">Dikirim</option>
                                <option value="selesai">Selesai</option>
                            </Form.Control>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Batal
                    </Button>
                    <Button variant="primary" onClick={updateOrderStatus}>
                        Update Status
                    </Button>
                </Modal.Footer>
            </Modal>

            <ToastContainer />
        </>
    );
};

export default AdminOrderList;