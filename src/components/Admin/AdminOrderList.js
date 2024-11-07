// src/components/Admin/AdminOrderList.js
import React, { useState } from "react";
import { Container, Table, Dropdown, Navbar, Nav } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import "./AdminOrderList.css";

const AdminOrderList = () => {
    const navigate = useNavigate();
    
    // Mock data for orders (in a real app, fetch this data from an API)
    const [orders, setOrders] = useState([
        {
            id: 1,
            orderDate: "2024-11-01",
            customerName: "John Doe",
            phoneNumber: "08123456789",
            shippingAddress: "123 Main St, City A",
            items: [
                { productName: "Product 1", quantity: 2 },
                { productName: "Product 2", quantity: 1 },
            ],
            totalPayment: 50000,
            paymentMethod: "Credit Card",
            status: "Pending",
        },
        {
            id: 2,
            orderDate: "2024-11-02",
            customerName: "Jane Smith",
            phoneNumber: "08223344556",
            shippingAddress: "456 Oak St, City B",
            items: [
                { productName: "Product 3", quantity: 1 },
                { productName: "Product 4", quantity: 3 },
            ],
            totalPayment: 100000,
            paymentMethod: "Bank Transfer",
            status: "Shipped",
        },
    ]);

    // Update order status
    const updateOrderStatus = (orderId, status) => {
        setOrders((prevOrders) =>
            prevOrders.map((order) =>
                order.id === orderId ? { ...order, status } : order
            )
        );
    };

    const handleLogout = () => {
        localStorage.removeItem("authToken");
        localStorage.removeItem("userRole");
        navigate("/login");
    };

    return (
        <>
            {/* Admin Navbar */}
            <Navbar bg="dark" variant="dark" expand="lg">
                <Container>
                    <Navbar.Brand>Admin Dashboard</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link onClick={() => navigate("/admin/dashboard")}>Beranda</Nav.Link>
                            <Nav.Link onClick={() => navigate("/admin/products")}>Produk</Nav.Link>
                            <Nav.Link onClick={() => navigate("/admin/orders")}>Pemesanan</Nav.Link>
                            <Nav.Link onClick={() => navigate("/admin/users")}>Pengguna</Nav.Link>
                            <Nav.Link onClick={() => navigate("/admin/sales")}>Laporan Penjualan</Nav.Link>
                        </Nav>
                        <Dropdown align="end">
                            <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                                <FaUserCircle size={24} />
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item onClick={() => navigate("/admin-account")}>
                                    Akun Admin
                                </Dropdown.Item>
                                <Dropdown.Divider />
                                <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

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
                        {orders.map((order) => (
                            <tr key={order.id}>
                                <td>{order.id}</td>
                                <td>{order.orderDate}</td>
                                <td>{order.customerName}</td>
                                <td>{order.phoneNumber}</td>
                                <td>{order.shippingAddress}</td>
                                <td>
                                    {order.items.map((item, index) => (
                                        <div key={index}>
                                            {item.productName} (x{item.quantity})
                                        </div>
                                    ))}
                                </td>
                                <td>Rp {order.totalPayment.toLocaleString()}</td>
                                <td>{order.paymentMethod}</td>
                                <td>{order.status}</td>
                                <td>
                                    <Dropdown>
                                        <Dropdown.Toggle variant="secondary" id="dropdown-status">
                                            Update Status
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            <Dropdown.Item onClick={() => updateOrderStatus(order.id, "Pending")}>
                                                Tertunda
                                            </Dropdown.Item>
                                            <Dropdown.Item onClick={() => updateOrderStatus(order.id, "Shipped")}>
                                                Terkirim
                                            </Dropdown.Item>
                                            <Dropdown.Item onClick={() => updateOrderStatus(order.id, "Completed")}>
                                                Selesai
                                            </Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        </>
    );
};

export default AdminOrderList;
