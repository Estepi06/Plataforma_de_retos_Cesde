import React from 'react';
import { useAuth } from '../context/AuthContext';
import PlaceholderModulo from '../components/PlaceholderModulo';
import ModuloMiEmpresa from '../components/ModuloMiEmpresa';

export const DashboardEmpresa = () => {
  const { usuario } = useAuth();

  return (
    <div className="dashboard-container">
      {/* Encabezado del Dashboard */}
      <section className="dashboard-banner empresa-banner">
        <div>
          <span className="banner-tag">🏢 Panel Empresarial</span>
          <h1>Bienvenido, {usuario?.nombre || 'Empresa'}</h1>
          <p>Publica desafíos de innovación y gestiona las postulaciones de talento CESDE.</p>
        </div>
      </section>

      {/* Tarjetas de Métricas Clave (KPIs de Mi Empresa) */}
      <section className="stats-grid">
        <div className="stat-card">
          <span className="stat-icon">🎯</span>
          <div>
            <p className="stat-label">Mis Retos Publicados</p>
            <h3 className="stat-value">5</h3>
          </div>
        </div>

        <div className="stat-card">
          <span className="stat-icon">🏷️</span>
          <div>
            <p className="stat-label">Categorías Vinculadas</p>
            <h3 className="stat-value">4</h3>
          </div>
        </div>

        <div className="stat-card">
          <span className="stat-icon">👥</span>
          <div>
            <p className="stat-label">Postulaciones Recibidas</p>
            <h3 className="stat-value">18</h3>
          </div>
        </div>

        <div className="stat-card">
          <span className="stat-icon">🛡️</span>
          <div>
            <p className="stat-label">Estado de la Cuenta</p>
            <h3 className="stat-value text-status-activa">Activa ✓</h3>
          </div>
        </div>
      </section>

      {/* Módulo Principal: Mi Perfil Empresarial (Tabla Empresa - TU MÓDULO TERMINADO) */}
      <section className="modulos-section">
        <ModuloMiEmpresa />
      </section>

      {/* Espacios Modulares para los compañeros de equipo */}
      <section className="modulos-section">
        <div className="section-title-box">
          <h2>Módulos de Tus Compañeros</h2>
          <p>Espacios reservados para las demás tablas del equipo.</p>
        </div>

        <div className="modulos-grid">
          {/* Módulo 1: Tabla Reto */}
          <PlaceholderModulo
            titulo="Gestión de Retos Empresariales"
            tablaAsignada="Reto"
            encargado="Integrante de la Tabla RETO"
            descripcion="Permite publicar nuevos retos empresariales, asociar su categoría, definir requisitos y cambiar su estado."
          >
            <div className="demo-table-preview">
              <div className="demo-reto-item">
                <div>
                  <strong>Optimización de Logística y Rutas</strong>
                  <span className="badge-demo cat-tec">Tecnología</span>
                </div>
                <span className="status-pill status-open">Abierto</span>
              </div>
              <div className="demo-reto-item">
                <div>
                  <strong>Dashboard Financiero para Microempresas</strong>
                  <span className="badge-demo cat-fin">Finanzas</span>
                </div>
                <span className="status-pill status-open">Abierto</span>
              </div>
            </div>
          </PlaceholderModulo>

          {/* Módulo 2: Tabla Categoria */}
          <PlaceholderModulo
            titulo="Gestión de Categorías"
            tablaAsignada="Categoria"
            encargado="Integrante de la Tabla CATEGORIA"
            descripcion="Permite registrar y administrar las áreas temáticas de los retos (Tecnología, Finanzas, Salud, Logística, Marketing)."
          />

          {/* Módulo 3: Tabla Registro */}
          <PlaceholderModulo
            titulo="Postulaciones de Participantes"
            tablaAsignada="Registro"
            encargado="Integrante de la Tabla REGISTRO"
            descripcion="Listado y control de qué estudiantes se han postulado a cada reto, fechas de inscripción y estado de aceptación."
          />
        </div>
      </section>
    </div>
  );
};

export default DashboardEmpresa;
