import React, { useContext } from "react";
import { Helmet } from "react-helmet";
import Header from "../components/estaticos/Header";
import Footer from "../components/estaticos/Footer";
import ProductList from "../components/ProductList";
import loading from "../assets/loading.gif";

import { CartContext } from "../context/CartContext";

const GaleriaDeProductos = () => {
  const { cargando } = useContext(CartContext);

  return (
    <>
    <Helmet>
        <title>Productos | Duck-Commercio</title>
        <meta
          name="description"
          content="Bienvenido a la página de productos de nuestro sitio."
        />
      </Helmet>
      <Header />
        <div className="container pt-20">
          <main className="min-h-screen bg-white text-gray-800 px-4 md:px-8 lg:px-20 py-10">
            <h1>Galeria de productos</h1>
            {cargando
            ? (
              <div className="flex justify-center items-center h-64">
                <img
                  src={loading}
                  alt="Cargando..."
                  className=""
                />
              </div>
            )
            : (
              <section className="mt-10">
                <ProductList />
              </section>
            )}
          </main>
        </div>
      <Footer />
    </>
  );
};

export default GaleriaDeProductos;
