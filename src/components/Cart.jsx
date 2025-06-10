import React, { useContext } from "react";
import "./styleCart.css";

import { CartContext } from "../context/CartContext";

const Cart = ({ cartItems, isOpen, onClose, borrarProducto }) => {
    
    const { cart, handleDeleteFromCart } = useContext(CartContext);

    return (
        <div className={`cart-drawer ${isOpen ? "open" : ""}`}>
            <div className="cart-header">
                <h2>Carrito de Compras</h2>
                <button onClick={onClose} className="close-button">X</button>
            </div>
            <div className="cart-content">
                {cart.length === 0
                    ? <p style={{ color: "red" }}>El carrito está vacío</p>
                    : (
                        <div className="cart-item">
                            {cart.map((item) => (
                                <div key={item.id} className="cart-item-row">
                                    <span>
                                        {item.nombre} - {item.precio} -{" "}
                                        {item.cantidad}
                                    </span>
                                    <button onClick={()=> borrarProducto(item)}><i className="fa-solid fa-trash"></i></button>
                                    <button
                                        onClick={() =>
                                            handleDeleteFromCart(item)}
                                    >
                                        <i className="fa-solid fa-trash"></i>
                                    </button>
                                </div>
                            ))}
                            <div className="class-footer">
                                <p style={{ color: "blue" }}>
                                    Total: ${cart.reduce(
                                        (total, item) =>
                                            total +
                                            (item.precio * item.cantidad),
                                        0,
                                    )}
                                </p>
                                <button className="btnCheckout">
                                    Finalizar compra
                                </button>
                            </div>
                        </div>
                    )}
            </div>
        </div>
    );
};

export default Cart;
