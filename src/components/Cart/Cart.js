// Inside your Cart component
import React, { useContext } from "react";
import { UserContext } from "../../context/UserContext";

const Cart = () => {
    const { cartItems = [] } = useContext(UserContext); // Default to empty array if cartItems is undefined

    if (!cartItems || cartItems.length === 0) {
        return <div>Your cart is empty.</div>;
    }

    return (
        <div>
            <h2>Your Cart</h2>
            {cartItems.map((item, index) => (
                <div key={index}>
                    <p>{item.name}</p>
                    <p>{item.price}</p>
                </div>
            ))}
        </div>
    );
};

export default Cart;
