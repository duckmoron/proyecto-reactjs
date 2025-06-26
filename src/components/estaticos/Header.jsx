import React, { useState, useEffect, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import Cart from "../Cart";
import logo from '../../assets/logo.png';

import { CartContext } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

// Enlaces del menú
const MenuLinks = ({ isMobile = false, onLinkClick }) => {
  const baseClass = isMobile ? "space-y-3" : "space-x-6 items-center";
  const containerClass = isMobile ? "flex flex-col" : "flex";

  return (
    <div className={`${containerClass} ${baseClass}`}>
      <NavLink className="link transition" to="/" onClick={onLinkClick}>Inicio</NavLink>
      <NavLink className="link transition" to="/productos" onClick={onLinkClick}>Productos</NavLink>
      <NavLink className="link transition" to="/acercade" onClick={onLinkClick}>Nosotros</NavLink>
      <NavLink className="link transition" to="/contacto" onClick={onLinkClick}>Contacto</NavLink>
    </div>
  );
};

// Íconos (carrito, login/logout, admin)
const HeaderIcons = ({ iconClass, setCartOpen }) => {
  const { cart } = useContext(CartContext);
  const { isAuthenticated, logout } = useAuth();
  const [animate, setAnimate] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (cart.length === 0) return;
    setAnimate(true);
    const timeout = setTimeout(() => setAnimate(false), 300);
    return () => clearTimeout(timeout);
  }, [cart.length]);

  return (
    <div className="flex items-center space-x-2.5">
      {/* Login / Logout */}
      <div>
        {!isAuthenticated ? (
          <button
            onClick={() => navigate("/login")}
            className="transition flex items-center justify-center bg-transparent border-none p-0"
            title="Login"
          >
            <i className={`fa-solid fa-right-to-bracket ${iconClass}`}></i>
          </button>
        ) : (
          <button
            onClick={logout}
            className="transition flex items-center justify-center bg-transparent border-none p-0"
            title="Logout"
          >
            <i className={`fa-solid fa-right-from-bracket ${iconClass}`}></i>
          </button>
        )}
      </div>

      {/* Admin */}
      <div>
        <button
          onClick={() => navigate("/admin")}
          className="transition flex items-center justify-center bg-transparent border-none p-0"
          title="Admin"
        >
          <i className={`fa-solid fa-user-tie ${iconClass}`}></i>
        </button>
      </div>

      {/* Carrito */}
      <div
        onClick={() => setCartOpen(true)}
        className="relative transition cursor-pointer"
        title="Carrito"
      >
        {cart.length > 0 && (
          <span
            className={`absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center transition-transform duration-300 ${
              animate ? "scale-125" : "scale-100"
            }`}
          >
            {cart.length}
          </span>
        )}
        <i className={`fa-solid fa-cart-shopping ${iconClass}`}></i>
      </div>
    </div>
  );
};


const Header = () => {
  const [isCartOpen, setCartOpen] = useState(false);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const iconClass = "w-5 h-5 text-white-500 hover:text-red-600 transition duration-200 bg-transparent";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 w-full z-50">
      <nav className={`bg-gray-900 text-white transition-shadow duration-300 ${scrolled ? 'shadow-md' : ''}`}>
        {/* Wrapper principal con altura fija */}
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          {/* Logo + hamburguesa (solo visible en mobile) */}
          <div className="flex items-center space-x-4">
            <NavLink to="/" className="text-xl font-bold text-white">
              <img src={logo} alt="Duck-Commercio Logo" className="h-8 w-auto" />
            </NavLink>

            {/* Botón hamburguesa */}
            <button
              onClick={() => setMenuOpen(!isMenuOpen)}
              className="md:hidden focus:outline-none"
            >
              <i className={`fa-solid ${isMenuOpen ? 'fa-xmark' : 'fa-bars'} ${iconClass}`}></i>
            </button>
          </div>

          {/* Íconos siempre visibles (tanto mobile como desktop) */}
          <div className="flex items-center space-x-6">
            {/* Desktop: menú y luego íconos */}
            <div className="hidden md:flex space-x-6 items-center">
              <MenuLinks />
              <HeaderIcons iconClass={iconClass} setCartOpen={setCartOpen} />
            </div>

            {/* Mobile: solo íconos */}
            <div className="md:hidden">
              <HeaderIcons iconClass={iconClass} setCartOpen={setCartOpen} />
            </div>
          </div>
        </div>

        {/* Menú desplegable solo en mobile */}
        <div
          className={`
            md:hidden px-4 pb-4 origin-top transition-all duration-300 ease-in-out
            transform ${isMenuOpen ? "scale-100 opacity-100 max-h-screen" : "scale-95 opacity-0 max-h-0 overflow-hidden"}
          `}
        >
          <MenuLinks isMobile onLinkClick={() => setMenuOpen(false)} />
        </div>
      </nav>

      {/* Modal del carrito */}
      <Cart isOpen={isCartOpen} onClose={() => setCartOpen(false)} />
    </header>
  );
};

export default Header;
