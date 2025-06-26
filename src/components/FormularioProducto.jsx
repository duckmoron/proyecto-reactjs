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
            <h2>Agregar Producto</h2>
            <div>
                <label>Nombre:</label>
                <input
                    type="text"
                    name="nombre"
                    value={producto.nombre}
                    onChange={handleChange}
                    required
                />
                {errores.nombre && (
                    <p style={{ color: "red" }}>{errores.nombre}</p>
                )}
            </div>
            <div>
                <label>Precio:</label>
                <input
                    type="number"
                    name="precio"
                    value={producto.precio}
                    onChange={handleChange}
                    required
                    min="0"
                    step="0.01"
                />
                {errores.precio && (
                    <p style={{ color: "red" }}>{errores.precio}</p>
                )}
            </div>
            <div>
                <label>Stock:</label>
                <input
                    type="number"
                    name="stock"
                    value={producto.stock}
                    onChange={handleChange}
                    required
                    min="0"
                />
                {errores.stock && (
                    <p style={{ color: "red" }}>{errores.stock}</p>
                )}
            </div>
            <div>
                <label>Imagen URL:</label>
                <input
                    type="text"
                    name="imagen"
                    value={producto.imagen}
                    onChange={handleChange}
                    required
                />
                {errores.imagen && (
                    <p style={{ color: "red" }}>{errores.imagen}</p>
                )}
            </div>
            <div>
                <label>Categoría:</label>
                <input
                    type="text"
                    name="categoria"
                    value={producto.categoria}
                    onChange={handleChange}
                    required
                />
                {errores.categoria && (
                    <p style={{ color: "red" }}>{errores.categoria}</p>
                )}
            </div>
        </div>
    );
});

export default FormularioProducto;
