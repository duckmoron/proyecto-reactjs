import React from 'react'
import { Link } from 'react-router-dom'
import './styleEstatico.css'

const Header = () => {
  return (
    <header>
      <nav>
        <ul>
            <li><Link to='/' className='link'>Inicio</Link></li>
            <li><Link to='/acercade' className='link'>Sobre Nosotros</Link></li>
            <li><Link to='/productos' className='link'>Galeria de Productos</Link></li>
            <li><Link to='/contacto' className='link'>Contacto</Link></li>
        </ul>
      </nav>
    </header>
  )
}

export default Header
