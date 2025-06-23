import React, { useContext } from "react";
import Header from "../components/estaticos/Header";
import Footer from "../components/estaticos/Footer";
import ProductList from "../components/ProductList";
import loading from "../assets/loading.gif";

import { CartContext } from "../context/CartContext";

const Home = () => {
  const { cargando } = useContext(CartContext);

  return (
    <>
      <Header />
      <div className="container pt-20">
        <main className="min-h-screen bg-white text-gray-800 px-4 md:px-8 lg:px-20 py-10">
          {/* Bienvenida */}
          <section className="mb-10">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Bienvenidos a mi Tienda
            </h1>
            <p className="text-base md:text-lg text-gray-600">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque
              sequi, illum maiores qui amet sint ratione possimus. Et porro
              recusandae odio error, ab mollitia cumque dolor maxime minima
              necessitatibus quod?
            </p>
          </section>

          {/* Cargando o productos */}
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
                <h2 className="text-2xl md:text-3xl font-semibold mb-6">
                  Galería de productos
                </h2>
                <ProductList />
              </section>
            )}
        </main>
      </div>
      <Footer />
    </>
  );
};

export default Home;
