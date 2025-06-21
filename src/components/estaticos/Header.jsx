import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Cart from "../Cart";
import logo from '../../assets/logo.png';

// Subcomponente para los enlaces del menú
const MenuLinks = ({ isMobile = false, onLinkClick, iconClass, setCartOpen }) => {
  const baseClass = isMobile ? "space-y-3" : "space-x-6 items-center";
  const containerClass = isMobile ? "flex flex-col" : "flex";

  return (
    <div className={`${containerClass} ${baseClass}`}>
      <NavLink className="link transition" to="/" onClick={onLinkClick}>Inicio</NavLink>
      <NavLink className="link transition" to="/acercade" onClick={onLinkClick}>Sobre nosotros</NavLink>
      <NavLink className="link transition" to="/productos" onClick={onLinkClick}>Galería de productos</NavLink>
      <NavLink className="link transition" to="/contacto" onClick={onLinkClick}>Contacto</NavLink>

      <div onClick={() => { setCartOpen(true); onLinkClick?.(); }} className="transition cursor-pointer">
        <i className={`fa-solid fa-cart-shopping ${iconClass}`}></i>
      </div>

      <NavLink to="/login" className="transition" onClick={onLinkClick}>
        <i className={`fa-solid fa-right-to-bracket ${iconClass}`}></i>
      </NavLink>
      <NavLink to="/admin" className="transition" onClick={onLinkClick}>
        <i className={`fa-solid fa-user-tie ${iconClass}`}></i>
      </NavLink>
    </div>
  );
};

const Header = () => {
  const [isCartOpen, setCartOpen] = useState(false);
  const [isMenuOpen, setMenuOpen] = useState(false);

  const iconClass = "w-5 h-5 text-red-500 hover:text-red-600 transition duration-200 bg-transparent";

  return (
    <header>
      <nav className="bg-gray-900 text-white">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          {/* Logo */}
          <NavLink className="text-xl font-bold text-white" to="/">
            <img src={logo} alt="Duck-Commercio Logo" className="h-8 w-auto" />
          </NavLink>

          {/* Botón hamburguesa */}
          <div className="md:hidden">
            <div onClick={() => setMenuOpen(!isMenuOpen)} className="cursor-pointer transition-all duration-300">
              <i
                className={`
                  fa-solid ${isMenuOpen ? 'fa-xmark' : 'fa-bars'}
                  ${iconClass} transform transition-transform duration-300
                `}
              ></i>
            </div>
          </div>

          {/* Menú de escritorio */}
          <div className="hidden md:flex">
            <MenuLinks iconClass={iconClass} setCartOpen={setCartOpen} />
          </div>
        </div>

        {/* Menú móvil con animación */}
        <div
          className={`
            md:hidden px-4 pb-4 origin-top transition-all duration-300 ease-in-out
            transform ${isMenuOpen ? "scale-100 opacity-100 max-h-screen" : "scale-95 opacity-0 max-h-0 overflow-hidden"}
          `}
        >
          <MenuLinks
            isMobile
            iconClass={iconClass}
            setCartOpen={setCartOpen}
            onLinkClick={() => setMenuOpen(false)}
          />
        </div>
      </nav>

      {/* Cart */}
      <Cart isOpen={isCartOpen} onClose={() => setCartOpen(false)} />
    </header>
  );
};

export default Header;
