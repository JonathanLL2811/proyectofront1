import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../styles/PerfilUsuario.css';

const PerfilUsuario = () => {
  const { nombre_usuario } = useParams();
  const [publicaciones, setPublicaciones] = useState([]);
  const [usuario, setUsuario] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPerfilUsuario = async () => {
      try {
        const token = localStorage.getItem('jwtToken');
        const responseUsuario = await axios.get(`http://localhost:3000/publicaciones/usuario/${nombre_usuario}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        if (responseUsuario.status === 200) {
          setUsuario(responseUsuario.data.usuario);
          setPublicaciones(responseUsuario.data.publicaciones);
        } else {
          console.error('Error al obtener los datos del usuario:', responseUsuario.statusText);
          setError('Error al obtener los datos del usuario');
        }
      } catch (error) {
        console.error('Error al obtener los datos del usuario:', error);
        setError('Error al obtener los datos del usuario');
      }
    };

    fetchPerfilUsuario();
  }, [nombre_usuario]);

  return (
    <div className="profile-container">
      {usuario && (
        <>
          <h2>Perfil de: {nombre_usuario}</h2>
          <table>
            <tbody>
              <tr>
                <td>Usuario:</td>
                <td>{usuario.nombre_usuario}</td>
              </tr>
              <tr>
                <td>Nombre:</td>
                <td>{usuario.nombre}</td>
              </tr>
              <tr>
                <td>Apellido:</td>
                <td>{usuario.apellido}</td>
              </tr>
              <tr>
                <td>Correo:</td>
                <td>{usuario.correo}</td>
              </tr>
              <tr>
                <td>Fecha de creación:</td>
                <td>{new Date(usuario.fecha_creacion).toLocaleDateString()}</td>
              </tr>
              <tr>
                <td>Activo:</td>
                <td>{usuario.activo ? 'Sí' : 'No'}</td>
              </tr>
            </tbody>
          </table>
          {usuario.imagen && (
            <div>
              <img src={`data:${usuario.mime_type};base64,${usuario.imagen}`} alt="Foto de perfil" className="profile-image" />
            </div>
          )}
        </>
      )}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <h2>Publicaciones</h2>
      <div className="publications-container">
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
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PerfilUsuario;
