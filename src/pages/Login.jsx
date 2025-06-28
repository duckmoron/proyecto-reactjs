import React, { } from "react";
import { useAuth } from "../context/AuthContext";
import logo from "../assets/logo.png";
import { Helmet } from "react-helmet";

const Login = () => {
  const { email, setEmail, password, setPassword, handleSubmit, errors } =
    useAuth();

  return (
    <>
      <Helmet>
        <title>Login | Duck-Commercio</title>
        <meta
          name="description"
          content="Página de login de nuestro sitio."
        />
      </Helmet>
      <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-lg shadow-md w-full max-w-md space-y-6"
        >
          {/* Logo centrado */}
          <div className="flex justify-center">
            <img src={logo} alt="Logo" className="h-16 w-auto" />
          </div>

          <h2 className="text-center mb-4">Iniciar sesión</h2>

          {/* Email */}
          <div className="flex flex-col">
            <label
              htmlFor="formBasicEmail"
              className="mb-1 font-medium text-gray-700"
            >
              Dirección de correo
            </label>
            <input
              id="formBasicEmail"
              type="email"
              placeholder="ejemplo@correo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div className="flex flex-col">
            <label
              htmlFor="formBasicPassword"
              className="mb-1 font-medium text-gray-700"
            >
              Contraseña
            </label>
            <input
              id="formBasicPassword"
              type="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.password ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          {/* Botón */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 !rounded-md hover:bg-blue-700 transition"
          >
            Iniciar sesión
          </button>
        </form>
      </div>
    </>
  );
};

export default Login;
