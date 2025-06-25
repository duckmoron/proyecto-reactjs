import React, { useContext, useMemo } from "react";
import Slider from "react-slick";
import { CartContext } from "../context/CartContext";
import Productos from "./Productos";

// Flecha izquierda (fuera del slider)
const PrevArrow = ({ onClick }) => (
  <i
    className="fas fa-chevron-left"
    onClick={onClick}
    style={{
      cursor: "pointer",
      position: "absolute",
      left: "-40px", // más afuera
      top: "50%",
      transform: "translateY(-50%)",
      fontSize: "24px",
      color: "#000",
      zIndex: 2,
    }}
  />
);

// Flecha derecha (fuera del slider)
const NextArrow = ({ onClick }) => (
  <i
    className="fas fa-chevron-right"
    onClick={onClick}
    style={{
      cursor: "pointer",
      position: "absolute",
      right: "-40px", // más afuera
      top: "50%",
      transform: "translateY(-50%)",
      fontSize: "24px",
      color: "#000",
      zIndex: 2,
    }}
  />
);

const HomeSlider = () => {
  const { productos } = useContext(CartContext);

  const ultimosProductos = useMemo(() => {
    const productosOrdenados = [...productos].sort(
      (a, b) => new Date(b.fechaCreacion) - new Date(a.fechaCreacion)
    );
    return productosOrdenados.slice(0, 6);
  }, [productos]);

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 640,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  return (
    <div className="max-w-6xl mx-auto px-16 py-2 relative"> {/* Aumenta padding horizontal */}
      <Slider {...settings}>
        {ultimosProductos.map((producto) => (
          <div key={producto.id} className="px-2">
            <Productos producto={producto} className="shadow-none" />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default HomeSlider;
