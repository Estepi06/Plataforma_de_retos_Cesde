import React from 'react';
import { useAuth } from '../context/AuthContext';
import PlaceholderModulo from '../components/PlaceholderModulo';
import DirectorioEmpresasEstudiante from '../components/DirectorioEmpresasEstudiante';
import FiltroCategorias from '../components/FiltroCategorias';
import { MisRetosInscritos } from '../components/ModuloRegistro';

export const DashboardEstudiante = () => {
  const { usuario } = useAuth();

  return (
    <div className="dashboard-container">
      {/* Encabezado del Dashboard Estudiante */}
      <section className="dashboard-banner estudiante-banner">
        <div>
          <span className="banner-tag">🎓 Panel del Estudiante</span>
          <h1>¡Hola, {usuario?.nombre || 'Estudiante'}!</h1>
          <p>Explora retos reales propuestos por empresas y postúlate para resolverlos.</p>
        </div>
      </section>

      {/* Tarjetas de Métricas Clave */}
      <section className="stats-grid">
        <div className="stat-card">
          <span className="stat-icon">🔍</span>
          <div>
            <p className="stat-label">Retos Disponibles</p>
            <h3 className="stat-value">12</h3>
          </div>
        </div>

        <div className="stat-card">
          <span className="stat-icon">🏷️</span>
          <div>
            <p className="stat-label">Categorías Abiertas</p>
            <h3 className="stat-value">4</h3>
          </div>
        </div>

        <div className="stat-card">
          <span className="stat-icon">🚀</span>
          <div>
            <p className="stat-label">Mis Postulaciones</p>
            <h3 className="stat-value">2</h3>
          </div>
        </div>

        <div className="stat-card">
          <span className="stat-icon">🏢</span>
          <div>
            <p className="stat-label">Empresas Aliadas</p>
            <h3 className="stat-value">5</h3>
          </div>
        </div>
      </section>

      {/* Directorio de Empresas Aliadas (Tabla Empresa - TU MÓDULO TERMINADO) */}
      <section className="modulos-section">
        <div className="section-title-box">
          <span className="modulo-tag">Tabla: Empresa · Directorio</span>
          <h2>Empresas Aliadas con Retos Activos</h2>
          <p>Conoce las organizaciones participantes del CESDE, sus sectores económicos y retos disponibles.</p>
        </div>
        <DirectorioEmpresasEstudiante />
      </section>

     {/* Filtro por categoría (Tabla Categoria) */}
    <section className="modulos-section">
   <div className="section-title-box">
    <span className="modulo-tag">Tabla: Categoria · Filtros</span>
    <h2>Filtrar retos por categoría</h2>
    <p>Selecciona un área temática para explorar los retos relacionados.</p>
   </div>
   <FiltroCategorias />
  </section>


      {/* Espacios Modulares para los compañeros */}
      <section className="modulos-section">
        <div className="section-title-box">
          <h2>Tus Actividades y Convocatorias</h2>
          <p>Secciones reservadas para los módulos de tus compañeros de equipo.</p>
        </div>

        <div className="modulos-grid">
          {/* Módulo 1: Catálogo de Retos Disponibles */}
          <PlaceholderModulo
            titulo="Catálogo de Retos Abiertos"
            tablaAsignada="Reto / Categoria"
            encargado="Integrante de RETOS y CATEGORIAS"
            descripcion="Explora los problemas de las empresas organizados por categoría (Tecnología, Finanzas, Salud, Logística)."
          >
            <div className="demo-cards-list">
              <div className="demo-student-card">
                <div className="card-top">
                  <span className="empresa-pill">🏢 Bancolombia Tech</span>
                  <span className="badge-demo cat-tec">Tecnología</span>
                </div>
                <h4>Algoritmo de Detección de Fraude Transaccional</h4>
                <p className="reto-short-desc">Desarrollar un modelo de análisis para clasificar transacciones sospechosas.</p>
                <div className="card-bottom">
                  <span></span>
                  <button className="btn-action-small">Postularme</button>
                </div>
              </div>

              <div className="demo-student-card">
                <div className="card-top">
                  <span className="empresa-pill">🏢 Clínica Salud Integral</span>
                  <span className="badge-demo cat-salud">Salud</span>
                </div>
                <h4>Optimización de Agendamiento de Citas</h4>
                <p className="reto-short-desc">Crear un flujo automatizado para reducir inasistencias de pacientes.</p>
                <div className="card-bottom">
                  <span></span>
                  <button className="btn-action-small">Postularme</button>
                </div>
              </div>
            </div>
          </PlaceholderModulo>

          {/* Módulo 2: Mis Postulaciones (Tabla Registro) */}
          <PlaceholderModulo
            titulo="Mis Retos Inscritos"
            tablaAsignada="Registro"
            descripcion="Consulta los retos en los que ya te postulaste, fecha de registro y confirmación por parte de la empresa."
          >
            <MisRetosInscritos />
          </PlaceholderModulo>
        </div>
      </section>
    </div>
  );
};

export default DashboardEstudiante;
