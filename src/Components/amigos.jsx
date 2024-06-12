import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/amigos.css'; // Importa el archivo CSS para estilos personalizados

const Amigos = () => {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    // Realizar la solicitud al backend para obtener la lista de usuarios
    const obtenerUsuarios = async () => {
      try {
        const response = await fetch('http://localhost:3000/usuarios');
        if (response.ok) {
          const data = await response.json();
          setUsuarios(data);
        } else {
          console.error('Error al obtener usuarios:', response.statusText);
        }
      } catch (error) {
        console.error('Error al obtener usuarios:', error);
      }
    };

    obtenerUsuarios();
  }, []);

  return (
    <div className="table-container">
      <h2>Personas que quizás conozcas</h2>
      <table>
        <thead>
          <tr>
            <th>Usuario</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Correo electrónico</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map(usuario => (
            <tr key={usuario.nombre_usuario}>
              <td><Link to={`/perfil/${usuario.nombre_usuario}`} className="user-link">{usuario.nombre_usuario}</Link></td>
              <td>{usuario.nombre}</td>
              <td>{usuario.apellido}</td>
              <td>{usuario.correo}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Amigos;
