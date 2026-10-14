import React, { useState } from 'react';
import {
  ESTADOS,
  COLOR_ESTADO,
  POSTULACIONES_INICIALES,
  formatearFecha,
} from './registrosData';
import { etiqueta } from './categoriasData';
import { useAuth } from '../context/AuthContext';
import { useRetos } from '../context/RetosContext';

const PillEstado = ({ estado }) => (
  <span className="status-pill" style={COLOR_ESTADO[estado]}>
    {ESTADOS[estado]}
  </span>
);

// ---------- ESTUDIANTE: Mis Retos Inscritos ----------
// Lee las postulaciones reales del RetosContext (las crea el botón "Postularme")
const estadoDePostulacion = (estado) => {
  if (estado === 'ACEPTADA') return 'ACEPTADO';
  if (estado === 'RECHAZADA') return 'RECHAZADO';
  return 'PENDIENTE';
};

export const MisRetosInscritos = () => {
  const { usuario } = useAuth();
  const { obtenerPostulacionesEstudiante } = useRetos();
  const registros = obtenerPostulacionesEstudiante(usuario?.id || 'demo-estudiante');

  if (registros.length === 0) {
    return (
      <div className="modulo-empty-state">
        <span className="empty-icon">📭</span>
        <p>Aún no te has postulado a ningún reto.</p>
      </div>
    );
  }

  return (
    <div className="demo-cards-list">
      {registros.map((post) => (
        <div className="demo-student-card" key={post.id}>
          <div className="card-top">
            <span className="empresa-pill">🏢 {post.reto?.empresa}</span>
            <PillEstado estado={estadoDePostulacion(post.estado)} />
          </div>
          <h4>{post.reto?.nombre}</h4>
          <div className="card-bottom">
            <span className="reto-short-desc">Fecha de registro: {post.fecha}</span>
            <span className="badge-demo cat-tec">{etiqueta(post.reto?.categoria)}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

// ---------- EMPRESA: Postulaciones de participantes ----------
export const PostulacionesEmpresa = () => {
  const [postulaciones, setPostulaciones] = useState(POSTULACIONES_INICIALES);

  const cambiarEstado = (id, estado) => {
    setPostulaciones(postulaciones.map((p) => (p.id === id ? { ...p, estado } : p)));
  };

  if (postulaciones.length === 0) {
    return (
      <div className="modulo-empty-state">
        <span className="empty-icon">📭</span>
        <p>Todavía no hay postulaciones a tus retos.</p>
      </div>
    );
  }

  return (
    <div className="demo-table-preview">
      {postulaciones.map((p) => (
        <div className="demo-reto-item" key={p.id}>
          <div>
            <strong>{p.estudiante.nombre}</strong>
            <span className="badge-demo cat-tec">{etiqueta(p.reto.categoria)}</span>
            <div className="reto-short-desc">
              {p.reto.titulo} · {p.estudiante.correo} · {formatearFecha(p.fecha_inscripcion)}
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
            <PillEstado estado={p.estado} />
            {p.estado === 'PENDIENTE' && (
              <>
                <button type="button" className="btn-action-small" onClick={() => cambiarEstado(p.id, 'ACEPTADO')}>
                  Aceptar
                </button>
                <button type="button" className="btn-cancelar-perfil" onClick={() => cambiarEstado(p.id, 'RECHAZADO')}>
                  Rechazar
                </button>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
