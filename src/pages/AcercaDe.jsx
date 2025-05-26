import React from 'react'
import Header from '../components/estaticos/Header'
import Footer from '../components/estaticos/Footer'

const AcercaDe = ({cart,borrarProducto}) => {
  return (
    <>
    <Header borrarProducto={borrarProducto} cartItems={cart} />
    <main>
        <h1>AcercaDe</h1>
    </main>
    <Footer />
    </>
  )
}

export default AcercaDe