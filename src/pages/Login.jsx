import React, { useState, useContext } from "react";
import { CartContext } from '../context/CartContext'
import { useNavigate } from "react-router-dom";

const Login = () => {

  const { setIsAuth } = useContext( CartContext )

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState({})
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    let validationError = {}
    if(!email) validationError.email = 'El email es requerido'
    if(!password) validationError.password = 'La contraseña es requerido'

    if(Object.keys(validationError).length > 0){
      setError(validationError)
    }
    return
  }


  return (
    <div>
      <div class="login-container">
        <form class="login-box" action="/login" method="POST">
          <h2 class="login-title">Iniciar sesión</h2>
          <input class="login-input" type="text" name="usuario" placeholder="Usuario" required />
          <input class="login-input" type="password" name="password" placeholder="Contraseña" required />
          <button class="login-button" type="submit">Entrar</button>
          <div class="login-footer">
            ¿Olvidaste tu contraseña? <a href="/recuperar">Recupérala aquí</a>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
