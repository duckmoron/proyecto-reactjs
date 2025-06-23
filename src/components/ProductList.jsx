import React, { useContext, useState, useMemo, useEffect } from 'react';
import Productos from './Productos';
import { CartContext } from '../context/CartContext';

const ProductList = () => {
  const { productos, busqueda, setBusqueda } = useContext(CartContext);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Filtro mejorado: insensible a mayúsculas y espacios
  const productosFiltrados = useMemo(() => {
    return productos.filter((p) =>
      p.nombre.toLowerCase().includes(busqueda.toLowerCase().trim())
    );
  }, [productos, busqueda]);

  const totalPages = Math.ceil(productosFiltrados.length / itemsPerPage);
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentProducts = productosFiltrados.slice(indexOfFirst, indexOfLast);

  // Resetear página al cambiar búsqueda
  useEffect(() => {
    setCurrentPage(1);
  }, [busqueda]);

  return (
    <div className="max-w-6xl mx-auto px-4">
      {/* Input de búsqueda */}
      <div className="my-6">
        <input
          type="text"
          placeholder="Buscar productos..."
          className="w-full md:w-1/2 p-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
      </div>

      {/* Grid de productos con 3 columnas responsive */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {currentProducts.length > 0 ? (
          currentProducts.map((producto) => (
            <Productos key={producto.id} producto={producto} />
          ))
        ) : (
          <p className="text-center text-red-500 col-span-full">No se encontraron productos</p>
        )}
      </div>

      {/* Paginación */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-6 space-x-2">
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className={`px-3 py-1 rounded ${
              currentPage === 1
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-blue-500 text-white hover:bg-blue-600'
            }`}
          >
            Anterior
          </button>

          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 rounded ${
                currentPage === i + 1
                  ? 'bg-blue-700 text-white font-bold'
                  : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            className={`px-3 py-1 rounded ${
              currentPage === totalPages
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-blue-500 text-white hover:bg-blue-600'
            }`}
          >
            Siguiente
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductList;
