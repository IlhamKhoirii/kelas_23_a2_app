// src/components/Admin/AdminAccount.js
import React, { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import "./AdminAccount.css";

const AdminAccount = () => {
    // Mock admin data
    const [adminData, setAdminData] = useState({
        adminId: "12345",
        name: "Jane Smith",
        email: "admin@example.com",
        password: "admin123",
    });

    const [isEditing, setIsEditing] = useState(false);

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        // Logic to save the updated admin data
        console.log("Updated Admin Data:", adminData);
        setIsEditing(false); // Disable editing mode after saving
    };

    return (
        <Container className="admin-account-container">
            <h2>Informasi Akun Admin</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="adminId">
                    <Form.Label>Admin ID</Form.Label>
                    <Form.Control
                        type="text"
                        value={adminData.adminId}
                        readOnly
                    />
                </Form.Group>

                <Form.Group controlId="name" className="mt-3">
                    <Form.Label>Nama Admin</Form.Label>
                    <Form.Control
                        type="text"
                        value={adminData.name}
                        readOnly={!isEditing}
                        onChange={(e) => setAdminData({ ...adminData, name: e.target.value })}
                    />
                </Form.Group>

                <Form.Group controlId="email" className="mt-3">
                    <Form.Label>Email Admin</Form.Label>
                    <Form.Control
                        type="email"
                        value={adminData.email}
                        readOnly={!isEditing}
                        onChange={(e) => setAdminData({ ...adminData, email: e.target.value })}
                    />
                </Form.Group>

                <Form.Group controlId="password" className="mt-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        value={adminData.password}
                        readOnly={!isEditing}
                        onChange={(e) => setAdminData({ ...adminData, password: e.target.value })}
                    />
                </Form.Group>

                {isEditing ? (
                    <Button variant="success" type="submit" className="mt-3">
                        Save Changes
                    </Button>
                ) : (
                    <Button variant="primary" onClick={() => setIsEditing(true)} className="mt-3">
                        Edit Account
                    </Button>
                )}
            </Form>
        </Container>
    );
};

export default AdminAccount;
