import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useRetos } from '../context/RetosContext';
import PlaceholderModulo from '../components/PlaceholderModulo';
import DirectorioEmpresasEstudiante from '../components/DirectorioEmpresasEstudiante';
import FiltroCategorias from '../components/FiltroCategorias';
import { MisRetosInscritos } from '../components/ModuloRegistro';
import CatalogoRetosEstudiante from '../components/CatalogoRetosEstudiante';

export const DashboardEstudiante = () => {
  const { usuario } = useAuth();
  const { retos, obtenerPostulacionesEstudiante } = useRetos();

  const [categoriaFiltro, setCategoriaFiltro] = useState('');

  const misPostulaciones = obtenerPostulacionesEstudiante(usuario?.id || 'demo-estudiante');
  const retosDisponibles = retos.filter((r) => r.estado !== 'CERRADO').length;
  const categoriasAbiertas = new Set(retos.filter((r) => r.estado !== 'CERRADO').map((r) => r.categoria)).size;
  const empresasAliadas = new Set(retos.map((r) => r.empresa)).size;

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
            <h3 className="stat-value">{retosDisponibles}</h3>
          </div>
        </div>

        <div className="stat-card">
          <span className="stat-icon">🏷️</span>
          <div>
            <p className="stat-label">Categorías Abiertas</p>
            <h3 className="stat-value">{categoriasAbiertas}</h3>
          </div>
        </div>

        <div className="stat-card">
          <span className="stat-icon">🚀</span>
          <div>
            <p className="stat-label">Mis Postulaciones</p>
            <h3 className="stat-value">{misPostulaciones.length}</h3>
          </div>
        </div>

        <div className="stat-card">
          <span className="stat-icon">🏢</span>
          <div>
            <p className="stat-label">Empresas Aliadas</p>
            <h3 className="stat-value">{empresasAliadas}</h3>
          </div>
        </div>
      </section>

      {/* Directorio de Empresas Aliadas (Tabla Empresa) */}
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
          <p>Selecciona un área temática para explorar los retos relacionados en el catálogo inferior.</p>
        </div>
        <FiltroCategorias onChange={setCategoriaFiltro} valor={categoriaFiltro} />
      </section>

      {/* Catálogo Oficial de Retos (TABLA RETO) */}
      <section className="modulos-section">
        <div className="section-title-box">
          <span className="modulo-tag">Tabla: Reto · Catálogo de Innovación</span>
          <h2>Banco de Retos de Innovación Abierta</h2>
          <p>Selecciona un reto, revisa sus requisitos técnicos y postúlate para colaborar con la empresa.</p>
        </div>
        <CatalogoRetosEstudiante
          categoriaFiltroExterna={categoriaFiltro}
          onCambiarCategoria={setCategoriaFiltro}
        />
      </section>

      {/* Espacios Modulares para los compañeros */}
      <section className="modulos-section">
        <div className="section-title-box">
          <h2>Tus Actividades y Convocatorias</h2>
          <p>Secciones reservadas para los módulos de tus compañeros de equipo.</p>
        </div>

        <div className="modulos-grid">
          {/* Módulo Tabla Registro */}
          <PlaceholderModulo
            titulo="Mis Retos Inscritos (Control de Postulaciones)"
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
