import React, { useContext } from 'react'
import Header from '../components/estaticos/Header'
import Footer from '../components/estaticos/Footer'
import ProductList from '../components/ProductList'
import loading from '../assets/loading.gif'

import { CartContext } from '../context/CartContext'

const Home = () => {
  
  const { cargando } = useContext(CartContext)
  
  return (
    <>
    <div className="container">
      <Header />
      <main>
        
          <h1>Bienvenidos a mi Tienda</h1>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque sequi, illum maiores qui amet sint ratione possimus. Et porro recusandae odio error, ab mollitia cumque dolor maxime minima necessitatibus quod?</p>
        {
          cargando ? (
            <img src={loading} alt='loading' />
          ) : (
            <>
              <h2>Galeria de productos</h2>
              <ProductList />
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