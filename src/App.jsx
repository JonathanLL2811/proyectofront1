import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import LoginForm from './Components/LoginForm';
import RegistroForm from './Components/RegistroForm';
import PostForm from './Components/PostForm';
import Publicaciones from './Components/PublicacionesList';
import PerfilUsuario from './Components/PerfilUsuario';
import Amigos from './Components/amigos';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [tokenExpiration, setTokenExpiration] = useState(null);
  const [username, setUsername] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    const expiration = localStorage.getItem('tokenExpiration');
    const storedUsername = localStorage.getItem('username');

    if (token && expiration && storedUsername) {
      const now = new Date().getTime();
      if (now < expiration) {
        setIsLoggedIn(true);
        setTokenExpiration(expiration - now);
        setUsername(storedUsername);
      } else {
        localStorage.removeItem('jwtToken');
        localStorage.removeItem('tokenExpiration');
        localStorage.removeItem('username');
        setIsLoggedIn(false);
      }
    }
  }, []);

  useEffect(() => {
    if (tokenExpiration) {
      const timer = setTimeout(() => {
        localStorage.removeItem('jwtToken');
        localStorage.removeItem('tokenExpiration');
        localStorage.removeItem('username');
        setIsLoggedIn(false);
        alert('¡Tu sesión ha expirado! Por favor, inicia sesión nuevamente.');
      }, tokenExpiration);

      return () => clearTimeout(timer);
    }
  }, [tokenExpiration]);

  const handleLogin = () => {
    setIsLoggedIn(true);
    setUsername(localStorage.getItem('username'));
  };

  const handleLogout = () => {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('tokenExpiration');
    localStorage.removeItem('username');
    setIsLoggedIn(false);
    console.log('Token eliminado');
    window.location.href = '/'; // me lleva a la página de inicio de sesión después de cerrar sesión
  };

  return (
    <Router>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <header style={{ backgroundColor: '#333', color: '#fff', padding: '10px', textAlign: 'center' }}>
          <h3>Red Social</h3>
          {isLoggedIn && (
            <button onClick={handleLogout}>Cerrar sesión</button>
          )}
        </header>

        <div style={{ flex: 1, marginTop: '20px', textAlign: 'center' }}>
          {isLoggedIn && (
            <>
              <Link to="/post"><button>Publicar algo</button></Link>
              <Link to="/publicaciones"><button>Publicaciones</button></Link>
              {username && <Link to={`/perfil/${username}`}><button>Mi Perfil</button></Link>} {}
              <Link to="/amigos"><button>Buscar Amigos</button></Link> {}
            </>
          )}

          <Routes>
            <Route path="/" element={<LoginForm onLogin={handleLogin} />} />
            <Route path="/register" element={<RegistroForm />} />
            <Route path="/post" element={isLoggedIn ? <PostForm /> : <Navigate to="/" />} />
            <Route path="/publicaciones" element={isLoggedIn ? <Publicaciones /> : <Navigate to="/" />} />
            <Route path="/perfil/:nombre_usuario" element={isLoggedIn ? <PerfilUsuario /> : <Navigate to="/" />} />
            <Route path="/amigos" element={isLoggedIn ? <Amigos /> : <Navigate to="/" />} /> {}
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
