import React, { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import Header from "../components/estaticos/Header";
import Footer from "../components/estaticos/Footer";
import Swal from "sweetalert2";

const Checkout = () => {
    const { cart, clearCart } = useContext(CartContext);
    const navigate = useNavigate();

    const [form, setForm] = useState({
        nombre: "",
        email: "",
        direccion: "",
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!form.nombre || !form.email || !form.direccion) {
            Swal.fire({
                title: ":(!",
                text: "Por favor completa todos los campos.",
                icon: "error",
            });
            return;
        }

        Swal.fire({
            title: ":)!",
            text: "¡Compra realizada con éxito!",
            icon: "success",
        }).then((result) => {
            if (result.isConfirmed) {
                clearCart();
                navigate("/"); // Redireccionar al inicio
            }
        });
    };

    const total = cart.reduce(
        (acc, item) => acc + item.precio * item.cantidad,
        0,
    );

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <div className="flex-grow container pt-20">
                <main className="bg-white text-gray-800 px-4 md:px-8 lg:px-20 py-10">
                    <div className="max-w-4xl mx-auto p-6">
                        <h2 className="text-2xl font-bold mb-6">
                            Finalizar Compra
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Formulario */}
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <input
                                    type="text"
                                    name="nombre"
                                    value={form.nombre}
                                    onChange={handleChange}
                                    placeholder="Nombre completo"
                                    className="w-full border p-2 rounded"
                                />
                                <input
                                    type="email"
                                    name="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    placeholder="Correo electrónico"
                                    className="w-full border p-2 rounded"
                                />
                                <textarea
                                    name="direccion"
                                    value={form.direccion}
                                    onChange={handleChange}
                                    placeholder="Dirección de envío"
                                    className="w-full border p-2 rounded"
                                    rows="4"
                                >
                                </textarea>

                                <button
                                    type="submit"
                                    className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
                                >
                                    Confirmar compra
                                </button>
                            </form>

                            {/* Resumen del pedido */}
                            <div>
                                <h3 className="text-xl font-semibold mb-4">
                                    Resumen del pedido
                                </h3>
                                <ul className="divide-y">
                                    {cart.map((item) => (
                                        <li
                                            key={item.id}
                                            className="py-2 flex justify-between"
                                        >
                                            <span>
                                                {item.nombre} x {item.cantidad}
                                            </span>
                                            <span>
                                                ${item.precio * item.cantidad}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                                <p className="text-right text-lg font-bold mt-4">
                                    Total: ${total}
                                </p>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
            <Footer />
        </div>
    );
};

export default Checkout;
