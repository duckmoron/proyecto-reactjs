import React, {useState, useContext } from "react";
import './styleProductos.css'
import { Link } from "react-router-dom";

import { CartContext } from '../context/CartContext'

const Productos = ({producto}) => {

    const { handleAddToCart } = useContext(CartContext)

    const [cantidad, setCantidad] = useState(1);

    const increase = () => setCantidad(prev => (prev < producto.stock ? prev + 1 : prev));
    const decrease = () => setCantidad(prev => (prev > 1 ? prev - 1 : 1));

    return (
        <section className="card">
            <div className="imganContainer">
                <img src={producto.imagen} alt="" className="imagen"/>
            </div>

            <h3 className="nombre">{producto.nombre}</h3>
            <p className="precio">${producto.precio}</p>
            <p className="stock">{producto.stock}</p>

            <div className="cantidadContainer">
                <button className="qtyButton" onClick={decrease}>-</button>
                <span>{cantidad}</span>
                <button className="qtyButton" onClick={increase}>+</button>
            </div>

            <button style={{display: cantidad == 0 ? 'none' : 'block'}} onClick={()=> handleAddToCart({...producto, cantidad:cantidad})}>Agregar al carrito</button>

            <Link to={`/productos/${producto.id}`}> Ver más </Link>

        </section>
    );
};

export default Productos;
