import React, { createContext, useContext, useState, useEffect } from 'react';

// 1. Creamos el contexto de autenticación
const AuthContext = createContext();

// 2. Proveedor que envuelve toda la aplicación
export const AuthProvider = ({ children }) => {
  // Intentamos recuperar la sesión guardada en localStorage
  const [usuario, setUsuario] = useState(() => {
    const sesionGuardada = localStorage.getItem('usuario_sesion');
    return sesionGuardada ? JSON.parse(sesionGuardada) : null;
  });

  // Guardar en localStorage cada vez que el usuario cambie
  useEffect(() => {
    if (usuario) {
      localStorage.setItem('usuario_sesion', JSON.stringify(usuario));
    } else {
      localStorage.removeItem('usuario_sesion');
    }
  }, [usuario]);

  // Función para iniciar sesión
  const login = (correo, contrasena, rolSeleccionado) => {
    // Simulación de login: en un proyecto real aquí se conecta con el Backend
    // Determinamos un nombre amigable según el rol
    const nombre = rolSeleccionado === 'EMPRESA' 
      ? 'Tech Solutions S.A.S.' 
      : 'Esteban - Participante';

    const usuarioLogueado = {
      id: Date.now().toString(),
      nombre,
      correo,
      rol: rolSeleccionado // 'EMPRESA' o 'ESTUDIANTE'
    };

    setUsuario(usuarioLogueado);
    return true;
  };

  // Función para registrar un nuevo usuario
  const registro = (datos) => {
    // datos: { nombre, correo, contrasena, rol }
    const nuevoUsuario = {
      id: Date.now().toString(),
      nombre: datos.nombre,
      correo: datos.correo,
      rol: datos.rol
    };

    setUsuario(nuevoUsuario);
    return true;
  };

  // Función para cerrar sesión
  const logout = () => {
    setUsuario(null);
  };

  return (
    <AuthContext.Provider value={{ usuario, login, registro, logout, estaAutenticado: !!usuario }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizado para usar la autenticación de forma sencilla en cualquier componente
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};
