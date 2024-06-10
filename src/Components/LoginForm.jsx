// src/components/LoginForm.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Aquí enviarías una solicitud al backend con los datos de inicio de sesión
      console.log('Username:', username);
      console.log('Password:', password);
      // Lógica para enviar la solicitud al backend y manejar la respuesta
    } catch (error) {
      setError('Error al iniciar sesión. Por favor, intenta de nuevo.');
    }
  };

  const handleRegister = () => {
    navigate('/register');
  };

  return (
    <form onSubmit={handleSubmit}>
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
      <button type="submit">Iniciar sesión</button>
      <button type="button" onClick={handleRegister}>Registrar</button>
    </form>
  );
};

export default LoginForm;
