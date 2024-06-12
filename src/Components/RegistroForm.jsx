import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/RegistroForm.css';

const RegistroForm = () => {
  const [nombreUsuario, setNombreUsuario] = useState('');
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [imagen, setImagen] = useState(null);
  const [error, setError] = useState('');
  const [registroExitoso, setRegistroExitoso] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImagen(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const formData = new FormData();
      formData.append('nombre_usuario', nombreUsuario);
      formData.append('nombre', nombre);
      formData.append('apellido', apellido);
      formData.append('correo', correo);
      formData.append('contrasena', contrasena);
      formData.append('imagen', imagen);

      const response = await fetch('http://localhost:3000/usuarios', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setRegistroExitoso(true);
        setError('');
      } else {
        const data = await response.json();
        setError(data.error);
      }
    } catch (error) {
      setError('Error al procesar la solicitud');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="nombre-usuario">Nombre de usuario:</label>
        <input
          type="text"
          id="nombre-usuario"
          value={nombreUsuario}
          onChange={(e) => setNombreUsuario(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="nombre">Nombre:</label>
        <input
          type="text"
          id="nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="apellido">Apellido:</label>
        <input
          type="text"
          id="apellido"
          value={apellido}
          onChange={(e) => setApellido(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="correo-electronico">Correo electrónico:</label>
        <input
          type="email"
          id="correo-electronico"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="contrasena">Contraseña:</label>
        <input
          type="password"
          id="contrasena"
          value={contrasena}
          onChange={(e) => setContrasena(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="imagen">Imagen:</label>
        <input
          type="file"
          id="imagen"
          accept="image/*"
          onChange={handleImageChange}
          required
        />
      </div>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {registroExitoso && <div style={{ color: 'green' }}>¡Registro exitoso! Por favor <Link to="/">inicia sesión</Link>.</div>}
      <button type="submit">Registrar</button>
    </form>
  );
};

export default RegistroForm;
