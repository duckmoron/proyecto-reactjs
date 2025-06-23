import React, { useContext, useEffect } from "react";
import { CartContext } from "../context/CartContext";

const CartItem = ({ item }) => {
    const { updateQuantity, removeFromCart } = useContext(CartContext);

    const increase = () => {
        if (item.cantidad < item.stock) {
            updateQuantity(item.id, item.cantidad + 1);
        }
    };

    const decrease = () => {
        if (item.cantidad > 1) {
            updateQuantity(item.id, item.cantidad - 1);
        }
    };

    return (
        <div className="flex justify-between items-center border-b pb-2">
            <img
                src={item.imagen}
                alt={item.nombre}
                className="h-10 w-10 object-cover rounded-sm"
            />
            <div>
                <div>{item.nombre}</div>
                <div className="numeros">$ {item.precio}</div>
            </div>
            <div className="flex items-center gap-2">
                <button onClick={decrease} className="px-2">-</button>
                <span>{item.cantidad}</span>
                <button onClick={increase} className="px-2">+</button>
            </div>
            <button onClick={() => removeFromCart(item.id)} className="text-black hover:text-red-600">
                <i className="fa-solid fa-trash"></i>
            </button>
        </div>
    );
};

const Cart = ({ isOpen, onClose }) => {
    const { cart, handleDeleteFromCart } = useContext(CartContext);

    // Cerrar con la tecla ESC
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "Escape") {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener("keydown", handleKeyDown);
        }

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [isOpen, onClose]);

    return (
        <>
            {/* Overlay */}
            <div
                className={`fixed inset-0 z-40 bg-black bg-opacity-50 transition-opacity duration-300 ${
                    isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                }`}
                onClick={onClose}
            />

            {/* Drawer */}
            <div
                className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg transform transition-transform duration-300 z-50 flex flex-col ${
                    isOpen ? "translate-x-0" : "translate-x-full"
                }`}
            >
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-gray-300">
                    <h2 className="text-lg font-semibold">Carrito de Compras</h2>
                    <button onClick={onClose} className="text-black text-lg font-bold hover:text-red-500">
                        X
                    </button>
                </div>

                {/* Contenido scrollable */}
                <div className="flex-1 p-4 overflow-y-auto">
                    {cart.length === 0 ? (
                        <p className="text-red-500">El carrito está vacío</p>
                    ) : (
                        <div className="space-y-4">
                            {cart.map((item) => (
                                <CartItem key={item.id} item={item} onDelete={handleDeleteFromCart} />
                            ))}
                        </div>
                    )}
                </div>

                {/* Footer */}
                {cart.length > 0 && (
                    <div className="p-4 border-t border-gray-300">
                        <p className="text-blue-600 font-semibold mb-4">
                            Total: <span className="numeros">$ {cart.reduce((total, item) => total + item.precio * item.cantidad, 0)}
                        </span></p>
                        <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
                            Finalizar compra
                        </button>
                    </div>
                )}
            </div>
        </>
    );
};

export default Cart;
