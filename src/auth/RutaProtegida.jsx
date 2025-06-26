import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

function RutaProtegida({ isAuthenticated, requireCart = false, requireRole = null, children }) {
    const { cart } = useContext(CartContext);
    const { role } = useAuth();
    const total = cart.reduce((acc, item) => acc + item.precio * item.cantidad, 0);

    // No autenticado: redirige al login
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    // Si requiere carrito con productos
    if (requireCart && (cart.length === 0 || total <= 0)) {
        return <Navigate to="/" replace />;
    }

    // Si requiere un rol específico y no coincide
    if (requireRole && role !== requireRole) {
        return <Navigate to="/" replace />;
    }

    return children;
}

export default RutaProtegida;
