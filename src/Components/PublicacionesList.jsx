// src/components/PublicacionesList.jsx

import React, { useEffect, useState } from 'react';

const PublicacionesList = () => {
  const [publicaciones, setPublicaciones] = useState([]);

  useEffect(() => {
    const fetchPublicaciones = async () => {
      try {
        const response = await fetch('http://localhost:3000/publicaciones');
        if (response.ok) {
          const data = await response.json();
          setPublicaciones(data);
        } else {
          console.error('Error al obtener las publicaciones:', response.statusText);
        }
      } catch (error) {
        console.error('Error al obtener las publicaciones:', error);
      }
    };

    fetchPublicaciones();
  }, []);

  return (
    <div>
      <h2>Publicaciones</h2>
      <ul>
        {publicaciones.map((publicacion) => (
          <li key={publicacion.id_publicacion}>
            <img src={`data:${publicacion.mime_type};base64,${publicacion.foto}`} alt={publicacion.nombre_foto} />
            <p>{publicacion.descripcion}</p>
            <p>Publicado por: {publicacion.nombre_usuario}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PublicacionesList;
