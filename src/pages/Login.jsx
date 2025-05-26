import React from 'react'

const Login = () => {
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
