import React, { useState, useContext } from 'react';

import { CartContext } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Login = () => {

  const {email, setEmail,password, setPassword, handleSubmit ,errors} = useAuth()

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        maxWidth: '400px',
        margin: 'auto',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <label htmlFor="formBasicEmail" style={{ marginBottom: '0.5rem', fontWeight: 'bold' }}>
          Email address
        </label>
        <input
          id="formBasicEmail"
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            padding: '0.5rem',
            border: `1px solid ${errors.email ? 'red' : '#ced4da'}`,
            borderRadius: '0.25rem',
          }}
        />
        {errors.email && (
          <div style={{ color: 'red', fontSize: '0.875rem', marginTop: '0.25rem' }}>
            {errors.email}
          </div>
        )}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <label htmlFor="formBasicPassword" style={{ marginBottom: '0.5rem', fontWeight: 'bold' }}>
          Password
        </label>
        <input
          id="formBasicPassword"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            padding: '0.5rem',
            border: `1px solid ${errors.password ? 'red' : '#ced4da'}`,
            borderRadius: '0.25rem',
          }}
        />
        {errors.password && (
          <div style={{ color: 'red', fontSize: '0.875rem', marginTop: '0.25rem' }}>
            {errors.password}
          </div>
        )}
      </div>

      <button
        type="submit"
        style={{
          backgroundColor: '#007bff',
          color: 'white',
          padding: '0.75rem',
          border: 'none',
          borderRadius: '0.25rem',
          cursor: 'pointer',
          fontSize: '1rem',
        }}
      >
        Submit
      </button>
    </form>
  );
  // return (
  //   <div>
  //     <div class="login-container">
  //       <form onSubmit={handleSubmit} class="login-box" action="/login" method="POST">
  //         <h2 class="login-title">Iniciar sesión</h2>
  //         <input class="login-input" type="text" name="usuario" placeholder="Usuario" required />
  //         <input class="login-input" type="password" name="password" placeholder="Contraseña" required />
  //         <button class="login-button" type="submit">Entrar</button>
  //         <div class="login-footer">
  //           ¿Olvidaste tu contraseña? <a href="/recuperar">Recupérala aquí</a>
  //         </div>
  //       </form>
  //     </div>
  //   </div>
  // )
}

export default Login
