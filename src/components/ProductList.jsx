import React, { useContext } from 'react'
import Productos from './Productos'
import { CartContext } from '../context/CartContext'

const ProductList = () => {

  const { productos, productosFiltrados, busqueda, setBusqueda } = useContext(CartContext)

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
          productosFiltrados.map(producto => (
            <Productos key={producto.id} producto={producto} />
          ))
        }
      </div>
    </>
  )
}

export default ProductList
