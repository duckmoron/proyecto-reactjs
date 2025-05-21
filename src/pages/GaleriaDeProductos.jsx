import React from "react";
import Header from "../components/estaticos/Header";
import Footer from "../components/estaticos/Footer";
import ProductList from '../components/ProductList'
import loading from '../assets/loading.gif'

const GaleriaDeProductos = ({ cart, productos, cargando }) => {
  return (
    <>
      <Header cartItems={cart} />
      <h1>GaleriaDeProductos</h1>
      {cargando
        ? <img src={loading} alt="loading" />
        : <ProductList productos={productos} />}
      <Footer />
    </>
  );
};

export default GaleriaDeProductos;
