import React, { useContext } from "react";
import { useParams, Link } from 'react-router-dom'
import Header from "../components/estaticos/Header";
import Footer from "../components/estaticos/Footer";
import { CartContext } from '../context/CartContext'

const DetallesProductos = () => {

    const { productos } = useContext(CartContext)

    const {id} = useParams()

    const product = productos.find(producto => producto.id == id)

  return (
    <>
      <Header />
        <main style={{margin:'50px auto'}}>
          <h1>Detalle del producto: {id}</h1>
          {product ? (
              <div style={{display:'flex', gap:'30px'}}>
                <div style={{width:'200px'}} className="imganContainer">
                    <img src={product.imagen} alt="" className="imagen"/>
                </div>
                <div>
                  <h2>{product.nombre}</h2>
                  <p>{product.categoria}</p>
                  <Link to='/'>Volver al inicio</Link>
                </div>
              </div>
            ) : (
              <p>Producto no encontrado</p>
            )
          }
        </main>
      <Footer />
    </>
  )
}

export default DetallesProductos
