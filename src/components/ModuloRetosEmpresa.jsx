import React, { useState } from 'react';
import { useRetos } from '../context/RetosContext';
import { useAuth } from '../context/AuthContext';
import { CATEGORIAS, etiqueta } from './categoriasData';

const FORM_VACIO = {
  nombre: '',
  categoria: CATEGORIAS[0], // Por defecto primera categoría ("Logistica")
  descripcion: '',
  requisitos: '',
  fecha_fin: '2026-12-15',
  estado: 'ABIERTO',
  prioridad: 'MEDIA'
};

export const ModuloRetosEmpresa = () => {
  const { usuario } = useAuth();
  const {
    publicarReto,
    actualizarReto,
    eliminarReto,
    cambiarEstadoReto,
    obtenerRetosEmpresa
  } = useRetos();

  const nombreEmpresa = usuario?.nombre || 'Tech Solutions S.A.S.';
  const misRetos = obtenerRetosEmpresa(nombreEmpresa);

  const [mostrarForm, setMostrarForm] = useState(false);
  const [editandoId, setEditandoId] = useState(null);
  const [form, setForm] = useState(FORM_VACIO);
  const [error, setError] = useState('');
  const [mensajeExito, setMensajeExito] = useState('');
  const [filtroEstado, setFiltroEstado] = useState('TODOS');

  const avisar = (texto) => {
    setMensajeExito(texto);
    setTimeout(() => setMensajeExito(''), 4000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const abrirNuevoReto = () => {
    setEditandoId(null);
    setForm(FORM_VACIO);
    setError('');
    setMostrarForm(true);
  };

  const abrirEditarReto = (r) => {
    setEditandoId(r.id);
    setForm({
      nombre: r.nombre,
      categoria: r.categoria,
      descripcion: r.descripcion,
      requisitos: r.requisitos || '',
      fecha_fin: r.fecha_fin || '2026-12-15',
      estado: r.estado || 'ABIERTO',
      prioridad: r.prioridad || 'MEDIA'
    });
    setError('');
    setMostrarForm(true);
  };

  const cancelar = () => {
    setMostrarForm(false);
    setEditandoId(null);
    setError('');
  };

  const handleGuardar = (e) => {
    e.preventDefault();
    if (!form.nombre.trim() || !form.descripcion.trim()) {
      setError('Por favor completa el título y la descripción del reto.');
      return;
    }

    if (editandoId) {
      actualizarReto(editandoId, form);
      avisar(`✓ ¡Reto "${form.nombre}" actualizado exitosamente!`);
    } else {
      publicarReto(form, nombreEmpresa);
      avisar(`✓ ¡Reto publicado exitosamente en la categoría ${etiqueta(form.categoria)}!`);
    }

    cancelar();
  };

  const handleEliminar = (id, nombre) => {
    if (window.confirm(`¿Estás seguro de que deseas eliminar el reto "${nombre}"?`)) {
      eliminarReto(id);
      avisar('✓ Reto eliminado del catálogo.');
    }
  };

  const retosFiltrados = misRetos.filter((r) => {
    if (filtroEstado === 'TODOS') return true;
    return r.estado === filtroEstado;
  });

  return (
    <div className="empresa-profile-card">
      {/* Encabezado del Módulo de Retos */}
      <div className="profile-card-header">
        <div>
          <span className="modulo-tag">Tabla: Reto · Publicación y Gestión</span>
          <h3 className="profile-title">Gestión de Retos de {nombreEmpresa}</h3>
          <p className="modulo-description">
            Publica problemas reales de tu empresa, clasifícalos por Categoría temática y recibe postulaciones de estudiantes CESDE.
          </p>
        </div>
        {!mostrarForm && (
          <button type="button" onClick={abrirNuevoReto} className="btn-primary-action">
            ➕ Publicar Nuevo Reto
          </button>
        )}
      </div>

      {mensajeExito && <div className="alert-success">{mensajeExito}</div>}

      {/* Formulario de Creación / Edición de Reto */}
      {mostrarForm && (
        <div className="form-reto-container">
          <div className="form-reto-header">
            <h4>{editandoId ? '✏️ Editar Reto de Innovación' : '🚀 Publicar Nuevo Reto de Innovación'}</h4>
            <p>Conecta este reto con las categorías temáticas oficiales de la plataforma.</p>
          </div>

          <form onSubmit={handleGuardar} className="form-perfil-empresa">
            {error && <div className="alert-error">{error}</div>}

            <div className="form-grid-empresa">
              {/* Título del Reto */}
              <div className="form-group grid-full-width">
                <label>Título del Reto *</label>
                <input
                  type="text"
                  name="nombre"
                  placeholder="Ej: Optimización de Algoritmo de Enrutamiento y Despachos"
                  value={form.nombre}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Categoría Oficial (Conexión con categoriasData.jsx) */}
              <div className="form-group">
                <label>Categoría Temática (Tabla Categoria) *</label>
                <select
                  name="categoria"
                  value={form.categoria}
                  onChange={handleChange}
                  className="select-sector"
                  required
                >
                  {CATEGORIAS.map((cat) => (
                    <option key={cat} value={cat}>
                      🏷️ {etiqueta(cat)}
                    </option>
                  ))}
                </select>
                <small className="field-hint">Clasifica el problema según el área de innovación.</small>
              </div>

              {/* Prioridad / Dificultad */}
              <div className="form-group">
                <label>Prioridad / Dificultad</label>
                <select
                  name="prioridad"
                  value={form.prioridad}
                  onChange={handleChange}
                  className="select-sector"
                >
                  <option value="ALTA">🔥 Alta</option>
                  <option value="MEDIA">⚡ Media</option>
                  <option value="BAJA">🌱 Baja</option>
                </select>
              </div>

              {/* Fecha Límite de Postulación */}
              <div className="form-group">
                <label>Fecha Límite de Postulación</label>
                <input
                  type="date"
                  name="fecha_fin"
                  value={form.fecha_fin}
                  onChange={handleChange}
                />
              </div>

              {/* Estado Inicial del Reto */}
              <div className="form-group">
                <label>Estado del Reto</label>
                <select
                  name="estado"
                  value={form.estado}
                  onChange={handleChange}
                  className="select-sector"
                >
                  <option value="ABIERTO">🟢 Abierto (Recibiendo postulaciones)</option>
                  <option value="EN_PROGRESO">🟡 En Progreso (En ejecución)</option>
                  <option value="COMPLETADO">🔵 Completado (Finalizado)</option>
                  <option value="CERRADO">🔴 Cerrado</option>
                </select>
              </div>

              {/* Requisitos / Perfil Esperado */}
              <div className="form-group grid-full-width">
                <label>Requisitos o Entregables Esperados</label>
                <input
                  type="text"
                  name="requisitos"
                  placeholder="Ej: Conocimientos en Python, SQL, React o análisis de datos"
                  value={form.requisitos}
                  onChange={handleChange}
                />
              </div>

              {/* Descripción Detallada */}
              <div className="form-group grid-full-width">
                <label>Descripción del Problema a Resolver *</label>
                <textarea
                  name="descripcion"
                  rows="4"
                  placeholder="Describe con claridad el desafío o problema real que tu empresa busca solucionar con los estudiantes de CESDE..."
                  value={form.descripcion}
                  onChange={handleChange}
                  required
                  className="textarea-reto"
                />
              </div>
            </div>

            <div className="form-buttons-perfil">
              <button type="submit" className="btn-guardar-perfil">
                {editandoId ? 'Guardar Cambios del Reto' : 'Publicar Reto en el Catálogo'}
              </button>
              <button type="button" onClick={cancelar} className="btn-cancelar-perfil">
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Barra de Filtros Rápidos por Estado */}
      <div className="retos-toolbar">
        <div className="retos-counter-pill">
          Total de mis retos: <strong>{misRetos.length}</strong>
        </div>

        <div className="filtro-estados-chips">
          {['TODOS', 'ABIERTO', 'EN_PROGRESO', 'COMPLETADO', 'CERRADO'].map((est) => (
            <button
              key={est}
              type="button"
              onClick={() => setFiltroEstado(est)}
              className={`chip-estado ${filtroEstado === est ? 'chip-active' : ''}`}
            >
              {est === 'TODOS' ? 'Todos' : est.replace('_', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Lista de Retos Publicados por la Empresa */}
      <div className="retos-empresa-grid">
        {retosFiltrados.length > 0 ? (
          retosFiltrados.map((reto) => (
            <div key={reto.id} className="reto-card-empresa">
              <div className="reto-card-header">
                <div>
                  <div className="reto-badges-group">
                    <span className="categoria-badge">
                      🏷️ {etiqueta(reto.categoria)}
                    </span>
                    <span className={`prioridad-badge prioridad-${reto.prioridad?.toLowerCase()}`}>
                      {reto.prioridad === 'ALTA' ? '🔥 Alta' : reto.prioridad === 'BAJA' ? '🌱 Baja' : '⚡ Media'}
                    </span>
                  </div>
                  <h4 className="reto-title">{reto.nombre}</h4>
                </div>

                <div className="reto-status-dropdown-wrapper">
                  <select
                    value={reto.estado}
                    onChange={(e) => cambiarEstadoReto(reto.id, e.target.value)}
                    className={`select-estado-mini estado-${reto.estado.toLowerCase()}`}
                    title="Cambiar estado del reto"
                  >
                    <option value="ABIERTO">🟢 Abierto</option>
                    <option value="EN_PROGRESO">🟡 En Progreso</option>
                    <option value="COMPLETADO">🔵 Completado</option>
                    <option value="CERRADO">🔴 Cerrado</option>
                  </select>
                </div>
              </div>

              <p className="reto-description">{reto.descripcion}</p>

              {reto.requisitos && (
                <div className="reto-requisitos-box">
                  <strong>Requisitos:</strong> {reto.requisitos}
                </div>
              )}

              <div className="reto-meta-info">
                <span>📅 Límite: <strong>{reto.fecha_fin || 'Sin límite'}</strong></span>
                <span className="postulados-badge">
                  👥 <strong>{reto.postulados || 0}</strong> {reto.postulados === 1 ? 'estudiante postulado' : 'estudiantes postulados'}
                </span>
              </div>

              <div className="reto-card-actions">
                <button
                  type="button"
                  onClick={() => abrirEditarReto(reto)}
                  className="btn-accion-reto btn-editar"
                >
                  ✏️ Editar
                </button>
                <button
                  type="button"
                  onClick={() => handleEliminar(reto.id, reto.nombre)}
                  className="btn-accion-reto btn-eliminar"
                >
                  🗑️ Eliminar
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="no-retos-empty">
            <span className="empty-icon">🎯</span>
            <h4>No hay retos registrados en este estado</h4>
            <p>Haz clic en "Publicar Nuevo Reto" para proponer una necesidad o desafío a los estudiantes CESDE.</p>
            {!mostrarForm && (
              <button type="button" onClick={abrirNuevoReto} className="btn-primary-action" style={{ marginTop: '0.8rem' }}>
                ➕ Publicar Primer Reto
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ModuloRetosEmpresa;
