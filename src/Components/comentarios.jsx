import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Comentarios.css'; // Importa tu archivo CSS

const Comentarios = ({ idPublicacion }) => {
  const [comentarios, setComentarios] = useState([]);
  const [comentario, setComentario] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchComentarios = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/publicaciones/${idPublicacion}/comentarios`);
        setComentarios(response.data);
      } catch (error) {
        console.error('Error al obtener comentarios:', error);
        setError('Error al obtener comentarios');
      }
    };

    fetchComentarios();
  }, [idPublicacion]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('jwtToken');
      const nombre_usuario = localStorage.getItem('username');
      const response = await axios.post(`http://localhost:3000/publicaciones/${idPublicacion}/comentarios`, {
        nombre_usuario,
        comentario
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setComentarios([...comentarios, response.data]);
      setComentario('');
    } catch (error) {
      console.error('Error al enviar comentario:', error);
      setError('Error al enviar comentario');
    }
  };

  return (
    <div className="comentarios-container">
      <h3>Comentarios</h3>
      {error && <p className="error-message">{error}</p>}
      {comentarios.map((coment) => (
        <div key={coment.id_comentario} className="comentario-item">
          <p><strong>{coment.nombre_usuario}</strong>: {coment.comentario}</p>
        </div>
      ))}
      <form className="comentario-form" onSubmit={handleCommentSubmit}>
        <textarea
          className="comentario-input"
          value={comentario}
          onChange={(e) => setComentario(e.target.value)}
          placeholder="Escribe tu comentario..."
          required
        />
        <button className="comentario-submit" type="submit">Enviar Comentario</button>
      </form>
    </div>
  );
};

export default Comentarios;

