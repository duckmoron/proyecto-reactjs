import React from 'react'
import Header from '../components/estaticos/Header'
import Footer from '../components/estaticos/Footer'

const AcercaDe = ({cart}) => {
  return (
    <>
    <Header cartItems={cart} />
        <h1>AcercaDe</h1>
    <Footer />
    </>
  )
}

export default AcercaDe