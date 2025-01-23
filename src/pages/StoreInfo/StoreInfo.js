import React, { useState } from "react";
import "./StoreInfo.css";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HeaderNavbar from "../../components/HeaderNavbar/HeaderNavbar";
import FooterUser from "../../components/FooterUser/FooterUser";
import UserProfileModal from "../Profile/UserProfileModal";

const StoreInfo = () => {
  const cartItems = []; // Replace with actual cart items or state
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [userFeedback, setUserFeedback] = useState({
    id_user: "",
    nama_user: "",
    email: "",
    pesan: "",
  });

  const handleProfileClick = () => setShowProfileModal(true);
  const handleCloseModal = () => setShowProfileModal(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserFeedback({
      ...userFeedback,
      [name]: value,
    });
  };

  const handleSubmitFeedback = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/feedback", userFeedback);
      if (response.status === 201) {
        toast.success("Terima kasih atas masukan Anda!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setUserFeedback({ id_user: "", nama_user: "", email: "", pesan: "" });
      }
    } catch (error) {
      console.error("Error sending feedback:", error);
      toast.error("Terjadi kesalahan. Silakan coba lagi.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <div className="page-container">
      <div className="content-wrap">
        <HeaderNavbar cartItems={cartItems} handleProfileClick={handleProfileClick} />

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

          <div className="feedback-form">
            <h3>Jika ada keluhan website bisa tuliskan pesan Anda disini:</h3>
            <Form onSubmit={handleSubmitFeedback}>
              <Form.Group controlId="feedbackFormName">
                <Form.Label>Nama</Form.Label>
                <Form.Control
                  type="text"
                  name="nama_user"
                  value={userFeedback.nama_user}
                  onChange={handleInputChange}
                  placeholder="Masukkan nama Anda"
                  required
                />
              </Form.Group>
              <Form.Group controlId="feedbackFormEmail" className="mt-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={userFeedback.email}
                  onChange={handleInputChange}
                  placeholder="Masukkan email Anda"
                  required
                />
              </Form.Group>
              <Form.Group controlId="feedbackFormMessage" className="mt-3">
                <Form.Label>Pesan</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="pesan"
                  value={userFeedback.pesan}
                  onChange={handleInputChange}
                  placeholder="Tuliskan keluhan Anda di sini"
                  required
                />
              </Form.Group>
              <Button variant="primary" type="submit" className="mt-3">
                Kirim Keluhan
              </Button>
            </Form>
          </div>
        </div>
      </div>

      <FooterUser />
      <ToastContainer />
      <UserProfileModal show={showProfileModal} onHide={handleCloseModal} />
    </div>
  );
};

export default StoreInfo;
