import React, {useState,useContext} from 'react'
import { Link, NavLink } from 'react-router-dom'
import "./styleEstatico.css";
import Cart from "../Cart";
import {FaShoppingCart}from 'react-icons/fa'

const Header = () => {
  const [isCartOpen, setCartOpen] = useState(false);

  return (
      <header>
      <nav className="navbar navbar-expand-lg  bg-dark" data-bs-theme="dark">
        <div className="container-fluid">
          <NavLink className="navbar-brand logo" to="/">Emi-Commercio</NavLink>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="link" to="/">Inicio</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="link" to="/acercade">Sobre nosotros</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="link" to="/productos">Galeria de productos</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="link" to="/contacto">Contacto</NavLink>
              </li>
              <li className="nav-item">
                <button className="btnCart link" onClick={() => setCartOpen(true)} style={{background: 'none', border: 'none'}}>
                <FaShoppingCart color='red'/>
                </button>
                <Cart isOpen={isCartOpen} onClose={() => setCartOpen(false)} />
              </li>
              <li className="nav-item">
                <NavLink className="link" to="/login">
                  <i className="fa-solid fa-right-to-bracket"></i>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="link" to="/admin">
                  <i className="fa-solid fa-user-tie"></i>
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
