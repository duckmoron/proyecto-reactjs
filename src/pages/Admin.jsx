import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import { Helmet } from "react-helmet";
import MySwal from "../utils/swalWithReact";
import FormularioProducto from "../components/FormularioProducto";
import FormularioEdicion from "../components/FormularioEdicion";
import { AdminContext } from "../context/AdminContext";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Admin = () => {
    const navigate = useNavigate();
    const { logout } = useAuth();

    const {
        productos,
        loading,
        agregarProducto,
        actualizarProducto,
        eliminarProducto,
    } = useContext(AdminContext);

    const formAgregarRef = useRef();
    const formEditarRef = useRef();

    // Estados para filtros y paginación
    const [busqueda, setBusqueda] = useState("");
    const [orden, setOrden] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(6);

    // Filtrar productos según búsqueda
    const productosFiltrados = useMemo(() => {
        return productos.filter((p) =>
            p.nombre.toLowerCase().includes(busqueda.toLowerCase().trim())
        );
    }, [productos, busqueda]);

    // Ordenar productos según orden seleccionado
    const productosOrdenados = useMemo(() => {
        if (!orden) return productosFiltrados;

        let productosCopy = [...productosFiltrados];
        if (orden === "nombre-asc") {
            productosCopy.sort((a, b) => a.nombre.localeCompare(b.nombre));
        } else if (orden === "nombre-desc") {
            productosCopy.sort((a, b) => b.nombre.localeCompare(a.nombre));
        } else if (orden === "precio-asc") {
            productosCopy.sort((a, b) => a.precio - b.precio);
        } else if (orden === "precio-desc") {
            productosCopy.sort((a, b) => b.precio - a.precio);
        }
        return productosCopy;
    }, [productosFiltrados, orden]);

    // Paginación
    const totalPages = Math.ceil(productosOrdenados.length / itemsPerPage);
    const indexOfLast = currentPage * itemsPerPage;
    const indexOfFirst = indexOfLast - itemsPerPage;
    const currentProducts = productosOrdenados.slice(indexOfFirst, indexOfLast);

    // Reset página cuando cambian filtros
    useEffect(() => {
        setCurrentPage(1);
    }, [busqueda, orden, itemsPerPage]);

    // Modal agregar producto
    const handleAgregarProducto = () => {
        MySwal.fire({
            html: (
                <div className="text-left space-y-4">
                    {/* Encabezado consistente sin imagen */}
                    <div className="flex items-center space-x-4">
                        <div>
                            <div className="text-2xl font-bold">
                                Agregar nuevo producto:
                            </div>
                            {/* Opcional: espacio para nombre vacío para igualar alturas */}
                            <div className="text-sm text-gray-600 opacity-0">
                                Nombre aquí
                            </div>
                        </div>
                    </div>

                    {/* Formulario de agregar */}
                    <FormularioProducto ref={formAgregarRef} />
                </div>
            ),
            showCancelButton: true,
            confirmButtonText: "Agregar",
            cancelButtonText: "Cancelar",
            customClass: {
                popup: "swal2-modal-custom",
            },
            width: "auto",
            preConfirm: () => {
                const form = formAgregarRef.current;
                if (!form || !form.validar()) {
                    MySwal.showValidationMessage(
                        "Por favor, completa correctamente el formulario",
                    );
                    return false;
                }
                return form.getProducto();
            },
        }).then((result) => {
            if (result.isConfirmed) {
                agregarProducto(result.value);
                MySwal.close();
            }
        });
    };

    // Modal editar producto
    const handleEditarProducto = (producto) => {
        MySwal.fire({
            html: (
                <div className="text-left space-y-4">
                    {/* Encabezado con imagen y texto */}
                    <div className="flex items-center space-x-4">
                        <img
                            src={producto.imagen}
                            alt={producto.nombre}
                            className="w-20 h-20 object-cover rounded border"
                        />
                        <div>
                            <div className="text-2xl font-bold">
                                Editar producto:
                            </div>
                            <div className="text-sm text-gray-600">
                                {producto.nombre}
                            </div>
                        </div>
                    </div>

                    {/* Formulario debajo del encabezado */}
                    <FormularioEdicion
                        ref={formEditarRef}
                        productoSeleccionado={producto}
                    />
                </div>
            ),

            showCancelButton: true,
            confirmButtonText: "Actualizar",
            cancelButtonText: "Cancelar",
            customClass: {
                popup: "swal2-modal-custom",
            },
            width: "auto",
            preConfirm: () => {
                const form = formEditarRef.current;
                if (!form || !form.validar()) {
                    MySwal.showValidationMessage(
                        "Por favor, completa correctamente el formulario",
                    );
                    return false;
                }
                return form.getProducto();
            },
        }).then((result) => {
            if (result.isConfirmed) {
                actualizarProducto(result.value);
                MySwal.close();
            }
        });
    };

    return (
        <>
            <Helmet>
                <title>Admin | Duck-Commercio</title>
                <meta
                    name="description"
                    content="Página de administración de nuestro sitio."
                />
            </Helmet>
            <div className="min-h-screen bg-gray-100">
                {/* Header */}
                <header className="bg-gray-900 text-white shadow-md">
                    <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                        <h1 className="text-xl font-semibold">
                            Panel Administrativo
                        </h1>
                        <div className="space-x-3 flex gap-2 items-center">
                            <button
                                onClick={() => navigate("/")}
                                className="bg-white text-gray-800 px-3 py-1 rounded hover:bg-gray-200 transition"
                                title="Ver página"
                            >
                                Ver página
                            </button>
                            <button
                                onClick={logout}
                                className="bg-red-600 hover:bg-red-700 transition text-white px-3 py-1 rounded"
                                title="Cerrar sesión"
                            >
                                <i className="fa-solid fa-right-from-bracket mr-1">
                                </i>{" "}
                                Logout
                            </button>
                        </div>
                    </div>
                </header>

                {/* Contenido */}
                <main className="container mx-auto px-4 py-6">
                    {loading
                        ? (
                            <p className="text-center text-gray-600">
                                Cargando productos...
                            </p>
                        )
                        : (
                            <>
                                <div className="flex justify-between items-center mb-6">
                                    <h2 className="text-lg font-medium">
                                        Listado de productos
                                    </h2>
                                    <button
                                        onClick={handleAgregarProducto}
                                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                                    >
                                        + Agregar producto
                                    </button>
                                </div>

                                {/* Filtros */}
                                <div className="gap-3 flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4 mb-6">
                                    <input
                                        type="text"
                                        placeholder="Buscar productos..."
                                        className="flex-grow p-2 h-10 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                                        value={busqueda}
                                        onChange={(e) =>
                                            setBusqueda(e.target.value)}
                                    />

                                    <select
                                        value={orden}
                                        onChange={(e) =>
                                            setOrden(e.target.value)}
                                        className="p-2 h-10 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                                    >
                                        <option value="">
                                            -- Sin ordenar --
                                        </option>
                                        <option value="nombre-asc">
                                            Nombre A-Z
                                        </option>
                                        <option value="nombre-desc">
                                            Nombre Z-A
                                        </option>
                                        <option value="precio-asc">
                                            Precio menor a mayor
                                        </option>
                                        <option value="precio-desc">
                                            Precio mayor a menor
                                        </option>
                                    </select>

                                    <select
                                        value={itemsPerPage}
                                        onChange={(e) =>
                                            setItemsPerPage(
                                                Number(e.target.value),
                                            )}
                                        className="p-2 h-10 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                                    >
                                        <option value={6}>6 por página</option>
                                        <option value={9}>9 por página</option>
                                        <option value={12}>
                                            12 por página
                                        </option>
                                        <option value={24}>
                                            24 por página
                                        </option>
                                    </select>
                                </div>

                                {/* Listado productos */}
                                <ul className="space-y-4 !pl-0 list-none">
                                    {currentProducts.length > 0
                                        ? (
                                            currentProducts.map((product) => (
                                                <li
                                                    key={product.id}
                                                    className="bg-white rounded shadow p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
                                                >
                                                    {/* Imagen */}
                                                    <div className="flex-shrink-0">
                                                        <img
                                                            src={product.imagen}
                                                            alt={product.nombre}
                                                            className="w-20 h-20 object-cover rounded border"
                                                        />
                                                    </div>

                                                    {/* Columna: Nombre y Categoría */}
                                                    <div className="sm:flex-1">
                                                        <div className="font-semibold text-lg">
                                                            Nombre:{" "}
                                                            {product.nombre}
                                                        </div>
                                                        <div className="text-gray-900">
                                                            Categoría:{" "}
                                                            {product.categoria}
                                                        </div>
                                                    </div>

                                                    {/* Columna: Precio y Stock */}
                                                    <div className="sm:flex-1">
                                                        <div className="text-gray-600">
                                                            Precio:{" "}
                                                            <span className="numeros font-bold">
                                                                ${" "}
                                                                {product.precio}
                                                            </span>
                                                        </div>
                                                        <div className="text-gray-400">
                                                            Stock:{" "}
                                                            <span className="numeros">
                                                                {product.stock}
                                                            </span>
                                                        </div>
                                                    </div>

                                                    {/* Botones */}
                                                    <div className="flex gap-2 justify-end sm:justify-start">
                                                        <button
                                                            className="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500"
                                                            onClick={() =>
                                                                handleEditarProducto(
                                                                    product,
                                                                )}
                                                        >
                                                            Editar
                                                        </button>
                                                        <button
                                                            onClick={() =>
                                                                eliminarProducto(
                                                                    product.id,
                                                                )}
                                                            className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                                                        >
                                                            Eliminar
                                                        </button>
                                                    </div>
                                                </li>
                                            ))
                                        )
                                        : (
                                            <p className="text-center text-red-500">
                                                No se encontraron productos
                                            </p>
                                        )}
                                </ul>

                                {/* Paginación */}
                                {totalPages > 1 && (
                                    <div className="flex justify-center mt-6 space-x-2">
                                        <button
                                            onClick={() =>
                                                setCurrentPage((p) =>
                                                    Math.max(p - 1, 1)
                                                )}
                                            disabled={currentPage === 1}
                                            className={`px-3 py-1 !rounded-l-md ${
                                                currentPage === 1
                                                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                                    : "bg-blue-600 text-white hover:bg-blue-700"
                                            }`}
                                        >
                                            <i className="fas fa-chevron-left" />
                                        </button>

                                        {Array.from(
                                            { length: totalPages },
                                            (_, i) => (
                                                <button
                                                    key={i + 1}
                                                    onClick={() =>
                                                        setCurrentPage(i + 1)}
                                                    className={`px-3 py-1 ${
                                                        currentPage === i + 1
                                                            ? "bg-blue-800 text-white font-bold"
                                                            : "bg-blue-200 text-blue-800 hover:bg-blue-300"
                                                    } hidden md:inline-block`}
                                                >
                                                    {i + 1}
                                                </button>
                                            ),
                                        )}

                                        <button
                                            onClick={() =>
                                                setCurrentPage((p) =>
                                                    Math.min(p + 1, totalPages)
                                                )}
                                            disabled={currentPage ===
                                                totalPages}
                                            className={`px-3 py-1 !rounded-r-md ${
                                                currentPage === totalPages
                                                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                                    : "bg-blue-600 text-white hover:bg-blue-700"
                                            }`}
                                        >
                                            <i className="fas fa-chevron-right" />
                                        </button>
                                    </div>
                                )}
                            </>
                        )}
                </main>
            </div>
        </>
    );
};

export default Admin;
