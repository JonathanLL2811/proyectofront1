// src/App.jsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from './Components/LoginForm';
import RegistroForm from './Components/RegistroForm';
import PostForm from './Components/PostForm'; // Importa el componente PostForm
import Publicaciones from './Components/PublicacionesList'; // Importa el componente Publicaciones

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/register" element={<RegistroForm />} />
        <Route path="/post" element={<PostForm />} /> {/* Agrega la ruta para el componente PostForm */}
        <Route path="/Publicaciones" element={<Publicaciones />} /> {/* Agrega la ruta para el componente Publicaciones */}
      </Routes>
    </Router>
  );
};

export default App;
