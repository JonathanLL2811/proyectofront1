import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import LoginForm from './Components/LoginForm';
import RegistroForm from './Components/RegistroForm';
import PostForm from './Components/PostForm'; // Importa el componente PostForm
import Publicaciones from './Components/PublicacionesList'; // Importa el componente Publicaciones
import PerfilUsuario from './Components/PerfilUsuario'; // Importa el componente PerfilUsuario

const App = () => {
  return (
    <Router>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        {/* Encabezado */}
        <header style={{ backgroundColor: '#333', color: '#fff', padding: '10px', textAlign: 'center' }}>
          <h3>Red Social </h3>
        </header>

        {/* Contenido principal */}
        <div style={{ flex: 1, marginTop: '20px', textAlign: 'center' }}>

          
          {/* Botones de navegación */}
          <Link to="/">
            <button>Salir</button>
          </Link>
          <Link to="/publicaciones">
            <button>Publicaciones</button>
          </Link>
          <Link to="/post">
            <button>Publicar algo</button>
          </Link>

          {/* Rutas */}
          <Routes>
            <Route path="/" element={<LoginForm />} />
            <Route path="/register" element={<RegistroForm />} />
            <Route path="/post" element={<PostForm />} /> {/* Ruta para el componente PostForm */}
            <Route path="/publicaciones" element={<Publicaciones />} /> {/* Ruta para el componente Publicaciones */}
            <Route path="/perfil/:nombre_usuario" element={<PerfilUsuario />} /> {/* Ruta para el componente PerfilUsuario */}
          </Routes>
        </div>

        {/* Pie de página */}
        <footer style={{ backgroundColor: '#333', color: '#fff', padding: '10px', textAlign: 'center' }}>
          &copy; 2024 Jonathan Jesus Lorenzana Lemus
        </footer>
      </div>
    </Router>
  );
};

export default App;
