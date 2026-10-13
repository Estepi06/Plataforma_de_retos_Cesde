import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * Componente de Ruta Privada / Protegida:
 * Requisito de la entrega: No permitir el ingreso al Dashboard si el usuario NO está logueado.
 * 
 * Si el usuario NO ha iniciado sesión, lo redirige automáticamente a /login.
 * Si tiene sesión activa, le permite ver el contenido de la ruta.
 */
export const RutaPrivada = ({ rolRequerido }) => {
  const { usuario, estaAutenticado } = useAuth();

  // 1. Si no está logueado, redirigir a Login
  if (!estaAutenticado) {
    return <Navigate to="/login" replace />;
  }

  // 2. Si la ruta requiere un rol específico y el usuario no lo tiene
  if (rolRequerido && usuario.rol !== rolRequerido) {
    // Redirigir al dashboard general correspondiente
    return <Navigate to="/dashboard" replace />;
  }

  // 3. Si está autenticado y tiene permiso, renderiza el contenido de la ruta
  return <Outlet />;
};

export default RutaPrivada;
