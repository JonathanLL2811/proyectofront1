import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PublicacionesList = () => {
  const [publicaciones, setPublicaciones] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPublicaciones = async () => {
      try {
        const response = await axios.get('http://localhost:3000/publicaciones');
        if (response.status === 200) {
          setPublicaciones(response.data);
        } else {
          console.error('Error al obtener las publicaciones:', response.statusText);
          setError('Error al obtener las publicaciones');
        }
      } catch (error) {
        console.error('Error al obtener las publicaciones:', error);
        setError('Error al obtener las publicaciones');
      }
    };

    fetchPublicaciones();
  }, []);

  return (
    <div className="container">
      <h2>Publicaciones</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div className="row">
        {publicaciones.map((publicacion) => (
          <div key={publicacion.id_publicacion} className="col-md-4 mb-4">
            <div className="card">
              <img
                src={`data:${publicacion.mime_type};base64,${publicacion.foto}`}
                alt={publicacion.nombre_foto}
                className="card-img-top"
                width={300}
                height={300}
              />
              <div className="card-body">
                <p className="card-text">{publicacion.descripcion}</p>
                <p className="card-text">Publicado por: {publicacion.nombre_usuario}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PublicacionesList;
