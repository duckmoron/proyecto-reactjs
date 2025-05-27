import React from 'react'
import Header from '../components/estaticos/Header'
import Footer from '../components/estaticos/Footer'
import ProductList from '../components/ProductList'
import loading from '../assets/loading.gif'

const Home = ({ cart, productos, cargando, agregarCarrito, borrarProducto }) => {
  return (
    <>
    <div className="container">
      <Header borrarProducto={borrarProducto} cartItems={cart} />
      <main>
        
          <h1>Bienvenidos a mi Tienda</h1>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque sequi, illum maiores qui amet sint ratione possimus. Et porro recusandae odio error, ab mollitia cumque dolor maxime minima necessitatibus quod?</p>
        {
          cargando ? (
            <img src={loading} alt='loading' />
          ) : (
            <>
              <h2>Galeria de productos</h2>
              <ProductList agregarCarrito={agregarCarrito} productos={productos} />
            </>
          )
        }
          
      </main>
    </div>
    <Footer />
    </>
  )
}

export default Home