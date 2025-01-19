import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Container, Card, Row, Col } from "react-bootstrap";
import HeaderNavbar from "../../components/HeaderNavbar/HeaderNavbar";
import UserProfileModal from "../Profile/UserProfileModal";
import ProductDetailModal from "../Product/ProductDetailModal";
import CategorySlider from "../../components/Slider/CategorySlider";
import { UserContext } from "../../context/UserContext";
import { CartContext } from "../../context/CartContext";
import './ProdukToko.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ProdukToko = () => {
  const { profilePicture } = useContext(UserContext);
  const { cartItems, addToCart } = useContext(CartContext);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
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
        const productResponse = await axios.get("http://localhost:5000/api/produk"); // Ubah URL sesuai endpoint Anda
        const categoryResponse = await axios.get("http://localhost:5000/api/kategori"); // Ubah URL sesuai endpoint kategori Anda
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

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  const filteredProducts = selectedCategory
    ? products.filter((product) => product.id_kategori === selectedCategory)
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

      {/* Category Slider */}
      <Container className="mb-4">
        <h2 className="text-start">Kategori</h2>
        <CategorySlider
          categories={categories}
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
                <Card.Img variant="top" src={product.gambar} />
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

export default ProdukToko;
