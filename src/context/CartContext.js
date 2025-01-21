import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    const addToCart = (product, quantity) => {
        setCartItems((prevItems) => {
            const existingItem = prevItems.find((item) => item.id_produk === product.id_produk);
            if (existingItem) {
                return prevItems.map((item) =>
                    item.id_produk === product.id_produk
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            } else {
                return [...prevItems, { ...product, quantity }];
            }
        });
    };

    const updateCartItemQuantity = (id, quantity) => {
        setCartItems((prevItems) =>
            prevItems.map((item) =>
                item.id_produk === id ? { ...item, quantity: Math.max(1, quantity) } : item
            )
        );
    };

    const removeCartItem = (id) => {
        setCartItems((prevItems) => prevItems.filter((item) => item.id_produk !== id));
    };

    const clearCart = () => {
        setCartItems([]);
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart, updateCartItemQuantity, removeCartItem, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};