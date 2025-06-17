import React, { useContext } from "react";
import { useParams, Link } from 'react-router-dom'
import Header from './estaticos/Header'
import Footer from './estaticos/Footer'
import { CartContext } from '../context/CartContext'

const DetallesProductos = () => {

    const { productos } = useContext(CartContext)

    const {id} = useParams()

    const product = productos.find(producto => producto.id == id)

  return (
    <>
      <Header />
        <main style={{margin:'50px auto'}}>
          <section
            style={{
              maxWidth: '600px',
              margin: '32px auto',
              padding: '2rem',
              border: '1px solid #eee',
              borderRadius: '12px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.07)',
              background: '#fff',
            }}
          >
            <h1 style={{ fontSize: '2rem', marginBottom: '1rem', color: '#333' }}>
              {product.nombre}
            </h1>
            {product.imagen && (
              <img
                src={product.imagen}
                alt={product.nombre}
                style={{
                  width: '100%',
                  maxHeight: '300px',
                  objectFit: 'cover',
                  borderRadius: '8px',
                  marginBottom: '1.5rem',
                }}
              />
            )}
            <p style={{ fontSize: '1.1rem', marginBottom: '1rem', color: '#555' }}>
              {product.descripcion}
            </p>
            <p style={{ fontWeight: 'bold', fontSize: '1.3rem', color: '#007b55' }}>
              Precio: ${product.precio}
            </p>
            <details style={{ marginBottom: '1.5rem' }}>
              <summary style={{ fontWeight: 'bold', color: '#333' }}>
                Detalles del producto
              </summary>
              <ul style={{ paddingLeft: '1.5rem', color: '#555' }}>
                <li>Marca: <br />Acme</li>
                <li>Categoría:  <br />{product.categoria}</li>
                <li>SKU:  <br />{product.id * 1250}</li>
                <li>Fecha de lanzamiento:  <br />{new Date().toLocaleDateString('es-ES', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric'
                })}</li>
              </ul>
            </details>
            <p style={{ fontSize: '1rem', color: '#888', marginBottom: '1.5rem' }}>
              Stock: {product.stock}
            </p>
            <Link
              to="/"
              style={{
                display: 'inline-block',
                padding: '0.5rem 1.5rem',
                background: '#007bff',
                color: '#fff',
                borderRadius: '6px',
                textDecoration: 'none',
                fontWeight: 'bold',
                marginTop: '1rem',
              }}
            >
              Volver a Home
            </Link>
          </section>
        </main>
      <Footer />
    </>
  )
}

export default DetallesProductos
