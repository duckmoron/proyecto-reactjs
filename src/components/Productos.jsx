import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { AnimatePresence, motion } from "framer-motion";

const Productos = ({ producto }) => {
    const { handleAddToCart } = useContext(CartContext);
    const [cantidad, setCantidad] = useState(1);
    const [hover, setHover] = useState(false);

    const increase = () =>
        setCantidad((prev) => (prev < producto.stock ? prev + 1 : prev));
    const decrease = () => setCantidad((prev) => (prev > 1 ? prev - 1 : 1));

    return (
        <div className="my-4 w-full max-w-sm min-h-[500px] bg-white rounded-xl shadow-lg overflow-hidden transition-all flex flex-col justify-between">
            {/* Imagen y título */}
            <div>
                <div
                    className="relative w-full h-52 overflow-hidden"
                    onMouseEnter={() => setHover(true)}
                    onMouseLeave={() => setHover(false)}
                >
                    <Link
                        to={`/productos/${producto.id}`}
                        className="block w-full h-full"
                    >
                        {/* Imagen que escala */}
                        <motion.img
                            src={producto.imagen}
                            alt={producto.nombre}
                            className="w-full h-full object-cover"
                            initial={{ scale: 1 }}
                            animate={hover ? { scale: 1.05 } : { scale: 1 }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                        />

                        {/* Overlay negro que solo cambia opacity */}
                        <AnimatePresence>
                            {hover && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{
                                        duration: 0.3,
                                        ease: "easeOut",
                                    }}
                                    className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20 pointer-events-none"
                                >
                                    <span className="text-white text-lg font-bold numeros">
                                        <i className="fa fa-2x fa-search-plus" aria-hidden="true"></i>
                                    </span>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {producto.id < 6 && (
                            <span className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium z-30">
                                Nuevo
                            </span>
                        )}
                    </Link>
                </div>

                <div className="p-4">
                    <h3 className="text-xl font-bold text-gray-900 line-clamp-2">
                        {producto.nombre}
                    </h3>
                </div>
            </div>

            {/* Contenido inferior */}
            <div className="px-4 pb-4 space-y-4 mt-auto">
                <div className="flex justify-between items-start">
                    <p className="numeros text-4xl font-bold text-gray-900">
                        $ {producto.precio}
                    </p>

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

                        <p className="numeros text-sm text-gray-500 mt-1 text-right">
                            Stock: {producto.stock}
                        </p>
                    </div>
                </div>

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
