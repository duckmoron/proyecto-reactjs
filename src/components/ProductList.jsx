import React, { useContext, useState } from 'react'
import Productos from './Productos'
import { CartContext } from '../context/CartContext'
import Pagination from 'react-bootstrap/Pagination'

const ProductList = () => {

  const { productos, productosFiltrados, busqueda, setBusqueda } = useContext(CartContext)

  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 3
  const indexOfLast = currentPage * itemsPerPage
  const indexOfFirst = indexOfLast - itemsPerPage
  const currentProducts = productosFiltrados.slice(indexOfFirst, indexOfLast)
  const totalPages = Math.ceil(productosFiltrados.length / itemsPerPage)

  return (
    <>
      <input 
        type='text'
        placeholder='Buscar productos...'
        value={busqueda}
        onChange={(e)=> setBusqueda(e.target.value)}
      />
      <div style={{ display:'flex', flexWrap:'wrap', justifyContent:'space-evenly' }}>
        {
          currentProducts.map(producto => (
            <Productos key={producto.id} producto={producto} />
          ))
        }
      </div>
      <Pagination>
        <Pagination.Prev onClick={()=>setCurrentPage(p => Math.max(p-1,1))} disabled={currentPage === 1}/>
          {
            Array.from({length:totalPages},(_,i) => (
              <Pagination.Item key={i+1} active={i+1 === currentPage} onClick={() => setCurrentPage(i+1)}>
                {i+1}
              </Pagination.Item>
            ))
          }
        <Pagination.Next onClick={()=>setCurrentPage(p => Math.min(p+1,totalPages))} disabled={currentPage === totalPages}/>
      </Pagination>
    </>
  )
}

export default ProductList
