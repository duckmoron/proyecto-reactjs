import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";

const Productos = ({ producto }) => {
    const { handleAddToCart } = useContext(CartContext);
    const [cantidad, setCantidad] = useState(1);

    const increase = () =>
        setCantidad((prev) => (prev < producto.stock ? prev + 1 : prev));
    const decrease = () => setCantidad((prev) => (prev > 1 ? prev - 1 : 1));

    return (
        <div className="my-4 w-full max-w-sm min-h-[500px] bg-white rounded-xl shadow-lg overflow-hidden group transition-all flex flex-col justify-between">
            {/* Imagen y título */}
            <div>
                <Link
                    to={`/productos/${producto.id}`}
                    className="relative block group"
                >
                    <img
                        src={producto.imagen}
                        alt={producto.nombre}
                        className="w-full h-52 object-cover transition-opacity duration-300 group-hover:opacity-60"
                    />
                    <span className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium z-20">
                        Nuevo
                    </span>

                    {/* Texto que aparece sobre la imagen al hacer hover */}
                    <div className="absolute inset-0 flex items-center justify-center text-white text-lg font-bold opacity-0 group-hover:opacity-100 transition-opacity bg-black bg-opacity-50 z-30 pointer-events-none">
                        VER MÁS
                    </div>
                </Link>

                <div className="p-4">
                    <h3 className="text-xl font-bold text-gray-900 line-clamp-2">
                        {producto.nombre}
                    </h3>
                </div>
            </div>

            {/* Contenido inferior */}
            <div className="px-4 pb-4 space-y-4 mt-auto">
                {/* Precio a la izquierda, contador + stock a la derecha */}
                <div className="flex justify-between items-start">
                    {/* Precio */}
                    <p className="numeros text-4xl font-bold text-gray-900">
                        $ {producto.precio}
                    </p>

                    {/* Contador y stock */}
                    <div className="flex flex-col items-end">
                        <div className="bg-gray-200 inline-flex items-center border rounded overflow-hidden">
                            <button
                                onClick={decrease}
                                className="px-3 py-1 hover:bg-gray-300 text-lg font-bold"
                            >
                                -
                            </button>
                            <span className="numeros w-12 text-center text-lg font-semibold border-x">
                                {cantidad}
                            </span>
                            <button
                                onClick={increase}
                                className="px-3 py-1 hover:bg-gray-300 text-lg font-bold"
                            >
                                +
                            </button>
                        </div>

                        {/* Stock debajo alineado a la derecha */}
                        <p className="numeros text-sm text-gray-500 mt-1 text-right">
                            Stock: {producto.stock}
                        </p>
                    </div>
                </div>

                {/* Botón agregar al carrito */}
                {cantidad > 0 && (
                    <button
                        onClick={() =>
                            handleAddToCart({ ...producto, cantidad })}
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 !rounded-lg transition-colors"
                    >
                        Agregar al carrito
                    </button>
                )}
            </div>
        </div>
    );
};

export default Productos;
