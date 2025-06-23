import React from 'react'
import Header from '../components/estaticos/Header'
import Footer from '../components/estaticos/Footer'

const Contactos = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
        <div className="flex-grow container pt-20">
          <main className="bg-white text-gray-800 px-4 md:px-8 lg:px-20 py-10">
            <h1>Contacto</h1>
            <div className="p-4 my-3 border rounded shadow">
              <h3 className="mb-3">Formulario de Contacto</h3>
              <input type="text" className="form-control mb-3" placeholder="Nombre" />
              <input type="email" className="form-control mb-3" placeholder="Correo Electrónico" />
              <button className="btn btn-success w-100">Enviar</button>
            </div>
          </main>
        </div>
      <Footer />
    </div>
  )
}

export default Contactos
