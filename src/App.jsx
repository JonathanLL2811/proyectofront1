import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from './Components/LoginForm';
import RegistroForm from './Components/RegistroForm';
import PostForm from './Components/PostForm'; // Importa el componente PostForm
import Publicaciones from './Components/PublicacionesList'; // Importa el componente Publicaciones
import PerfilUsuario from './Components/PerfilUsuario'; // Importa el componente PerfilUsuario

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/register" element={<RegistroForm />} />
        <Route path="/post" element={<PostForm />} /> {/* Ruta para el componente PostForm */}
        <Route path="/publicaciones" element={<Publicaciones />} /> {/* Ruta para el componente Publicaciones */}
        <Route path="/perfil/:nombre_usuario" element={<PerfilUsuario />} /> {/* Ruta para el componente PerfilUsuario */}
      </Routes>
    </Router>
  );
};

export default App;
