// src/App.js
import React from "react";

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { UserProvider } from "./context/UserContext";
import Home from "./components/Home/Home";
import Cart from "./components/Cart/Cart";
import Login from "./components/Login/Login";
import Register from "./components/Login/Register";
import EditProfile from "./components/Profile/EditProfile";
import OrderHistory from "./components/OrderHistory/OrderHistory";
import AdminDashboard from "./components/Admin/AdminDashboard";
import AdminAccount from "./components/Admin/AdminAccount"; // Import AdminAccount

function App() {
    // Check if the user is authenticated
    const isAuthenticated = localStorage.getItem("authToken") !== null;
    // Check if the authenticated user is an admin
    const isAdmin = localStorage.getItem("userRole") === "admin";

    return (
        <UserProvider>
            <Router>
                <Routes>
                    {/* Redirect to Home if authenticated, otherwise to Login */}
                    <Route path="/" element={isAuthenticated ? <Home /> : <Navigate to="/login" />} />

                    {/* Authentication Routes */}
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />

                    {/* User Routes - Protected, requires authentication */}
                    <Route path="/home" element={isAuthenticated ? <Home /> : <Navigate to="/login" />} />
                    <Route path="/cart" element={isAuthenticated ? <Cart /> : <Navigate to="/login" />} />
                    <Route path="/edit-profile" element={isAuthenticated ? <EditProfile /> : <Navigate to="/login" />} />
                    <Route path="/order-history" element={isAuthenticated ? <OrderHistory /> : <Navigate to="/login" />} />

                    {/* Admin Routes - Protected, requires authentication and admin role */}
                    <Route
                        path="/admin/dashboard"
                        element={
                            isAuthenticated && isAdmin ? <AdminDashboard /> : <Navigate to="/login" />
                        }
                    />
                    <Route
                        path="/admin-account"
                        element={
                            isAuthenticated && isAdmin ? <AdminAccount /> : <Navigate to="/login" />
                        }
                    />
                </Routes>
            </Router>
        </UserProvider>
    );
}

export default App;
