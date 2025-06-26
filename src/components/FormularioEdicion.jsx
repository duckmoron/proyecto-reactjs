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
        <div className="max-w-xl mx-auto p-2 bg-white text-left">
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    ID:
                </label>
                <input
                    type="number"
                    name="id"
                    value={producto.id || ""}
                    readOnly
                    className="w-full border border-gray-300 bg-gray-100 text-gray-500 rounded px-3 py-2"
                />
            </div>

            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nombre:
                </label>
                <input
                    type="text"
                    name="nombre"
                    value={producto.nombre || ""}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Precio:
                </label>
                <input
                    type="number"
                    name="precio"
                    value={producto.precio || ""}
                    onChange={handleChange}
                    min="0"
                    step="0.01"
                    required
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Stock:
                </label>
                <input
                    type="number"
                    name="stock"
                    value={producto.stock || ""}
                    onChange={handleChange}
                    min="0"
                    required
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Imagen URL:
                </label>
                <input
                    type="text"
                    name="imagen"
                    value={producto.imagen || ""}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Categoría:
                </label>
                <input
                    type="text"
                    name="categoria"
                    value={producto.categoria || ""}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
        </div>
    );
});

export default FormularioEdicion;
