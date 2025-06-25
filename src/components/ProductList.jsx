import React, { useContext, useState, useMemo, useEffect } from 'react';
import Productos from './Productos';
import { CartContext } from '../context/CartContext';

const ProductList = () => {
  const { productos, busqueda, setBusqueda } = useContext(CartContext);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [orden, setOrden] = useState(''); // sin orden al inicio

  const productosFiltrados = useMemo(() => {
    return productos.filter((p) =>
      p.nombre.toLowerCase().includes(busqueda.toLowerCase().trim())
    );
  }, [productos, busqueda]);

  const productosOrdenados = useMemo(() => {
    if (!orden) return productosFiltrados; // sin ordenar

    let productosCopy = [...productosFiltrados];
    if (orden === 'nombre-asc') {
      productosCopy.sort((a, b) => a.nombre.localeCompare(b.nombre));
    } else if (orden === 'nombre-desc') {
      productosCopy.sort((a, b) => b.nombre.localeCompare(a.nombre));
    } else if (orden === 'precio-asc') {
      productosCopy.sort((a, b) => a.precio - b.precio);
    } else if (orden === 'precio-desc') {
      productosCopy.sort((a, b) => b.precio - a.precio);
    }
    return productosCopy;
  }, [productosFiltrados, orden]);

  const totalPages = Math.ceil(productosOrdenados.length / itemsPerPage);
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentProducts = productosOrdenados.slice(indexOfFirst, indexOfLast);

  useEffect(() => {
    setCurrentPage(1);
  }, [busqueda, orden, itemsPerPage]);

  return (
    <div className="max-w-6xl mx-auto px-4">
      {/* Filtros */}
      <div className="gap-3 flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4 my-6">
        {/* Input búsqueda */}
        <input
          type="text"
          placeholder="Buscar productos..."
          className="flex-grow p-2 h-10 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />

        {/* Select orden */}
        <select
          value={orden}
          onChange={(e) => setOrden(e.target.value)}
          className="p-2 h-10 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        >
          <option value="">-- Sin ordenar --</option>
          <option value="nombre-asc">Nombre A-Z</option>
          <option value="nombre-desc">Nombre Z-A</option>
          <option value="precio-asc">Precio menor a mayor</option>
          <option value="precio-desc">Precio mayor a menor</option>
        </select>

        {/* Select cantidad por página */}
        <select
          value={itemsPerPage}
          onChange={(e) => setItemsPerPage(Number(e.target.value))}
          className="p-2 h-10 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        >
          <option value={6}>6 por página</option>
          <option value={9}>9 por página</option>
          <option value={12}>12 por página</option>
          <option value={24}>24 por página</option>
        </select>
      </div>

      {/* Grid de productos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {currentProducts.length > 0 ? (
          currentProducts.map((producto) => (
            <Productos key={producto.id} producto={producto} className="shadow-lg" />
          ))
        ) : (
          <p className="text-center text-red-500 col-span-full">
            No se encontraron productos
          </p>
        )}
      </div>

      {/* Paginación */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-6 space-x-2">
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className={`px-3 py-1 !rounded-l-md ${
              currentPage === 1
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-blue-500 text-white hover:bg-blue-600'
            }`}
          >
            <i className="fas fa-chevron-left" />
          </button>

          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 ${
                currentPage === i + 1
                  ? 'bg-blue-700 text-white font-bold'
                  : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
              } hidden md:inline-block`}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            className={`px-3 py-1 !rounded-r-md ${
              currentPage === totalPages
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-blue-500 text-white hover:bg-blue-600'
            }`}
          >
            <i className="fas fa-chevron-right" />
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductList;
