import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/AuthForms.css'; // Importa el archivo CSS

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [tokenExpiration, setTokenExpiration] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const tokenExpirationTimer = setTimeout(() => {
      setError('¡Tu sesión ha expirado! Por favor, inicia sesión nuevamente.');
      localStorage.removeItem('jwtToken');
    }, tokenExpiration);

    return () => clearTimeout(tokenExpirationTimer);
  }, [tokenExpiration]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nombre_usuario: username, contrasena: password })
      });

      if (response.ok) {
        const { token, expiresIn } = await response.json();

        localStorage.setItem('jwtToken', token);
        setTokenExpiration(expiresIn * 1000); // Convertir a milisegundos
        navigate('/post');
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Credenciales incorrectas. Por favor, intenta de nuevo.');
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      setError('Error al iniciar sesión. Por favor, intenta de nuevo.');
    }
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">Nombre de usuario:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="password">Contraseña:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {tokenExpiration && <div className="timer">Tiempo restante de sesión: {Math.ceil(tokenExpiration / 1000)} segundos</div>}
      <div className="button-container">
        <button type="submit">Iniciar sesión</button>
        <button type="button" onClick={() => navigate('/register')}>Registrar</button>
      </div>
    </form>
  );
};

export default LoginForm;
