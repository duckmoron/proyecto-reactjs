import React from 'react'
import Header from '../components/estaticos/Header'
import Footer from '../components/estaticos/Footer'

const Contactos = ({cart,borrarProducto}) => {
  return (
    <>
    <Header borrarProducto={borrarProducto} cartItems={cart} />
    <main>
        <h1>Contacto</h1>
    </main>
    <Footer />
    </>
  )
}

export default Contactos