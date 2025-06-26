import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [role, setRole] = useState(null);

  const navigate = useNavigate();

  // Verificar estado inicial de login
  useEffect(() => {
    const isAuth = localStorage.getItem('isAuth') === 'true';
    const storedRole = localStorage.getItem('role');

    if (isAuth) {
      setIsAuthenticated(true);
      setRole(storedRole || null);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let validationErrors = {};
    if (!email) validationErrors.email = 'Email es requerido';
    if (!password) validationErrors.password = 'Password es requerido';

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const res = await fetch('data/users.json');
      const users = await res.json();

      const foundUser = users.find(
        (user) => user.email === email && user.password === password
      );

      if (!foundUser) {
        setErrors({ email: 'Credenciales inválidas' });
      } else {
        setIsAuthenticated(true);
        setRole(foundUser.role);
        localStorage.setItem('isAuth', 'true');
        localStorage.setItem('role', foundUser.role);

        // Redirigir según el rol
        if (foundUser.role === 'admin') {
          navigate('/admin');
        } else {
          navigate('/');
        }
      }
    } catch (err) {
      console.error('Error fetching users:', err);
      setErrors({ email: 'Algo salió mal. Por favor, intenta más tarde.' });
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setRole(null);
    localStorage.removeItem('isAuth');
    localStorage.removeItem('role');
    navigate('/');
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        role,
        email,
        setEmail,
        password,
        setPassword,
        handleSubmit,
        errors,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
