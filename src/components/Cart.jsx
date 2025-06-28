import React, { useContext, useEffect } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

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
        <div className="flex items-center gap-4 border-b pb-3">
            <img
                src={item.imagen}
                alt={item.nombre}
                className="h-16 w-16 object-cover rounded"
            />
            <div className="flex flex-col flex-1">
                <span className="font-medium">{item.nombre}</span>
                <span className="text-gray-500 text-sm numeros">$ {item.precio*item.cantidad}</span>
            </div>
            <div className="flex items-center gap-2">
                <button onClick={decrease} className="px-2 border rounded text-sm">-</button>
                <span className="w-6 text-center">{item.cantidad}</span>
                <button onClick={increase} className="px-2 border rounded text-sm">+</button>
            </div>
            <button
                onClick={() => removeFromCart(item.id)}
                className="text-gray-500 hover:text-red-600 ml-2"
            >
                <i className="fa-solid fa-trash"></i>
            </button>
        </div>
    );
};

const Cart = ({ isOpen, onClose }) => {
    const { cart } = useContext(CartContext);

    const navigate = useNavigate();

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

    // Bloquear scroll del body cuando está abierto
    useEffect(() => {
        document.body.style.overflow = isOpen ? "hidden" : "auto";
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [isOpen]);

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
                className={`fixed top-0 right-0 h-full bg-white shadow-lg transform transition-transform duration-300 z-50 flex flex-col
                    w-full sm:w-[400px] md:w-[500px] lg:w-[500px] ${
                        isOpen ? "translate-x-0" : "translate-x-full"
                    }`}
            >
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-gray-300">
                    <h2 className="text-lg font-semibold">Carrito de Compras</h2>
                    <button
                        onClick={onClose}
                        className="text-black text-lg font-bold hover:text-red-500"
                    >
                        <i className="fa-regular fa-2x fa-circle-xmark hover:text-blue-500"></i>
                    </button>
                </div>

               <div className="flex-1 p-4 overflow-y-auto">
                    {cart.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-center text-red-500 space-y-4">
                            <i className={`fa-solid fa-2x fa-cart-shopping`}></i>
                            <p>El carrito está vacío</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {cart.map((item) => (
                                <CartItem key={item.id} item={item} />
                            ))}
                        </div>
                    )}
                </div>

                {/* Footer */}
                {cart.length > 0 && (
                    <div className="p-4 border-t border-gray-300">
                        <p className="text-blue-600 font-semibold mb-4 text-right text-2xl">
                            Total:{" "}
                            <span className="numeros">
                                ${" "}
                                {cart.reduce(
                                    (total, item) => total + item.precio * item.cantidad,
                                    0
                                ).toFixed(2)}
                            </span>
                        </p>
                        <button
                            onClick={() => {
                                onClose();
                                navigate("/checkout");
                            }}
                            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                        >
                            Finalizar compra
                        </button>
                    </div>
                )}
            </div>
        </>
    );
};

export default Cart;
