// src/components/Profile/OrderHistory.js
import React, { useState } from "react";
import { ListGroup, Badge, Button, Dropdown, DropdownButton } from "react-bootstrap";
import "./OrderHistory.css";

const OrderHistory = () => {
    // Contoh data riwayat pesanan
    const orders = [
        { id: 1, status: "Belum Dibayar", items: 3, total: 150000, date: "2024-10-20" },
        { id: 2, status: "Sedang Dikemas", items: 2, total: 80000, date: "2024-10-18" },
        { id: 3, status: "Dikirim", items: 1, total: 50000, date: "2024-10-15" },
        { id: 4, status: "Selesai", items: 5, total: 250000, date: "2024-10-10" },
        { id: 5, status: "Dibatalkan", items: 1, total: 40000, date: "2024-10-05" },
        { id: 6, status: "Pengembalian Barang", items: 2, total: 60000, date: "2024-09-30" },
    ];

    const [filterStatus, setFilterStatus] = useState("Semua");

    // Fungsi untuk mengubah status filter
    const handleStatusFilter = (status) => {
        setFilterStatus(status);
    };

    // Filter pesanan berdasarkan status yang dipilih
    const filteredOrders = filterStatus === "Semua"
        ? orders
        : orders.filter((order) => order.status === filterStatus);

    return (
        <div className="order-history-container">
            <h2>Riwayat Pemesanan</h2>

            {/* Dropdown untuk memilih status filter */}
            <DropdownButton id="dropdown-basic-button" title={`Filter: ${filterStatus}`} className="mb-3">
                <Dropdown.Item onClick={() => handleStatusFilter("Semua")}>Semua</Dropdown.Item>
                <Dropdown.Item onClick={() => handleStatusFilter("Belum Dibayar")}>Belum Dibayar</Dropdown.Item>
                <Dropdown.Item onClick={() => handleStatusFilter("Sedang Dikemas")}>Sedang Dikemas</Dropdown.Item>
                <Dropdown.Item onClick={() => handleStatusFilter("Dikirim")}>Dikirim</Dropdown.Item>
                <Dropdown.Item onClick={() => handleStatusFilter("Selesai")}>Selesai</Dropdown.Item>
                <Dropdown.Item onClick={() => handleStatusFilter("Dibatalkan")}>Dibatalkan</Dropdown.Item>
                <Dropdown.Item onClick={() => handleStatusFilter("Pengembalian Barang")}>Pengembalian Barang</Dropdown.Item>
            </DropdownButton>

            {/* Daftar Pesanan */}
            <ListGroup>
                {filteredOrders.map((order) => (
                    <ListGroup.Item key={order.id} className="order-item">
                        <div className="order-details">
                            <h5>Pesanan #{order.id}</h5>
                            <p>Status: <Badge bg="info">{order.status}</Badge></p>
                            <p>Tanggal: {order.date}</p>
                            <p>Total Barang: {order.items}</p>
                            <p>Total Harga: Rp{order.total.toLocaleString()}</p>
                        </div>
                    </ListGroup.Item>
                ))}
                {filteredOrders.length === 0 && (
                    <p className="no-orders">Tidak ada pesanan dengan status "{filterStatus}".</p>
                )}
            </ListGroup>
        </div>
    );
};

export default OrderHistory;
