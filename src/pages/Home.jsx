import React, { useContext } from "react";
import { Helmet } from "react-helmet";
import Header from "../components/estaticos/Header";
import Footer from "../components/estaticos/Footer";
import loading from "../assets/loading.gif";
import HomeSlider from "../components/HomeSlider";
import { CartContext } from "../context/CartContext";
import heroImg from "../assets/hero.jpg"; // imagen de portada opcional

const Home = () => {
  const { cargando } = useContext(CartContext);

  return (
    <>
      <Helmet>
        <title>Inicio | Duck-Commercio</title>
        <meta
          name="description"
          content="Bienvenido a la página principal de nuestro sitio."
        />
      </Helmet>
      <Header />

      {/* Hero principal */}
      <section className="pt-20 bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
        <div className="container mx-auto flex flex-col md:flex-row items-center px-4 py-16">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Bienvenidos a{" "}
              <span className="text-yellow-300">Duck-Commercio</span>
            </h1>
            <p className="text-lg mb-6">
              Especialistas en{" "}
              <strong>
                gigantografías, pósters y stickers personalizados
              </strong>. Creatividad impresa para tus espacios, marcas y
              emociones.
            </p>
            <a
              href="#productos"
              className="inline-block bg-yellow-300 text-indigo-900 font-semibold px-6 py-3 rounded hover:bg-yellow-400 transition"
            >
              Ver productos
            </a>
          </div>
          <div className="md:w-1/2">
            <img
              src={heroImg}
              alt="Duck-Commercio banner"
              className="rounded-lg shadow-lg w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Contenido dinámico (productos o loader) */}
      <section
        id="productos"
        className="bg-gray-100 text-gray-800 px-4 md:px-8 lg:px-20 py-14"
      >
        {cargando
          ? (
            <div className="flex justify-center items-center h-64">
              <img src={loading} alt="Cargando..." className="w-20" />
            </div>
          )
          : (
            <>
              <h2 className="text-center">
                Últimos Productos
              </h2>
              <HomeSlider />
            </>
          )}
      </section>

      {/* Call-to-action extra o categoría */}
      <section className="px-4 md:px-8 lg:px-20 py-14">
        <div className="text-center">
          <h3 className="text-2xl md:text-3xl font-semibold mb-4">
            ¿Buscás algo personalizado?
          </h3>
          <p className="text-gray-600 mb-6">
            En Duck-Commercio podés encargar tu diseño exclusivo. ¡Nos encanta
            hacerlo realidad!
          </p>
          <a
            href="/contacto"
            className="inline-block bg-indigo-600 text-white font-semibold px-6 py-3 rounded hover:bg-indigo-700 transition"
          >
            Contactanos
          </a>
        </div>
      </section>
      {/* Testimonios */}
      <section className="bg-indigo-50 px-4 md:px-8 lg:px-20 py-14">
        <h2 className="text-center">
          Lo que dicen nuestros clientes
        </h2>
        <div className="grid gap-8 md:grid-cols-3 m-10">
          {/* Testimonio 1 */}
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <p className="text-gray-700 italic mb-4">
              “La calidad de las gigantografías superó mis expectativas. ¡Mi
              local ahora tiene una identidad visual increíble!”
            </p>
            <div className="flex justify-center mb-2">
              <img
                src="https://i.pravatar.cc/80?img=32"
                alt="Cliente 1"
                className="w-14 h-14 rounded-full border-2 border-indigo-600"
              />
            </div>
            <h4 className="font-semibold text-indigo-800">Lucía Fernández</h4>
            <span className="text-sm text-gray-500">Emprendedora</span>
          </div>

          {/* Testimonio 2 */}
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <p className="text-gray-700 italic mb-4">
              “Pedí stickers personalizados para mi marca y fueron un éxito.
              Excelente atención y entrega rápida.”
            </p>
            <div className="flex justify-center mb-2">
              <img
                src="https://i.pravatar.cc/80?img=12"
                alt="Cliente 2"
                className="w-14 h-14 rounded-full border-2 border-indigo-600"
              />
            </div>
            <h4 className="font-semibold text-indigo-800">Marcos López</h4>
            <span className="text-sm text-gray-500">Diseñador gráfico</span>
          </div>

          {/* Testimonio 3 */}
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <p className="text-gray-700 italic mb-4">
              “Excelente experiencia. Pósters con muy buena resolución y
              materiales. Volveré a comprar seguro.”
            </p>
            <div className="flex justify-center mb-2">
              <img
                src="https://i.pravatar.cc/80?img=5"
                alt="Cliente 3"
                className="w-14 h-14 rounded-full border-2 border-indigo-600"
              />
            </div>
            <h4 className="font-semibold text-indigo-800">Ana Torres</h4>
            <span className="text-sm text-gray-500">Fotógrafa</span>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Home;
