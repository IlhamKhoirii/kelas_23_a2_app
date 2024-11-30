// src/pages/Home/Home.js
import React, { useState, useContext } from "react";
import Slider from "react-slick";  // Import Slider from react-slick
import CategoryList from "../../components/Product/CategoryList";
import ProductList from "../../components/Product/ProductList";
import UserProfileModal from "../Profile/UserProfileModal";
import ProductDetailModal from "../Product/ProductDetailModal";  // Import the ProductDetailModal
import {
    Container,
    Card,
    Row,
    Col,
    Image,
    Button,
    Carousel,
} from "react-bootstrap";
import HeaderNavbar from "../../components/HeaderNavbar/HeaderNavbar";
import { UserContext } from "../../context/UserContext";
import { CartContext } from "../../context/CartContext";  // Import CartContext
import { Link } from "react-router-dom";
import "./Home.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Home = () => {
    const { profilePicture } = useContext(UserContext);
    const { cartItems, addToCart } = useContext(CartContext);  // Access cartItems and addToCart from context
    const [showProfileModal, setShowProfileModal] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState("sembako");
    const [showProductModal, setShowProductModal] = useState(false);  // State to handle ProductDetailModal visibility
    const [selectedProduct, setSelectedProduct] = useState(null);     // State to track the selected product

    const handleProfileClick = () => setShowProfileModal(true);
    const handleCloseModal = () => setShowProfileModal(false);

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

    const handleProductClick = (product) => {
        setSelectedProduct(product);          // Set selected product data
        setShowProductModal(true);            // Open the ProductDetailModal
    };

    const sliderSettings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 1,
                },
            },
        ],
    };

    return (
        <div className="home-container">
            {/* Menggunakan HeaderNavbar */}
            <HeaderNavbar
                profilePicture={profilePicture}
                cartItems={cartItems}
                handleProfileClick={handleProfileClick}
            />

            <Carousel className="mb-4">
                <Carousel.Item>
                    <img className="d-block w-100" src="/images/slider1.jpg" alt="First slide" />
                </Carousel.Item>
                <Carousel.Item>
                    <img className="d-block w-100" src="/images/slider2.jpg" alt="Second slide" />
                </Carousel.Item>
                <Carousel.Item>
                    <img className="d-block w-100" src="/images/slider3.jpeg" alt="Third slide" />
                </Carousel.Item>
            </Carousel>

            <Container className="category-section-title mb-4">
                <h2 className="text-start">Kategori</h2>
            </Container>

            <Container className="category-section mb-4">
                <Slider {...sliderSettings}>
                    {Object.keys(products).map((category) => (
                        <div key={category} className="text-center category-slider-item">
                            <Button
                                variant={selectedCategory === category ? "primary" : "outline-primary"}
                                onClick={() => handleCategoryClick(category)}
                                className="category-button"
                            >
                                <Image src="https://via.placeholder.com/150" rounded className="category-image mb-2" />
                                <h5 className="category-name">{category.charAt(0).toUpperCase() + category.slice(1)}</h5>
                            </Button>
                        </div>
                    ))}
                </Slider>
            </Container>

            <Container>
                <Row>
                    {products[selectedCategory].map((product) => (
                        <Col md={4} key={product.id} className="mb-4">
                            <Card onClick={() => handleProductClick(product)}>  {/* Click to open ProductDetailModal */}
                                <Card.Img variant="top" src={product.imageUrl} />
                                <Card.Body>
                                    <Card.Title>{product.name}</Card.Title>
                                    <Card.Text>Harga: Rp{product.price.toLocaleString()}</Card.Text>
                                    <Card.Text>Terjual: {product.sold}</Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>

            {showProductModal && (
                <ProductDetailModal
                    show={showProductModal}
                    onHide={() => setShowProductModal(false)}
                    product={selectedProduct}
                    addToCart={addToCart}  // Pass addToCart function to ProductDetailModal
                />
            )}

            {showProfileModal && (
                <UserProfileModal show={showProfileModal} onHide={handleCloseModal} />
            )}

            {/* Footer */}
            <footer className="footer">
                <p>&copy; 2024 Toko Kelontong. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default Home;
