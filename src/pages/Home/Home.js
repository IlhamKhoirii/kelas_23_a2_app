import React, { useState, useContext } from "react";
import Slider from "react-slick"; // Import Slider from react-slick

import UserProfileModal from "../Profile/UserProfileModal";
import ProductDetailModal from "../Product/ProductDetailModal"; // Import the ProductDetailModal
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
import { CartContext } from "../../context/CartContext"; // Import CartContext
import products from "../../components/Products/Products"; // Import products
import "./Home.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Home = () => {
  const { profilePicture } = useContext(UserContext);
  const { cartItems, addToCart } = useContext(CartContext); // Access cartItems and addToCart from context
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(
    Object.keys(products)[0]
  ); // Default ke kategori pertama
  const [showProductModal, setShowProductModal] = useState(false); // State to handle ProductDetailModal visibility
  const [selectedProduct, setSelectedProduct] = useState(null); // State to track the selected product

  const handleProfileClick = () => setShowProfileModal(true);
  const handleCloseModal = () => setShowProfileModal(false);
  const handleCloseProductModal = () => {
    console.log("Closing Product Detail Modal"); // Debugging log
    setShowProductModal(false);
  };

  const handleCategoryClick = (category) => setSelectedCategory(category);

  const handleProductClick = (product) => {
    setSelectedProduct(product); // Set selected product data
    setShowProductModal(true); // Open the ProductDetailModal
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
          <img
            className="d-block w-100"
            src="/images/slider1.jpg"
            alt="First slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="/images/slider2.jpg"
            alt="Second slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="/images/slider3.jpeg"
            alt="Third slide"
          />
        </Carousel.Item>
      </Carousel>

      <Container className="category-section-title mb-4">
        <h2 className="text-start">Kategori</h2>
      </Container>

      <Container className="category-section mb-4">
        <Slider {...sliderSettings}>
          {Object.entries(products).map(([categoryName, categoryData]) => (
            <div
              key={categoryName}
              className="text-center category-slider-item"
            >
              <Button
                variant={
                  selectedCategory === categoryName
                    ? "primary"
                    : "outline-primary"
                }
                onClick={() => handleCategoryClick(categoryName)}
                className="category-button"
              >
                {/* Gambar kategori diambil dari categoryData.imageUrl */}
                <Image
                  src={categoryData.imageUrl}
                  rounded
                  className="category-image mb-2"
                />
                <h5 className="category-name">
                  {categoryName.charAt(0).toUpperCase() + categoryName.slice(1)}
                </h5>
              </Button>
            </div>
          ))}
        </Slider>
      </Container>

      <Container>
        <Row>
          {products[selectedCategory].items.map((product) => (
            <Col md={4} key={product.id} className="mb-4">
              <Card onClick={() => handleProductClick(product)}>
                {" "}
                {/* Click to open ProductDetailModal */}
                <Card.Img variant="top" src={product.imageUrl} />
                <Card.Body>
                  <Card.Title>{product.name}</Card.Title>
                  <Card.Text>
                    Harga: Rp{product.price.toLocaleString()}
                  </Card.Text>
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
          onHide={handleCloseProductModal}
          product={selectedProduct}
          addToCart={addToCart}
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
