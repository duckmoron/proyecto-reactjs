import React, { useContext, useState } from "react";
import { Helmet } from "react-helmet";
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
        telefono: "",
        ciudad: "",
        codigoPostal: "",
        envio: "normal",
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const validarCampos = () => {
        const nuevosErrores = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const soloNumeros = /^[0-9]+$/;

        if (!form.nombre.trim()) {
            nuevosErrores.nombre = "Este campo es obligatorio";
        }
        if (!form.email.trim()) {
            nuevosErrores.email = "Este campo es obligatorio";
        } else if (!emailRegex.test(form.email)) {
            nuevosErrores.email = "Correo electrónico inválido";
        }

        if (!form.telefono.trim()) {
            nuevosErrores.telefono = "Este campo es obligatorio";
        } else if (!soloNumeros.test(form.telefono)) {
            nuevosErrores.telefono = "Debe contener solo números";
        }

        if (!form.direccion.trim()) {
            nuevosErrores.direccion = "Este campo es obligatorio";
        }
        if (!form.ciudad.trim()) {
            nuevosErrores.ciudad = "Este campo es obligatorio";
        }

        if (!form.codigoPostal.trim()) {
            nuevosErrores.codigoPostal = "Este campo es obligatorio";
        } else if (!soloNumeros.test(form.codigoPostal)) {
            nuevosErrores.codigoPostal = "Debe contener solo números";
        }

        return nuevosErrores;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const errores = validarCampos();
        if (Object.keys(errores).length > 0) {
            setErrors(errores);
            Swal.fire({
                title: ":(",
                text: "Por favor revisa los campos marcados.",
                icon: "error",
            });
            return;
        }

        Swal.fire({
            title: "¡Compra confirmada!",
            text: "Gracias por tu compra.",
            icon: "success",
        }).then(() => {
            clearCart();
            navigate("/");
        });
    };

    const subtotal = cart.reduce(
        (acc, item) => acc + item.precio * item.cantidad,
        0,
    );
    const costoEnvio = form.envio === "express"
        ? 3000
        : form.envio === "pickup"
        ? 0
        : 1500;
    const total = subtotal + costoEnvio;

    return (
        <>
            <Helmet>
                <title>Checkout | Duck-Commercio</title>
                <meta
                    name="description"
                    content="Página de finalización de compra."
                />
            </Helmet>
            <div className="flex flex-col min-h-screen">
                <Header />
                <div className="flex-grow container pt-20">
                    <main className="bg-white text-gray-800 px-4 md:px-8 lg:px-20 py-10">
                        <h1>Finalizar Compra</h1>
                        <div className="max-w-4xl mx-auto p-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {/* Formulario */}
                                <form
                                    onSubmit={handleSubmit}
                                    className="space-y-5"
                                >
                                    <div className="space-y-4">
                                        {[
                                            {
                                                name: "nombre",
                                                placeholder: "Nombre completo",
                                                type: "text",
                                            },
                                            {
                                                name: "email",
                                                placeholder:
                                                    "Correo electrónico",
                                                type: "email",
                                            },
                                            {
                                                name: "telefono",
                                                placeholder: "Teléfono",
                                                type: "text",
                                            },
                                            {
                                                name: "ciudad",
                                                placeholder: "Ciudad",
                                                type: "text",
                                            },
                                            {
                                                name: "codigoPostal",
                                                placeholder: "Código postal",
                                                type: "text",
                                            },
                                        ].map(({ name, placeholder, type }) => (
                                            <div key={name}>
                                                <input
                                                    type={type}
                                                    name={name}
                                                    value={form[name]}
                                                    onChange={handleChange}
                                                    placeholder={placeholder}
                                                    className={`w-full border p-2 rounded ${
                                                        errors[name]
                                                            ? "border-red-500"
                                                            : ""
                                                    }`}
                                                />
                                                {errors[name] && (
                                                    <p className="text-red-500 text-sm mt-1">
                                                        {errors[name]}
                                                    </p>
                                                )}
                                            </div>
                                        ))}

                                        <div>
                                            <textarea
                                                name="direccion"
                                                value={form.direccion}
                                                onChange={handleChange}
                                                placeholder="Dirección"
                                                className={`w-full border p-2 rounded ${
                                                    errors.direccion
                                                        ? "border-red-500"
                                                        : ""
                                                }`}
                                                rows="3"
                                            />
                                            {errors.direccion && (
                                                <p className="text-red-500 text-sm mt-1">
                                                    {errors.direccion}
                                                </p>
                                            )}
                                        </div>

                                        <div>
                                            <select
                                                name="envio"
                                                value={form.envio}
                                                onChange={handleChange}
                                                className="w-full border p-2 rounded"
                                            >
                                                <option value="normal">
                                                    Envío estándar - $1500
                                                </option>
                                                <option value="express">
                                                    Envío express - $3000
                                                </option>
                                                <option value="pickup">
                                                    Retiro en tienda - GRATIS
                                                </option>
                                            </select>
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
                                    >
                                        Confirmar compra
                                    </button>
                                </form>

                                {/* Resumen del pedido */}
                                <div className="bg-gray-100 rounded-lg p-6 shadow-sm">
                                    <h3 className="text-xl font-semibold mb-4">
                                        Resumen del pedido
                                    </h3>
                                    <ul className="divide-y divide-gray-300">
                                        {cart.map((item) => (
                                            <li
                                                key={item.id}
                                                className="py-3 flex justify-between text-sm md:text-base"
                                            >
                                                <span className="text-gray-700">
                                                    {item.nombre} x{" "}
                                                    {item.cantidad}
                                                </span>
                                                <span className="text-gray-800 font-medium numeros">
                                                    ${" "}
                                                    {item.precio *
                                                        item.cantidad}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                    <hr className="my-4" />
                                    <div className="flex justify-between text-sm md:text-base mb-2">
                                        <span className="font-medium text-gray-600">
                                            Subtotal:
                                        </span>
                                        <span className="numeros">
                                            $ {subtotal.toFixed(2)}
                                        </span>
                                    </div>
                                    <div className="flex justify-between text-sm md:text-base mb-2">
                                        <span className="font-medium text-gray-600">
                                            Costo de envío:
                                        </span>
                                        <span className="numeros">
                                            $ {costoEnvio}
                                        </span>
                                    </div>
                                    <p className="text-right text-lg font-bold text-gray-900 mt-4">
                                        <span className="numeros">
                                            Total: $ {total.toFixed(2)}
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
                <Footer />
            </div>
        </>
    );
};

export default Checkout;
