import React, {useState,useContext} from 'react'
import { Link, NavLink } from 'react-router-dom'
import "./styleEstatico.css";
import Cart from "../Cart";

import { CartContext } from '../../context/CartContext'

const Header = () => {
  const [isCartOpen, setCartOpen] = useState(false);

  return (
    <header>
      <nav className="navHeader">
        <ul className="navLinks">
          <li><NavLink to='/' className='link'>Inicio</NavLink></li>
          <li><NavLink to='/acercade' className='link'>Sobre Nosotros</NavLink></li>
          <li><NavLink to='/productos' className='link'>Galería de Productos</NavLink></li>
          <li><NavLink to='/contacto' className='link'>Contacto</NavLink></li>
        </ul>
        <ul className="navIcons">
          <li className='cartnav'>
            <button className='btnCart' onClick={() => setCartOpen(true)}>
              <i className="fa-solid fa-cart-shopping"></i>
            </button>
            <Cart isOpen={isCartOpen} onClose={() => setCartOpen(false)} />
          </li>
          <li className='btnLogin'>
            <NavLink to='/login' className='link'>
              <i className="fa-solid fa-right-to-bracket"></i>
            </NavLink>
          </li>
          <li className='btnAdmin'>
            <NavLink to='/admin' className='link'>
              <i className="fa-solid fa-user-tie"></i>
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>

  );
};

export default Header;
