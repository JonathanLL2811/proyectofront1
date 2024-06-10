// RegistroForm.jsx

import React, { useState } from 'react';

const RegistroForm = () => {
  const [nombreUsuario, setNombreUsuario] = useState(''); // Cambiado a nombreUsuario
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [imagen, setImagen] = useState(null); // Nuevo estado para la imagen
  const [error, setError] = useState('');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImagen(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const formData = new FormData();
      formData.append('nombre_usuario', nombreUsuario); // Cambiado a nombreUsuario
      formData.append('nombre', nombre);
      formData.append('apellido', apellido);
      formData.append('correo', correo);
      formData.append('contrasena', contrasena);
      formData.append('imagen', imagen); // Agregar la imagen al FormData

      const response = await fetch('http://localhost:3000/usuarios', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        // Registro exitoso, redirigir al usuario a otra página o mostrar un mensaje de éxito
      } else {
        // Manejar errores de registro
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
        <label htmlFor="nombre_usuario">Nombre de usuario:</label>
        <input
          type="text"
          id="nombre_usuario"
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
        <label htmlFor="correo">Correo electrónico:</label>
        <input
          type="email"
          id="correo"
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
      <button type="submit">Registrar</button>
    </form>
  );
};

export default RegistroForm;
