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
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import Checkout from "./pages/Checkout/Checkout";
import Login from "./pages/Login/Login";
import Register from "./pages/Login/Register";
import EditProfile from "./pages/Profile/EditProfile";
import OrderHistory from "./pages/OrderHistory/OrderHistory";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import AdminAccount from "./pages/Admin/AdminAccount";
import AdminProductList from "./pages/Admin/AdminProductList";
import AdminUserList from "./pages/Admin/AdminUserList";
import AdminOrderList from "./pages/Admin/AdminOrderList";
import AdminSalesReport from "./pages/Admin/AdminSalesReport";
import AdminFeedback from "./pages/Admin/AdminFeedback";
import StoreInfo from './pages/StoreInfo/StoreInfo';
import ProdukToko from './pages/Store/ProdukToko';

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
            <Route path="/products" element={<ProdukToko />} />

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
