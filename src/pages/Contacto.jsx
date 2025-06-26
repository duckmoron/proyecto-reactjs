import React from "react";
import Header from "../components/estaticos/Header";
import Footer from "../components/estaticos/Footer";

const Contactos = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-grow container pt-20">
  <main className="bg-white text-gray-800 px-4 md:px-8 lg:px-20 py-10">
    <h1>Formulario de Contacto</h1>
    
    {/* Este es el contenedor del formulario */}
    <div className="p-4 my-3 w-full md:w-3/4 lg:w-1/2 mx-auto">
      <input
        type="text"
        className="form-control mb-3"
        placeholder="Nombre completo"
      />
      <input
        type="email"
        className="form-control mb-3"
        placeholder="Correo electrónico"
      />
      <input
        type="tel"
        className="form-control mb-3"
        placeholder="Teléfono (opcional)"
      />

      <select className="form-control mb-3">
        <option value="">Selecciona un motivo</option>
        <option value="producto">Consulta sobre un producto</option>
        <option value="pedido">Estado del pedido</option>
        <option value="devolucion">Devoluciones y reembolsos</option>
        <option value="pago">Problemas con el pago</option>
        <option value="otro">Otro</option>
      </select>

      <input
        type="text"
        className="form-control mb-3"
        placeholder="Número de pedido (si aplica)"
      />
      <textarea
        className="form-control mb-3"
        rows="5"
        placeholder="Escribe tu mensaje..."
      ></textarea>

      <div className="form-check mb-3">
        <input
          type="checkbox"
          className="form-check-input"
          id="aceptaPolitica"
        />
        <label className="form-check-label" htmlFor="aceptaPolitica">
          Acepto la política de privacidad
        </label>
      </div>

      <button className="btn btn-success w-100">Enviar</button>
    </div>
  </main>
</div>

      <Footer />
    </div>
  );
};

export default Contactos;
