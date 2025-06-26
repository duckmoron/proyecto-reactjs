import React, {
    forwardRef,
    useEffect,
    useImperativeHandle,
    useState,
} from "react";

const FormularioEdicion = forwardRef(({ productoSeleccionado }, ref) => {
    const [producto, setProducto] = useState(productoSeleccionado);

    useEffect(() => {
        setProducto(productoSeleccionado);
    }, [productoSeleccionado]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProducto((prev) => ({ ...prev, [name]: value }));
    };

    // Validación más completa
    const validarFormulario = () => {
        if (
            !producto.nombre?.trim() ||
            producto.precio === "" ||
            Number(producto.precio) < 0 ||
            producto.stock === "" ||
            Number(producto.stock) < 0 ||
            !producto.imagen?.trim() ||
            !producto.categoria?.trim() ||
            producto.categoria.length < 5
        ) {
            return false;
        }
        return true;
    };

    // Exponer funciones al padre (Admin)
    useImperativeHandle(ref, () => ({
        getProducto: () => ({
            ...producto,
            precio: Number(producto.precio),
            stock: Number(producto.stock),
        }),
        validar: () => validarFormulario(),
    }));

    return (
        <div>
            <h2>Editar Producto</h2>
            <div>
                <label>ID:</label>
                <input
                    type="number"
                    name="id"
                    value={producto.id || ""}
                    readOnly
                />
            </div>
            <div>
                <label>Nombre:</label>
                <input
                    type="text"
                    name="nombre"
                    value={producto.nombre || ""}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Precio:</label>
                <input
                    type="number"
                    name="precio"
                    value={producto.precio || ""}
                    onChange={handleChange}
                    min="0"
                    step="0.01"
                    required
                />
            </div>
            <div>
                <label>Stock:</label>
                <input
                    type="number"
                    name="stock"
                    value={producto.stock || ""}
                    onChange={handleChange}
                    min="0"
                    required
                />
            </div>
            <div>
                <label>Imagen URL:</label>
                <input
                    type="text"
                    name="imagen"
                    value={producto.imagen || ""}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Categoría:</label>
                <input
                    type="text"
                    name="categoria"
                    value={producto.categoria || ""}
                    onChange={handleChange}
                    required
                />
            </div>
        </div>
    );
});

export default FormularioEdicion;
