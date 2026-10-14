import React, { useState } from 'react';
import { useRetos } from '../context/RetosContext';
import { useAuth } from '../context/AuthContext';
import { CATEGORIAS, etiqueta } from './categoriasData';

export const CatalogoRetosEstudiante = ({ categoriaFiltroExterna, onCambiarCategoria }) => {
  const { usuario } = useAuth();
  const {
    retos,
    postularmeAReto,
    cancelarPostulacion,
    estaPostulado,
    obtenerPostulacionesEstudiante
  } = useRetos();

  const [busqueda, setBusqueda] = useState('');
  const [categoriaInterna, setCategoriaInterna] = useState('TODAS');
  const [pestañaActiva, setPestañaActiva] = useState('CATALOGO'); // 'CATALOGO' | 'MIS_POSTULACIONES'
  const [mensajeFeedback, setMensajeFeedback] = useState(null);

  // Categoría efectiva: si viene de prop externa (FiltroCategorias de arriba), se usa esa; sino la interna
  const categoriaEfectiva = categoriaFiltroExterna !== undefined && categoriaFiltroExterna !== null
    ? (categoriaFiltroExterna === '' ? 'TODAS' : categoriaFiltroExterna)
    : categoriaInterna;

  const misPostulaciones = obtenerPostulacionesEstudiante(usuario?.id || 'demo-estudiante');

  const avisar = (tipo, texto) => {
    setMensajeFeedback({ tipo, texto });
    setTimeout(() => setMensajeFeedback(null), 4500);
  };

  const handleSeleccionarCategoria = (cat) => {
    setCategoriaInterna(cat);
    if (onCambiarCategoria) {
      onCambiarCategoria(cat === 'TODAS' ? '' : cat);
    }
  };

  const handlePostularme = (reto) => {
    const res = postularmeAReto(reto.id, usuario);
    if (res.exito) {
      avisar('exito', `🎉 ¡Excelente, ${usuario?.nombre || 'Estudiante'}! Te has postulado a "${reto.nombre}". La empresa revisará tu registro.`);
    } else {
      avisar('info', res.mensaje);
    }
  };

  const handleCancelarPostulacion = (retoId, nombreReto) => {
    if (window.confirm(`¿Deseas cancelar tu postulación al reto "${nombreReto}"?`)) {
      const res = cancelarPostulacion(retoId, usuario?.id || 'demo-estudiante');
      avisar('alerta', res.mensaje);
    }
  };

  // Filtrado de retos disponibles
  const retosFiltrados = retos.filter((reto) => {
    // Solo mostramos retos que no estén cerrados en el catálogo
    const estadoValido = reto.estado === 'ABIERTO' || reto.estado === 'EN_PROGRESO';

    // Coincidencia con categoría
    const coincideCategoria =
      categoriaEfectiva === 'TODAS' || reto.categoria === categoriaEfectiva;

    // Coincidencia con buscador por texto
    const texto = busqueda.toLowerCase();
    const coincideTexto =
      reto.nombre.toLowerCase().includes(texto) ||
      reto.descripcion.toLowerCase().includes(texto) ||
      reto.empresa.toLowerCase().includes(texto) ||
      (reto.requisitos && reto.requisitos.toLowerCase().includes(texto));

    return estadoValido && coincideCategoria && coincideTexto;
  });

  return (
    <div className="catalogo-retos-modulo">
      {/* Selector de Pestañas: Catálogo vs Mis Postulaciones */}
      <div className="catalogo-tabs-bar">
        <button
          type="button"
          onClick={() => setPestañaActiva('CATALOGO')}
          className={`tab-btn ${pestañaActiva === 'CATALOGO' ? 'tab-btn-active' : ''}`}
        >
          🔍 Catálogo de Retos Abiertos ({retosFiltrados.length})
        </button>
        <button
          type="button"
          onClick={() => setPestañaActiva('MIS_POSTULACIONES')}
          className={`tab-btn ${pestañaActiva === 'MIS_POSTULACIONES' ? 'tab-btn-active' : ''}`}
        >
          🚀 Mis Retos Inscritos ({misPostulaciones.length})
        </button>
      </div>

      {/* Alerta de confirmación / Feedback */}
      {mensajeFeedback && (
        <div
          className={`alert-notificacion ${
            mensajeFeedback.tipo === 'exito'
              ? 'alert-notif-success'
              : mensajeFeedback.tipo === 'alerta'
              ? 'alert-notif-warn'
              : 'alert-notif-info'
          }`}
        >
          <span>{mensajeFeedback.texto}</span>
          <button
            type="button"
            onClick={() => setMensajeFeedback(null)}
            className="btn-cerrar-alerta"
          >
            ✕
          </button>
        </div>
      )}

      {pestañaActiva === 'CATALOGO' ? (
        <>
          {/* Barra de Filtros y Búsqueda */}
          <div className="catalogo-filtros-container">
            <div className="buscador-input-box">
              <span className="search-icon">🔍</span>
              <input
                type="text"
                placeholder="Buscar retos por palabra clave, tecnología, empresa o requisitos..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                className="input-buscar-empresa"
              />
              {busqueda && (
                <button
                  type="button"
                  onClick={() => setBusqueda('')}
                  className="btn-limpiar-busqueda"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Chips de Categorías Oficiales (Conexión con categoriasData.jsx) */}
            <div className="chips-categorias-scroll">
              <button
                type="button"
                onClick={() => handleSeleccionarCategoria('TODAS')}
                className={`chip-categoria-btn ${categoriaEfectiva === 'TODAS' ? 'chip-cat-active' : ''}`}
              >
                🌐 Todas ({retos.filter(r => r.estado !== 'CERRADO').length})
              </button>

              {CATEGORIAS.map((cat) => {
                const count = retos.filter((r) => r.categoria === cat && r.estado !== 'CERRADO').length;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => handleSeleccionarCategoria(cat)}
                    className={`chip-categoria-btn ${categoriaEfectiva === cat ? 'chip-cat-active' : ''}`}
                  >
                    🏷️ {etiqueta(cat)} {count > 0 ? `(${count})` : ''}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Cuadrícula de Retos Disponibles */}
          <div className="retos-catalogo-grid">
            {retosFiltrados.length > 0 ? (
              retosFiltrados.map((reto) => {
                const yaInscrito = estaPostulado(reto.id, usuario?.id || 'demo-estudiante');

                return (
                  <div
                    key={reto.id}
                    className={`reto-card-estudiante ${yaInscrito ? 'card-ya-postulado' : ''}`}
                  >
                    {/* Header de la Tarjeta */}
                    <div className="reto-card-est-header">
                      <span className="empresa-pill">🏢 {reto.empresa}</span>
                      <span className="categoria-badge-estudiante">
                        🏷️ {etiqueta(reto.categoria)}
                      </span>
                    </div>

                    {/* Título y Descripción */}
                    <h4 className="reto-card-est-title">{reto.nombre}</h4>
                    <p className="reto-card-est-desc">{reto.descripcion}</p>

                    {/* Requisitos y Habilidades */}
                    {reto.requisitos && (
                      <div className="reto-requisitos-pill">
                        <strong>Requisitos:</strong> {reto.requisitos}
                      </div>
                    )}

                    {/* Fechas y Prioridad */}
                    <div className="reto-card-est-meta">
                      <span>📅 Límite: <strong>{reto.fecha_fin || 'Sin límite'}</strong></span>
                      <span className="meta-postulados">
                        👥 {reto.postulados || 0} {(reto.postulados === 1 ? 'postulado' : 'postulados')}
                      </span>
                    </div>

                    {/* Footer y Botón de Postulación */}
                    <div className="reto-card-est-footer">
                      {yaInscrito ? (
                        <div className="postulado-acciones">
                          <span className="badge-postulado-ok">
                            ✓ Postulado (En Revisión)
                          </span>
                          <button
                            type="button"
                            onClick={() => handleCancelarPostulacion(reto.id, reto.nombre)}
                            className="btn-cancelar-postulacion"
                            title="Cancelar postulación"
                          >
                            Retirar
                          </button>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => handlePostularme(reto)}
                          className="btn-postularme-cta"
                        >
                          🚀 Postularme a este Reto
                        </button>
                      )}
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="no-retos-catalogo">
                <span className="empty-icon">🔎</span>
                <h4>No se encontraron retos disponibles</h4>
                <p>
                  No hay retos que coincidan con la categoría <strong>{categoriaEfectiva !== 'TODAS' ? etiqueta(categoriaEfectiva) : 'seleccionada'}</strong> o el término de búsqueda.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setBusqueda('');
                    handleSeleccionarCategoria('TODAS');
                  }}
                  className="btn-reset-filtros"
                >
                  Restablecer filtros y ver todos los retos
                </button>
              </div>
            )}
          </div>
        </>
      ) : (
        /* Pestaña: Mis Retos Inscritos (Tabla Registro) */
        <div className="mis-postulaciones-seccion">
          <div className="section-title-box" style={{ marginBottom: '1rem' }}>
            <span className="modulo-tag">Tabla: Registro · Mis Inscripciones</span>
            <h3>Retos en los que estás postulado</h3>
            <p>Monitorea el estado de aceptación de tus propuestas ante las empresas aliadas.</p>
          </div>

          {misPostulaciones.length > 0 ? (
            <div className="retos-catalogo-grid">
              {misPostulaciones.map((post) => (
                <div key={post.id} className="reto-card-estudiante card-ya-postulado">
                  <div className="reto-card-est-header">
                    <span className="empresa-pill">🏢 {post.reto?.empresa}</span>
                    <span className="categoria-badge-estudiante">
                      🏷️ {etiqueta(post.reto?.categoria)}
                    </span>
                  </div>

                  <h4 className="reto-card-est-title">{post.reto?.nombre}</h4>
                  <p className="reto-card-est-desc">{post.reto?.descripcion}</p>

                  <div className="postulacion-info-box">
                    <p><strong>Fecha de inscripción:</strong> {post.fecha}</p>
                    <p>
                      <strong>Estado:</strong>{' '}
                      <span className="badge-estado-postulacion">
                        {post.estado === 'ACEPTADA' ? '✓ Aceptada por la empresa' : '⏳ En evaluación'}
                      </span>
                    </p>
                  </div>

                  <div className="reto-card-est-footer">
                    <button
                      type="button"
                      onClick={() => handleCancelarPostulacion(post.reto?.id, post.reto?.nombre)}
                      className="btn-cancelar-postulacion-full"
                    >
                      Cancelar mi postulación
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-retos-catalogo">
              <span className="empty-icon">📝</span>
              <h4>Aún no te has postulado a ningún reto</h4>
              <p>Explora el catálogo de retos abiertos y presiona "Postularme" en los problemas que quieras resolver.</p>
              <button
                type="button"
                onClick={() => setPestañaActiva('CATALOGO')}
                className="btn-primary-action"
                style={{ marginTop: '0.8rem' }}
              >
                Explorar Catálogo de Retos
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CatalogoRetosEstudiante;
