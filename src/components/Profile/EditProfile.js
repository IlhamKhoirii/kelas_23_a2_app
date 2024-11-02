// src/components/Profile/EditProfile.js
import React, { useState, useContext } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { UserContext } from "../../context/UserContext";

const EditProfile = () => {
    const { profilePicture, updateProfilePicture } = useContext(UserContext);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    const handleSave = (e) => {
        e.preventDefault();
        alert("Profile updated successfully!");
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

    return (
        <Container className="mt-4">
            <h2>Edit Profile</h2>
            <Form onSubmit={handleSave}>
                <Form.Group className="mb-3">
                    <Form.Label>Profile Picture</Form.Label>
                    <Form.Control type="file" onChange={handleProfilePictureChange} />
                    {profilePicture && <img src={profilePicture} alt="Profile" width={100} height={100} />}
                </Form.Group>
                <Form.Group className="mb-3" controlId="formName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </Form.Group>
                <Button variant="primary" type="submit">Save Changes</Button>
            </Form>
        </Container>
    );
};

export default EditProfile;
