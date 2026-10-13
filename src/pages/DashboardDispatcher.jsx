import React from 'react';
import { useAuth } from '../context/AuthContext';
import DashboardEmpresa from './DashboardEmpresa';
import DashboardEstudiante from './DashboardEstudiante';

/**
 * Componente que decide qué Dashboard mostrar según el rol del usuario autenticado:
 * - Si es 'EMPRESA', muestra el Dashboard de la Empresa.
 * - Si es 'ESTUDIANTE', muestra el Dashboard del Estudiante / Participante.
 */
export const DashboardDispatcher = () => {
  const { usuario } = useAuth();

  if (usuario?.rol === 'EMPRESA') {
    return <DashboardEmpresa />;
  }

  return <DashboardEstudiante />;
};

export default DashboardDispatcher;
