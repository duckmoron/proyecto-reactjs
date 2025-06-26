import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

function RutaProtegida({ isAuthenticated, requireCart = false, children }) {
    const { cart } = useContext(CartContext);
    const total = cart.reduce((acc, item) => acc + item.precio * item.cantidad, 0);

    // Si no está autenticado, redirige al login
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    // Si se requiere un carrito con productos y está vacío, redirige al inicio
    if (requireCart && (cart.length === 0 || total <= 0)) {
        return <Navigate to="/" replace />;
    }

    return children;
}

export default RutaProtegida;
