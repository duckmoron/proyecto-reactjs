import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div class="error-404-container">
      <h1 class="error-404-title">404</h1>
      <h2 class="error-404-subtitle">¡Oops! Página no encontrada</h2>
      <p class="error-404-text">La página que estás buscando no existe o fue movida.</p>
      <button>
        <Link to='/'>Volver al inicio</Link>
      </button>
    </div>
  )
}

export default NotFound
