import React, { useState } from "react";
import "./StoreInfo.css";
import {
  Container,
  InputGroup,
  FormControl,
  Button,
  Image,
  Badge,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaSearch, FaUserCircle, FaShoppingCart } from "react-icons/fa";
import HeaderNavbar from "../../components/HeaderNavbar/HeaderNavbar";
import FooterUser from "../../components/FooterUser/FooterUser";
import UserProfileModal from "../Profile/UserProfileModal";

const StoreInfo = () => {
  // Placeholder variables for profile picture and cart items
  const profilePicture = ""; // Replace with actual profile picture URL or state
  const cartItems = []; // Replace with actual cart items or state

  // State untuk mengontrol tampilan modal profil pengguna
  const [showProfileModal, setShowProfileModal] = useState(false);

  // Placeholder function for handling profile click
  const handleProfileClick = () => {
    setShowProfileModal(true);
  };

  const handleCloseModal = () => {
    setShowProfileModal(false);
  };

  return (
    <div className="page-container">
      <div className="content-wrap">
        {/* Header Navbar */}
        <HeaderNavbar cartItems={cartItems} handleProfileClick={handleProfileClick} />

        {/* Store Information Content */}
        <div className="store-info-container">
          <h1 className="store-title">Informasi Toko</h1>
          <p className="store-description">
            Selamat datang di toko kelontong online kami! Kami menyediakan
            berbagai kebutuhan sehari-hari untuk membuat pengalaman berbelanja
            Anda mudah dan nyaman.
          </p>
          <p className="delivery-restriction">
            <strong>Cakupan Pengiriman:</strong> Saat ini, kami hanya melayani
            pengiriman di tingkat kabupaten. Pastikan alamat Anda berada di dalam
            area ini untuk melakukan pemesanan.
          </p>
          <div className="contact-info">
            <h3>Kontak kami</h3>
            <p>Email: support@gmail.com</p>
            <p>Telepon: (123) 456-7890</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <FooterUser />

      {/* User Profile Modal */}
      <UserProfileModal show={showProfileModal} onHide={handleCloseModal} />
    </div>
  );
};

export default StoreInfo;