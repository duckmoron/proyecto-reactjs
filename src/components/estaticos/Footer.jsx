import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../assets/logo.png';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">

        {/* Logo o nombre */}
        <NavLink className="text-xl font-bold text-white" to="/">
          <img src={logo} alt="Duck-Commercio Logo" className="h-8 w-auto" />
        </NavLink>

        {/* Navegación */}
        <div className="flex space-x-6">
          <NavLink to="/" className="link transition">Inicio</NavLink>
          <NavLink to="/productos" className="link transition">Productos</NavLink>
          <NavLink to="/acercade" className="link transition">Nosotros</NavLink>
          <NavLink to="/contacto" className="link transition">Contacto</NavLink>
        </div>

        {/* Redes sociales */}
        <div className="flex space-x-4 text-red-500 text-lg">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="link transition">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="link transition">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="link transition">
            <i className="fab fa-x-twitter"></i>
          </a>
        </div>
            {/* Línea separadora y copyright */}
      <div className="mt-6 border-t border-gray-700 pt-4 text-center text-sm text-gray-400">
        &copy; {new Date().getFullYear()} Duck-Commercio. Todos los derechos reservados.
      </div>
      </div>


    </footer>
  );
};

export default Footer;
