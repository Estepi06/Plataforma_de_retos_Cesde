import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const Registro = () => {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [confirmarContrasena, setConfirmarContrasena] = useState('');
  const [rol, setRol] = useState('ESTUDIANTE');
  const [identificacion, setIdentificacion] = useState('');
  const [error, setError] = useState('');

  const { registro } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!nombre.trim() || !correo.trim() || !contrasena.trim()) {
      setError('Por favor completa todos los campos obligatorios.');
      return;
    }

    if (contrasena !== confirmarContrasena) {
      setError('Las contraseñas no coinciden.');
      return;
    }

    if (contrasena.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres.');
      return;
    }

    // Registramos en el contexto
    registro({
      nombre,
      correo,
      contrasena,
      rol,
      identificacion
    });

    // Redirigir al dashboard
    navigate('/dashboard');
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h2>Crear Cuenta</h2>
          <p>Únete a la plataforma de retos empresariales</p>
        </div>

        {error && <div className="alert-error">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label>Tipo de Cuenta</label>
            <div className="role-selector">
              <label className={`role-option ${rol === 'ESTUDIANTE' ? 'active' : ''}`}>
                <input
                  type="radio"
                  name="rol"
                  value="ESTUDIANTE"
                  checked={rol === 'ESTUDIANTE'}
                  onChange={() => setRol('ESTUDIANTE')}
                />
                <span>🎓 Estudiante / Participante</span>
              </label>

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
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="nombre">
              {rol === 'EMPRESA' ? 'Nombre o Razón Social de la Empresa' : 'Nombre Completo del Estudiante'}
            </label>
            <input
              id="nombre"
              type="text"
              placeholder={rol === 'EMPRESA' ? 'Ej. Soluciones Digitales S.A.S.' : 'Ej. Esteban Pérez'}
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="identificacion">
              {rol === 'EMPRESA' ? 'NIT de la Empresa' : 'Documento de Identidad / Código Estudiante'}
            </label>
            <input
              id="identificacion"
              type="text"
              placeholder={rol === 'EMPRESA' ? '900.123.456-7' : '1020304050'}
              value={identificacion}
              onChange={(e) => setIdentificacion(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="correo">Correo Electrónico</label>
            <input
              id="correo"
              type="email"
              placeholder={rol === 'EMPRESA' ? 'contacto@empresa.com' : 'estudiante@cesde.edu.co'}
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
              placeholder="Mínimo 6 caracteres"
              value={contrasena}
              onChange={(e) => setContrasena(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmarContrasena">Confirmar Contraseña</label>
            <input
              id="confirmarContrasena"
              type="password"
              placeholder="Repite la contraseña"
              value={confirmarContrasena}
              onChange={(e) => setConfirmarContrasena(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn-primary">
            Registrarse e Ingresar
          </button>
        </form>

        <div className="auth-footer">
          <p>
            ¿Ya tienes una cuenta?{' '}
            <Link to="/login" className="auth-link">
              Inicia sesión aquí
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Registro;
