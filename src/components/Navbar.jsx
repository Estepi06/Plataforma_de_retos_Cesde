import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const Navbar = () => {
  const { usuario, logout, estaAutenticado } = useAuth();
  const navigate = useNavigate();

  const handleCerrarSesion = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="navbar">
      <div className="navbar-container">
        {/* Logo limpio sin barras raras */}
        <Link to={estaAutenticado ? "/dashboard" : "/login"} className="navbar-logo">
          <span className="cesde-logo-brand">CESDE</span>
          <span className="logo-separator">|</span>
          <span className="logo-subtext">Plataforma de Retos</span>
        </Link>

        {/* Sección de Usuario / Acciones */}
        <div className="navbar-actions">
          {estaAutenticado ? (
            <div className="navbar-user-info">
              <span className={`rol-tag ${usuario.rol === 'EMPRESA' ? 'rol-empresa' : 'rol-estudiante'}`}>
                {usuario.rol === 'EMPRESA' ? '🏢 Empresa' : '🎓 Estudiante'}
              </span>
              <span className="navbar-user-name">{usuario.nombre}</span>
              <button onClick={handleCerrarSesion} className="btn-logout" title="Cerrar sesión">
                Cerrar Sesión
              </button>
            </div>
          ) : (
            <div className="navbar-auth-links">
              <Link to="/login" className="btn-nav-link">Iniciar Sesión</Link>
              <Link to="/registro" className="btn-nav-primary">Inscríbete</Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
