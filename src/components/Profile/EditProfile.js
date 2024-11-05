import React, { useState, useContext } from "react";
import { Form, Button, Container, Alert, Navbar, Nav, Image, InputGroup, FormControl, Badge } from "react-bootstrap";
import { FaSearch, FaUserCircle, FaShoppingCart } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import "./EditProfile.css"; // Optional: For custom styling if needed

const EditProfile = () => {
    const { profilePicture, updateProfilePicture, namaPengguna, updateNamaPengguna, cartItems = [] } = useContext(UserContext);
    const [userId, setUserId] = useState("12345"); // Example user ID, should be fetched from context or API
    const [emailPengguna, setEmailPengguna] = useState("");
    const [kecamatan, setKecamatan] = useState("");
    const [alamatLengkap, setAlamatLengkap] = useState("");

    const [editedNamaPengguna, setEditedNamaPengguna] = useState(namaPengguna);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false); // State for showing the success message
    const navigate = useNavigate();

    const handleSave = (e) => {
        e.preventDefault();
        updateNamaPengguna(editedNamaPengguna); // Update the global context with the new username

        // Show success message overlay
        setShowSuccessMessage(true);

        // Automatically hide the overlay after a few seconds
        setTimeout(() => setShowSuccessMessage(false), 3000);
    };

    const handleProfilePictureChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                updateProfilePicture(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleProfileClick = () => {
        navigate("/profile");
    };

    return (
        <div className="edit-profile-page">
            {/* Navbar Header */}
            <Navbar bg="light" expand="lg" className="mb-4 custom-navbar">
                <Container>
                    <Navbar.Brand href=""><h1 className="navbar-title">Toko Yenni</h1></Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto d-flex align-items-center">
                            <InputGroup className="me-3 search-bar">
                                <FormControl type="search" placeholder="Cari barang..." aria-label="Search" />
                                <Button variant="outline-success" className="search-button">
                                    <FaSearch />
                                </Button>
                            </InputGroup>
                            <Nav.Link onClick={handleProfileClick} className="d-flex align-items-center me-3 profile-section">
                                {profilePicture ? (
                                    <Image src={profilePicture} roundedCircle width={24} height={24} alt="User" className="profile-picture" />
                                ) : (
                                    <FaUserCircle size={24} className="profile-icon" />
                                )}
                                <span className="user-name">{editedNamaPengguna}</span>
                            </Nav.Link>
                            <Nav.Link as={Link} to="/cart" className="position-relative cart-icon">
                                <FaShoppingCart size={20} />
                                {cartItems.length > 0 && (
                                    <Badge pill bg="danger" className="cart-badge position-absolute top-0 start-100 translate-middle">
                                        {cartItems.length}
                                    </Badge>
                                )}
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            {/* Edit Profile Form */}
            <Container className="mt-4">
                <h2>Edit Profile</h2>
                <Form onSubmit={handleSave}>
                    <Form.Group className="mb-3">
                        <Form.Label>Profile Picture</Form.Label>
                        <Form.Control type="file" onChange={handleProfilePictureChange} />
                        {profilePicture && <img src={profilePicture} alt="Profile" className="profile-preview" />}
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formUserId">
                        <Form.Label>User ID (Unique)</Form.Label>
                        <Form.Control type="text" value={userId} readOnly />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formNamaPengguna">
                        <Form.Label>Nama Pengguna</Form.Label>
                        <Form.Control
                            type="text"
                            value={editedNamaPengguna}
                            onChange={(e) => setEditedNamaPengguna(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formEmailPengguna">
                        <Form.Label>Email Pengguna</Form.Label>
                        <Form.Control
                            type="email"
                            value={emailPengguna}
                            onChange={(e) => setEmailPengguna(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formKecamatan">
                        <Form.Label>Kecamatan (Nama Daerah)</Form.Label>
                        <Form.Control
                            type="text"
                            value={kecamatan}
                            onChange={(e) => setKecamatan(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formAlamatLengkap">
                        <Form.Label>Alamat Lengkap Pengguna</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            value={alamatLengkap}
                            onChange={(e) => setAlamatLengkap(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Update Akun
                    </Button>
                </Form>

                {/* Notification Overlay */}
                {showSuccessMessage && (
                    <div className="notification-overlay">
                        <Alert variant="success" className="text-center">
                            Akun berhasil diperbarui
                        </Alert>
                    </div>
                )}
            </Container>
        </div>
    );
};

export default EditProfile;
