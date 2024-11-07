// src/App.js
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
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
import AdminProductList from "./components/Admin/AdminProductList";
import AdminUserList from "./components/Admin/AdminUserList";
import AdminOrderList from "./components/Admin/AdminOrderList";
import AdminSalesReport from "./components/Admin/AdminSalesReport";
import AdminFeedback from "./components/Admin/AdminFeedback";
import StoreInfo from './components/StoreInfo/StoreInfo';

const ProtectedRoute = ({
  element,
  isAuthenticated,
  isAdmin,
  isAdminRoute,
}) => {
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  if (isAdminRoute && !isAdmin) {
    return <Navigate to="/home" />; // Redirect to user home if not an admin
  }
  return element;
};

function App() {
  const isAuthenticated = localStorage.getItem("authToken") !== null;
  const isAdmin = localStorage.getItem("userRole") === "admin";

  return (
    <UserProvider>
      <CartProvider>
        <Router>
          <Routes>
            {/* Home Route */}
            <Route
              path="/"
              element={<Navigate to={isAuthenticated ? "/home" : "/login"} />}
            />

            {/* Authentication Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Public Route for Store Information */}
            <Route path="/store-info" element={<StoreInfo />} />

            {/* Protected User Routes */}
            <Route
              path="/home"
              element={
                <ProtectedRoute
                  element={<Home />}
                  isAuthenticated={isAuthenticated}
                  isAdmin={isAdmin}
                  isAdminRoute={false}
                />
              }
            />
            <Route
              path="/cart"
              element={
                <ProtectedRoute
                  element={<Cart />}
                  isAuthenticated={isAuthenticated}
                  isAdmin={isAdmin}
                  isAdminRoute={false}
                />
              }
            />
            <Route
              path="/checkout"
              element={
                <ProtectedRoute
                  element={<Checkout />}
                  isAuthenticated={isAuthenticated}
                  isAdmin={isAdmin}
                  isAdminRoute={false}
                />
              }
            />
            <Route
              path="/edit-profile"
              element={
                <ProtectedRoute
                  element={<EditProfile />}
                  isAuthenticated={isAuthenticated}
                  isAdmin={isAdmin}
                  isAdminRoute={false}
                />
              }
            />
            <Route
              path="/order-history"
              element={
                <ProtectedRoute
                  element={<OrderHistory />}
                  isAuthenticated={isAuthenticated}
                  isAdmin={isAdmin}
                  isAdminRoute={false}
                />
              }
            />

            {/* Protected Admin Routes */}
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute
                  element={<AdminDashboard />}
                  isAuthenticated={isAuthenticated}
                  isAdmin={isAdmin}
                  isAdminRoute={true}
                />
              }
            />
            <Route
              path="/admin-account"
              element={
                <ProtectedRoute
                  element={<AdminAccount />}
                  isAuthenticated={isAuthenticated}
                  isAdmin={isAdmin}
                  isAdminRoute={true}
                />
              }
            />
            <Route
              path="/admin/products"
              element={
                <ProtectedRoute
                  element={<AdminProductList />}
                  isAuthenticated={isAuthenticated}
                  isAdmin={isAdmin}
                  isAdminRoute={true}
                />
              }
            />
            <Route
              path="/admin/users"
              element={
                <ProtectedRoute
                  element={<AdminUserList />}
                  isAuthenticated={isAuthenticated}
                  isAdmin={isAdmin}
                  isAdminRoute={true}
                />
              }
            />
            <Route
              path="/admin/orders"
              element={
                <ProtectedRoute
                  element={<AdminOrderList />}
                  isAuthenticated={isAuthenticated}
                  isAdmin={isAdmin}
                  isAdminRoute={true}
                />
              }
            />
            <Route
              path="/admin/sales"
              element={
                <ProtectedRoute
                  element={<AdminSalesReport />}
                  isAuthenticated={isAuthenticated}
                  isAdmin={isAdmin}
                  isAdminRoute={true}
                />
              }
            />
            <Route
              path="/admin/feedback"
              element={
                <ProtectedRoute
                  element={<AdminFeedback />}
                  isAuthenticated={isAuthenticated}
                  isAdmin={isAdmin}
                  isAdminRoute={true}
                />
              }
            />
          </Routes>
        </Router>
      </CartProvider>
    </UserProvider>
  );
}

export default App;
