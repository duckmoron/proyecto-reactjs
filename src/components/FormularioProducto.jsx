import React, { forwardRef, useImperativeHandle, useState } from "react";

const FormularioProducto = forwardRef((props, ref) => {
    const [producto, setProducto] = useState({
        nombre: "",
        precio: "",
        stock: "",
        imagen: "",
        categoria: "",
    });

    const [errores, setErrores] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProducto((prev) => ({ ...prev, [name]: value }));
    };

    const validarFormulario = () => {
        const nuevosErrores = {};
        if (!producto.nombre.trim()) {
            nuevosErrores.nombre = "El nombre es obligatorio.";
        }
        if (!producto.precio || Number(producto.precio) <= 0) {
            nuevosErrores.precio = "El precio debe ser mayor a 0.";
        }
        if (!producto.categoria.trim() || producto.categoria.length < 5) {
            nuevosErrores.categoria =
                "La categoría debe tener al menos 5 caracteres.";
        }
        if (!producto.stock || Number(producto.stock) < 0) {
            nuevosErrores.stock =
                "El stock es obligatorio y debe ser 0 o mayor.";
        }
        if (!producto.imagen.trim()) {
            nuevosErrores.imagen = "La URL de la imagen es obligatoria.";
        }
        setErrores(nuevosErrores);
        return Object.keys(nuevosErrores).length === 0;
    };

    // Exponer métodos para el padre mediante ref
    useImperativeHandle(ref, () => ({
        validar: () => validarFormulario(),
        getProducto: () => ({
            ...producto,
            precio: Number(producto.precio),
            stock: Number(producto.stock),
        }),
    }));

    return (
        <div>
            <div className="mb-4">
                <label className="block mb-1 font-medium" htmlFor="nombre">
                    Nombre:
                </label>
                <input
                    id="nombre"
                    type="text"
                    name="nombre"
                    value={producto.nombre}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errores.nombre && (
                    <p className="text-red-600 mt-1">{errores.nombre}</p>
                )}
            </div>

            <div className="mb-4">
                <label className="block mb-1 font-medium" htmlFor="precio">
                    Precio:
                </label>
                <input
                    id="precio"
                    type="number"
                    name="precio"
                    value={producto.precio}
                    onChange={handleChange}
                    required
                    min="0"
                    step="0.01"
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errores.precio && (
                    <p className="text-red-600 mt-1">{errores.precio}</p>
                )}
            </div>

            <div className="mb-4">
                <label className="block mb-1 font-medium" htmlFor="stock">
                    Stock:
                </label>
                <input
                    id="stock"
                    type="number"
                    name="stock"
                    value={producto.stock}
                    onChange={handleChange}
                    required
                    min="0"
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errores.stock && (
                    <p className="text-red-600 mt-1">{errores.stock}</p>
                )}
            </div>

            <div className="mb-4">
                <label className="block mb-1 font-medium" htmlFor="imagen">
                    Imagen URL:
                </label>
                <input
                    id="imagen"
                    type="text"
                    name="imagen"
                    value={producto.imagen}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errores.imagen && (
                    <p className="text-red-600 mt-1">{errores.imagen}</p>
                )}
            </div>

            <div className="mb-4">
                <label className="block mb-1 font-medium" htmlFor="categoria">
                    Categoría:
                </label>
                <input
                    id="categoria"
                    type="text"
                    name="categoria"
                    value={producto.categoria}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errores.categoria && (
                    <p className="text-red-600 mt-1">{errores.categoria}</p>
                )}
            </div>
        </div>
    );
});

export default FormularioProducto;
