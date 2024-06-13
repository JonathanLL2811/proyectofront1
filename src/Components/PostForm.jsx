import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/PostForm.css';

const PostForm = () => {
  const [descripcion, setDescripcion] = useState('');

  const [foto, setFoto] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

// Recoge el nombre de usuario del localStorage
const nombreUsuario = localStorage.getItem('username');

const handleSubmit = async (e) => {
  e.preventDefault();

    const formData = new FormData();
    formData.append('descripcion', descripcion);
    formData.append('nombre_usuario', nombreUsuario);
    formData.append('foto', foto);

    try {
      const token = localStorage.getItem('jwtToken');
      const response = await fetch('http://localhost:3000/publicaciones', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: formData,
      });

      if (response.ok) {
        navigate('/publicaciones');
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Error al crear la publicación. Por favor, intenta de nuevo.');
      }
    } catch (error) {
      console.error('Error al crear la publicación:', error);
      setError('Error al crear la publicación. Por favor, intenta de nuevo.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="descripcion">Descripción:</label>
        <input
          type="text"
          id="descripcion"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          required
        />
      </div>
      <div>
      <label htmlFor="nombreUsuario">Nombre de usuario:</label>
        {/* Llena automáticamente el campo con el nombre de usuario */}
        <input
          type="text"
          id="nombreUsuario"
          value={nombreUsuario}
          readOnly // Hacer el campo de solo lectura porque ya lo llena automaticamente
          required
        />
      </div>
      <div>
        <label htmlFor="foto">Foto:</label>
        <input
          type="file"
          id="foto"
          onChange={(e) => setFoto(e.target.files[0])}
        />
      </div>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <button type="submit">Crear Publicación</button>
    </form>
  );
};

export default PostForm;
