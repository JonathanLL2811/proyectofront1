import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/AuthForms.css'; // Importa el archivo CSS

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('http://localhost:3000/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nombre_usuario: username, contrasena: password }) // Ajustar los nombres de los campos
      });

      if (response.ok) {
        // Si la respuesta es exitosa, redirigir a la página de publicaciones
        navigate('/post');
      } else {
        // Si la respuesta es un error, mostrar un mensaje de error
        const errorData = await response.json();
        setError(errorData.error || 'Credenciales incorrectas. Por favor, intenta de nuevo.');
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      setError('Error al iniciar sesión. Por favor, intenta de nuevo.');
    }
  };

  const handleRegister = () => {
    navigate('/register');
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
      <div className="button-container">
        <button type="submit">Iniciar sesión</button>
        <button type="button" onClick={handleRegister}>Registrar</button>
      </div>
    </form>
  );
};

export default LoginForm;
