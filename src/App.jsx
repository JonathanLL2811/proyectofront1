import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import LoginForm from './Components/LoginForm';
import RegistroForm from './Components/RegistroForm';
import PostForm from './Components/PostForm';
import Publicaciones from './Components/PublicacionesList';
import PerfilUsuario from './Components/PerfilUsuario';
import Amigos from './Components/amigos'; // Importa el componente de Amigos

const App = () => {
  const handleLogout = () => {
    localStorage.removeItem('jwtToken');
    console.log('Token eliminado');
    window.location.href = '/'; // Redirige a la página de inicio de sesión después de cerrar sesión
  };

  return (
    <Router>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <header style={{ backgroundColor: '#333', color: '#fff', padding: '10px', textAlign: 'center' }}>
          <h3>Red Social</h3>
          {localStorage.getItem('jwtToken') && (
            <button onClick={handleLogout}>Cerrar sesión</button>
          )}
        </header>

        <div style={{ flex: 1, marginTop: '20px', textAlign: 'center' }}>
          <Link to="/post"><button>Publicar algo</button></Link>
          <Link to="/publicaciones"><button>Publicaciones</button></Link>
          <Link to="/amigos"><button>Buscar Amigos</button></Link> {/* Agrega el enlace para la lista de amigos */}

          <Routes>
            <Route path="/" element={<LoginForm />} />
            <Route path="/register" element={<RegistroForm />} />
            <Route path="/post" element={<PostForm />} />
            <Route path="/publicaciones" element={<Publicaciones />} />
            <Route path="/perfil/:nombre_usuario" element={<PerfilUsuario />} />
            <Route path="/amigos" element={<Amigos />} /> {/* Agrega la ruta para la lista de amigos */}
          </Routes>
        </div>

        <footer style={{ backgroundColor: '#333', color: '#fff', padding: '10px', textAlign: 'center' }}>
          &copy; 2024 Jonathan Jesus Lorenzana Lemus
        </footer>
      </div>
    </Router>
  );
};

export default App;

