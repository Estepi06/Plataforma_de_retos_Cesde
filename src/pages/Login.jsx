import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const Login = () => {
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [rol, setRol] = useState('EMPRESA'); // Por defecto 'EMPRESA'
  const [error, setError] = useState('');

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!correo.trim() || !contrasena.trim()) {
      setError('Por favor completa todos los campos.');
      return;
    }

    // Iniciamos sesión en el contexto
    login(correo, contrasena, rol);

    // Redirigir al dashboard
    navigate('/dashboard');
  };

  // Botón para pruebas rápidas en clase
  const handleAccesoRapido = (rolSeleccionado) => {
    const emailDemo = rolSeleccionado === 'EMPRESA' 
      ? 'empresa@cesde.edu.co' 
      : 'estudiante@cesde.edu.co';
    
    login(emailDemo, '123456', rolSeleccionado);
    navigate('/dashboard');
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h2>Iniciar Sesión</h2>
          <p>Plataforma de Retos e Innovación Abierta</p>
        </div>

        {error && <div className="alert-error">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="correo">Correo Electrónico</label>
            <input
              id="correo"
              type="email"
              placeholder="ejemplo@cesde.edu.co"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="contrasena">Contraseña</label>
            <input
              id="contrasena"
              type="password"
              placeholder="••••••••"
              value={contrasena}
              onChange={(e) => setContrasena(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Tipo de Usuario (Rol)</label>
            <div className="role-selector">
              <label className={`role-option ${rol === 'EMPRESA' ? 'active' : ''}`}>
                <input
                  type="radio"
                  name="rol"
                  value="EMPRESA"
                  checked={rol === 'EMPRESA'}
                  onChange={() => setRol('EMPRESA')}
                />
                <span>🏢 Empresa</span>
              </label>

              <label className={`role-option ${rol === 'ESTUDIANTE' ? 'active' : ''}`}>
                <input
                  type="radio"
                  name="rol"
                  value="ESTUDIANTE"
                  checked={rol === 'ESTUDIANTE'}
                  onChange={() => setRol('ESTUDIANTE')}
                />
                <span>🎓 Estudiante</span>
              </label>
            </div>
          </div>

          <button type="submit" className="btn-primary">
            Ingresar al Dashboard
          </button>
        </form>

        {/* Acceso Rápido para Demostraciones del docente */}
        <div className="demo-box">
          <p className="demo-title">⚡ Acceso rápido para pruebas:</p>
          <div className="demo-buttons">
            <button
              type="button"
              onClick={() => handleAccesoRapido('EMPRESA')}
              className="btn-demo-empresa"
            >
              Entrar como Empresa
            </button>
            <button
              type="button"
              onClick={() => handleAccesoRapido('ESTUDIANTE')}
              className="btn-demo-estudiante"
            >
              Entrar como Estudiante
            </button>
          </div>
        </div>

        <div className="auth-footer">
          <p>
            ¿No tienes una cuenta aún?{' '}
            <Link to="/registro" className="auth-link">
              Regístrate aquí
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
