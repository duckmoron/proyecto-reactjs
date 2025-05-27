import React from "react";
import './styleCart.css'

const Cart = ({ cartItems, isOpen, onClose, borrarProducto }) => {
    return (
        <div className={`cart-drawer ${isOpen ? 'open' : ''}`}>
            <div className="cart-header">
                <h2>Carrito de Compras</h2>
                <button onClick={onClose} className="close-button">X</button>
            </div>
            <div className="cart-content">
                {cartItems.length === 0 ? (
                    <p style={{ color: "red" }}>El carrito está vacío</p>
                ) : (
                    <div className="cart-item">
                    {cartItems.map((item) => (
                        <div key={item.id} className="cart-item-row">
                        <span>{item.nombre} - {item.precio}</span>
                        <button onClick={() => borrarProducto(item)}>
                            <i className="fa-solid fa-trash"></i>
                        </button>
                        </div>
                    ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Cart;
