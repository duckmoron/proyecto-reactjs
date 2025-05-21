import React from "react";
import './styleProductos.css'

const Productos = ({producto}) => {
    return (
        <section className="card">
            <div className="imganContainer">
                <img src={producto.imagen} alt="" className="imagen"/>
            </div>

            <h3 className="nombre">{producto.nombre}</h3>
            <p className="precio">${producto.precio}</p>
            <p className="stock">{producto.stock}</p>

            <div className="cantidadContainer">
                <button className="qtyButton">-</button>
                <span></span>
                <button className="qtyButton">+</button>
            </div>

            <button>Agregar al carrito</button>

        </section>
    );
};

export default Productos;
