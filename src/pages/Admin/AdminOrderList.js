import React, { useState, useEffect } from "react";
import { Container, Table, Button, Modal, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NavbarAdmin from "../../components/NavbarAdmin/NavbarAdmin";
import "./AdminOrderList.css";

const AdminOrderList = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [shippingMethods, setShippingMethods] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [deliveryNote, setDeliveryNote] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [ordersResponse, addressesResponse, paymentMethodsResponse, shippingMethodsResponse] = await Promise.all([
          axios.get("http://localhost:5000/api/pesanan"),
          axios.get("http://localhost:5000/api/alamat-pelanggan"),
          axios.get("http://localhost:5000/api/metode-pembayaran"),
          axios.get("http://localhost:5000/api/metode-pengiriman"),
        ]);
        setOrders(ordersResponse.data);
        setAddresses(addressesResponse.data);
        setPaymentMethods(paymentMethodsResponse.data);
        setShippingMethods(shippingMethodsResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const updateOrderStatus = async () => {
    try {
      await axios.put(`http://localhost:5000/api/pesanan/${selectedOrderId}`, {
        status: selectedStatus,
        catatan_pengiriman: deliveryNote,
      });
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id_pesanan === selectedOrderId
            ? { ...order, status: selectedStatus, catatan_pengiriman: deliveryNote }
            : order
        )
      );
      setShowModal(false);
      toast.success("Status pesanan berhasil diperbarui!");
    } catch (error) {
      console.error("Error updating order status:", error);
      toast.error("Gagal memperbarui status pesanan.");
    }
  };

  const handleShowModal = (orderId, currentStatus, currentNote) => {
    setSelectedOrderId(orderId);
    setSelectedStatus(currentStatus);
    setDeliveryNote(currentNote || "");
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
      <NavbarAdmin handleLogout={handleLogout} />

      <Container className="admin-order-list mt-4">
        <h2>Manajemen Pemesanan</h2>
        <div className="table-responsive">
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>ID Pesanan</th>
                <th>Nama Pemesan</th>
                <th>No. HP</th>
                <th>Alamat Pengiriman</th>
                <th>Produk Dipesan</th>
                <th>Total Barang</th>
                <th>Total Harga</th>
                <th>Metode Pembayaran</th>
                <th>Metode Pengiriman</th>
                <th>Status Pengiriman</th>
                <th>Catatan Pengiriman</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id_pesanan}>
                  <td>{order.id_pesanan}</td>
                  <td>{order.user?.nama_user}</td>
                  <td>{order.user?.no_telp}</td>
                  <td>
                    {addresses.find(
                      (address) => address.id_alamat === order.id_alamat
                    )?.alamat || "Alamat tidak ditemukan"}
                  </td>
                  <td>
                    {order.detailPesanan?.map((detail) => (
                      <div key={detail.id_detail_pesanan}>
                        {detail.produk?.nama_produk} (x{detail.kuantitas})
                      </div>
                    ))}
                  </td>
                  <td>{order.total_barang?.toLocaleString()}</td>
                  <td>Rp{order.total_pembayaran?.toLocaleString()}</td>
                  <td>
                    {paymentMethods.find(
                      (method) =>
                        method.id_metode_pembayaran === order.id_metode_pembayaran
                    )?.nama_metode || "Metode tidak ditemukan"}
                  </td>
                  <td>
                    {shippingMethods.find(
                      (method) =>
                        method.id_metode_pengiriman === order.id_metode_pengiriman
                    )?.nama_metode || "Metode tidak ditemukan"}
                  </td>
                  <td>{order.status}</td>
                  <td>{order.catatan_pengiriman || "Tidak ada catatan"}</td>
                  <td>
                    <Button
                      variant="secondary"
                      onClick={() =>
                        handleShowModal(order.id_pesanan, order.status, order.catatan_pengiriman)
                      }
                    >
                      Update Status
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </Container>

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
                <option value="Tertunda">Tertunda</option>
                <option value="Proses">Proses</option>
                <option value="Diantar">Diantar</option>
                <option value="Selesai">Selesai</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="formDeliveryNote" className="mt-3">
              <Form.Label>Catatan Pengiriman</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={deliveryNote}
                onChange={(e) => setDeliveryNote(e.target.value)}
                placeholder="Tambahkan catatan pengiriman jika diperlukan"
              />
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