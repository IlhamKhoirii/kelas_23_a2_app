import React, { useState, useContext } from "react";
import UserProfileModal from "../Profile/UserProfileModal";
import {
    Navbar,
    Container,
    Nav,
    FormControl,
    Button,
    Card,
    Row,
    Col,
    Badge,
    Image,
    InputGroup,
    Carousel,
} from "react-bootstrap";
import { FaSearch, FaShoppingCart, FaUserCircle } from "react-icons/fa";
import { UserContext } from "../../context/UserContext";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
    const { profilePicture } = useContext(UserContext);
    const [showProfileModal, setShowProfileModal] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("sembako");

    const handleProfileClick = () => setShowProfileModal(true);
    const handleCloseModal = () => setShowProfileModal(false);
    const addToCart = (product) => setCartItems((prevItems) => [...prevItems, product]);

    const products = {
        sembako: [
            { id: 1, name: "Beras Premium", price: 50000, sold: 120, stock: 50, imageUrl: "https://via.placeholder.com/150" },
            { id: 2, name: "Minyak Goreng", price: 20000, sold: 80, stock: 30, imageUrl: "https://via.placeholder.com/150" },
        ],
        obat: [
            { id: 3, name: "Paracetamol", price: 15000, sold: 60, stock: 100, imageUrl: "https://via.placeholder.com/150" },
        ],
        alat_tulis: [
            { id: 4, name: "Pensil", price: 5000, sold: 200, stock: 300, imageUrl: "https://via.placeholder.com/150" },
        ],
        minuman: [
            { id: 5, name: "Air Mineral", price: 3000, sold: 100, stock: 200, imageUrl: "https://via.placeholder.com/150" },
        ],
        alat_mandi: [
            { id: 6, name: "Sabun Mandi", price: 7000, sold: 150, stock: 80, imageUrl: "https://via.placeholder.com/150" },
        ],
        snacks: [
            { id: 7, name: "Keripik Kentang", price: 10000, sold: 90, stock: 40, imageUrl: "https://via.placeholder.com/150" },
        ],
    };

    const handleCategoryClick = (category) => setSelectedCategory(category);

    return (
        <div className="home-container">
            {/* Header Navbar */}
            <Navbar bg="light" expand="lg" className="mb-4">
                <Container>
                    <Navbar.Brand href="#"><h1>Toko Kelontong</h1></Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto d-flex align-items-center">
                            <InputGroup className="me-3 search-bar">
                                <FormControl type="search" placeholder="Cari barang..." aria-label="Search" />
                                <Button variant="outline-success">
                                    <FaSearch />
                                </Button>
                            </InputGroup>
                            <Nav.Link onClick={handleProfileClick} className="d-flex align-items-center me-3 profile-section">
                                {profilePicture ? (
                                    <Image src={profilePicture} roundedCircle width={32} height={32} alt="User" className="me-2 profile-picture" />
                                ) : (
                                    <FaUserCircle size={32} className="me-2 profile-picture" />
                                )}
                                <span className="user-name">Evelyn</span>
                            </Nav.Link>
                            <Nav.Link as={Link} to="/cart" className="position-relative cart-icon">
                                <FaShoppingCart size={24} />
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

            {/* Moving Carousel */}
            <Carousel className="mb-4">
                <Carousel.Item>
                    <img className="d-block w-100" src="https://via.placeholder.com/1920x300" alt="First slide" />
                </Carousel.Item>
                <Carousel.Item>
                    <img className="d-block w-100" src="https://via.placeholder.com/1920x300" alt="Second slide" />
                </Carousel.Item>
                <Carousel.Item>
                    <img className="d-block w-100" src="https://via.placeholder.com/1920x300" alt="Third slide" />
                </Carousel.Item>
            </Carousel>

            {/* Category Title */}
            <Container className="category-section-title mb-4">
                <h2 className="text-start">Kategori</h2>
            </Container>

            {/* Category Section */}
            <Container className="category-section mb-4">
                <Row className="text-center my-3">
                    {Object.keys(products).map((category) => (
                        <Col md={4} key={category} className="mb-4">
                            <Button
                                variant={selectedCategory === category ? "primary" : "outline-primary"}
                                onClick={() => handleCategoryClick(category)}
                                className="category-button w-100"
                            >
                                <Image src="https://via.placeholder.com/150" rounded className="category-image mb-2" />
                                <h5 className="category-name">{category.charAt(0).toUpperCase() + category.slice(1)}</h5>
                            </Button>
                        </Col>
                    ))}
                </Row>
            </Container>

            {/* Product List */}
            <Container>
                <Row>
                    {products[selectedCategory].map((product) => (
                        <Col md={4} key={product.id} className="mb-4">
                            <Card>
                                <Card.Img variant="top" src={product.imageUrl} />
                                <Card.Body>
                                    <Card.Title>{product.name}</Card.Title>
                                    <Card.Text>Harga: Rp{product.price.toLocaleString()}</Card.Text>
                                    <Card.Text>Terjual: {product.sold}</Card.Text>
                                    <Card.Text>Stok: {product.stock}</Card.Text>
                                    <Button variant="primary" onClick={() => addToCart(product)}>
                                        Tambah ke Keranjang
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>

            {/* Footer */}
            <footer className="footer mt-4">
                <p>&copy; 2024 Toko Kelontong. All rights reserved.</p>
            </footer>

            {/* User Profile Modal */}
            <UserProfileModal show={showProfileModal} handleClose={handleCloseModal} />
        </div>
    );
};

export default Home;
