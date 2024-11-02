// src/components/OrderHistory/OrderHistory.js
import React from "react";
import { Container, Table } from "react-bootstrap";

const OrderHistory = () => {
    // Sample order data for display
    const orders = [
        { id: 1, date: "2024-10-15", status: "Completed", total: 150000 },
        { id: 2, date: "2024-10-10", status: "Shipped", total: 75000 },
        // Add more orders if needed
    ];

    return (
        <Container className="mt-4">
            <h2>Order History</h2>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Order ID</th>
                        <th>Date</th>
                        <th>Status</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order) => (
                        <tr key={order.id}>
                            <td>{order.id}</td>
                            <td>{order.date}</td>
                            <td>{order.status}</td>
                            <td>Rp{order.total.toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
};

export default OrderHistory;
