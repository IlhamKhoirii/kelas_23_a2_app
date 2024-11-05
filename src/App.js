// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

import { UserProvider } from "./context/UserContext";
import { CartProvider } from "./context/CartContext";
import Home from "./components/Home/Home";
import Cart from "./components/Cart/Cart";
import Checkout from "./components/Checkout/Checkout";
import Login from "./components/Login/Login";
import Register from "./components/Login/Register";
import EditProfile from "./components/Profile/EditProfile";
import OrderHistory from "./components/OrderHistory/OrderHistory";
import AdminDashboard from "./components/Admin/AdminDashboard";
import AdminAccount from "./components/Admin/AdminAccount";

function App() {
    const isAuthenticated = localStorage.getItem("authToken") !== null;
    const isAdmin = localStorage.getItem("userRole") === "admin";

    return (
        <UserProvider>
            <CartProvider>
                <Router>
                    <Routes>
                        {/* Home Route */}
                        <Route path="/" element={isAuthenticated ? <Home /> : <Navigate to="/login" />} />

                        {/* Authentication Routes */}
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />

                        {/* Protected User Routes */}
                        <Route path="/home" element={isAuthenticated ? <Home /> : <Navigate to="/login" />} />
                        <Route path="/cart" element={isAuthenticated ? <Cart /> : <Navigate to="/login" />} />
                        <Route path="/checkout" element={isAuthenticated ? <Checkout /> : <Navigate to="/login" />} />
                        <Route path="/edit-profile" element={isAuthenticated ? <EditProfile /> : <Navigate to="/login" />} />
                        <Route path="/order-history" element={isAuthenticated ? <OrderHistory /> : <Navigate to="/login" />} />

                        {/* Protected Admin Routes */}
                        <Route
                            path="/admin/dashboard"
                            element={isAuthenticated && isAdmin ? <AdminDashboard /> : <Navigate to="/login" />}
                        />
                        <Route
                            path="/admin-account"
                            element={isAuthenticated && isAdmin ? <AdminAccount /> : <Navigate to="/login" />}
                        />
                    </Routes>
                </Router>
            </CartProvider>
        </UserProvider>
    );
}

export default App;
