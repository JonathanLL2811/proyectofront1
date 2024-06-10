// src/components/PostForm.jsx

import React, { useState } from 'react';

const PostForm = () => {
  const [descripcion, setDescripcion] = useState('');
  const [imagen, setImagen] = useState(null); // Nuevo estado para la imagen

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImagen(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const formData = new FormData();
      formData.append('descripcion', descripcion);
      formData.append('imagen', imagen);

      const response = await fetch('http://localhost:3000/publicaciones', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        // Publicación exitosa, redirigir a la página de publicaciones o mostrar un mensaje de éxito
      } else {
        // Manejar errores de publicación
        console.error('Error al crear la publicación:', response.statusText);
      }
    } catch (error) {
      console.error('Error al crear la publicación:', error);
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
        <label htmlFor="imagen">Imagen:</label>
        <input
          type="file"
          id="imagen"
          accept="image/*"
          onChange={handleImageChange}
          required
        />
      </div>
      <button type="submit">Publicar</button>
    </form>
  );
};

export default PostForm;
