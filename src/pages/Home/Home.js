import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Container, Card, Row, Col, Carousel } from "react-bootstrap";
import HeaderNavbar from "../../components/HeaderNavbar/HeaderNavbar";
import UserProfileModal from "../Profile/UserProfileModal";
import ProductDetailModal from "../Product/ProductDetailModal";
import CategorySlider from "../../components/Slider/CategorySlider";
import FooterUser from "../../components/FooterUser/FooterUser";
import { UserContext } from "../../context/UserContext";
import { CartContext } from "../../context/CartContext";
import "./Home.css";

const Home = () => {
  const { profilePicture } = useContext(UserContext);
  const { cartItems, addToCart } = useContext(CartContext);
  const [products, setProducts] = useState([]);
  const [setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showProductModal, setShowProductModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Fetch products and categories
  useEffect(() => {
    const fetchProductsAndCategories = async () => {
      try {
        // Fetch products
        const productResponse = await axios.get("http://localhost:5000/api/produk");
        const categoryResponse = await axios.get("http://localhost:5000/api/kategori");
        setProducts(productResponse.data);
        setCategories(categoryResponse.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchProductsAndCategories();
  }, []);

  const handleProfileClick = () => setShowProfileModal(true);
  const handleCloseModal = () => setShowProfileModal(false);
  const handleCloseProductModal = () => setShowProductModal(false);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setShowProductModal(true);
  };

  // Handle category click
  const handleCategoryClick = (categoryId) => {
    setSelectedCategory((prevCategory) =>
      prevCategory === categoryId ? null : categoryId
    );
  };

  // Filter products based on selected category
  const filteredProducts = selectedCategory
    ? products.filter(
        (product) => String(product.id_kategori) === String(selectedCategory)
      )
    : products;

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="home-container">
      {/* Header */}
      <HeaderNavbar
        profilePicture={profilePicture}
        cartItems={cartItems}
        handleProfileClick={handleProfileClick}
      />

      {/* Carousel */}
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

      {/* Category Slider */}
      <Container className="mb-4">
        <h2 className="text-start category-section-title">Kategori</h2>
        <CategorySlider
          selectedCategory={selectedCategory}
          onCategoryClick={handleCategoryClick}
        />
      </Container>

      {/* Products */}
      <Container>
        <Row>
          {filteredProducts.map((product) => (
            <Col md={4} key={product.id_produk} className="mb-4">
              <Card onClick={() => handleProductClick(product)}>
                <Card.Img variant="top" src={`http://localhost:5000/uploads/${product.gambar}`} />
                <Card.Body>
                  <Card.Title>{product.nama_produk}</Card.Title>
                  <Card.Text>
                    Harga: Rp{parseFloat(product.harga).toLocaleString()}
                  </Card.Text>
                  <Card.Text>Stok: {product.stok}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      {/* Modals */}
      {showProductModal && (
        <ProductDetailModal
          show={showProductModal}
          onHide={handleCloseProductModal}
          productId={selectedProduct.id_produk}
          addToCart={addToCart}
        />
      )}
      {showProfileModal && (
        <UserProfileModal show={showProfileModal} onHide={handleCloseModal} />
      )}

      {/* Footer */}
      <FooterUser />
    </div>
  );
};

export default Home;