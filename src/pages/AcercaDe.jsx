import React from 'react'
import Header from '../components/estaticos/Header'
import Footer from '../components/estaticos/Footer'
import imagen from '../assets/react.jpg' 
const AcercaDe = () => {
  return (
    <>
    <div className="flex flex-col min-h-screen">
      <Header />
        <div className="flex-grow container mx-auto pt-20 px-4 md:px-8 lg:px-20">
      <main className="bg-white text-gray-800 py-10 ">
        <h1 className="text-3xl md:text-4xl font-bold mb-10 text-indigo-600">
          Nosotros
        </h1>
        <div className="flex flex-col-reverse md:flex-row items-center gap-10">
          <div className="md:w-1/2">
            <div className="text-2xl font-semibold text-gray-700">
              Duck-Commercio
            </div>
            <div className="text-lg mb-4">Impresión con personalidad</div>
            <p className="text-lg mb-4">
              En <strong>Duck-Commercio</strong> nos apasiona transformar tus ideas en arte visual. Nos especializamos en la venta de <strong>gigantografías, pósters, stickers</strong> personalizados y mucho más.
            </p>
            <p className="text-base mb-4">
              Con diseños únicos, materiales de alta calidad y tecnología de impresión avanzada, damos vida a tus espacios, productos o marcas. Ya sea para tu hogar, oficina o negocio, tenemos la solución gráfica ideal.
            </p>
            <p className="text-indigo-600 font-semibold">
              ¡Somos creatividad impresa, somos Duck-Commercio!
            </p>
          </div>
          <div className="md:w-1/2">
            <img
              src={imagen}
              alt="Duck-Commercio equipo creativo"
              className="rounded-lg shadow-lg w-full object-cover"
            />
          </div>
        </div>
      </main>
    </div>
      <Footer />
    </div>
    </>
  )
}

export default AcercaDe