import React from 'react';

/**
 * Componente modular para que los compañeros de equipo puedan
 * insertar sus tablas y módulos específicos (Retos, Categorías, Prioridades, Registros, Evidencias).
 */
export const PlaceholderModulo = ({ titulo, tablaAsignada, encargado, descripcion, children }) => {
  return (
    <div className="modulo-card">
      <div className="modulo-header">
        <div>
          <span className="modulo-tag">Tabla: {tablaAsignada}</span>
          <h3 className="modulo-title">{titulo}</h3>
        </div>
        {encargado && (
          <span className="modulo-encargado">Espacio para: {encargado}</span>
        )}
      </div>

      <p className="modulo-description">{descripcion}</p>

      {/* Si pasan hijos (botones, tablas, formularios), los muestra aquí */}
      <div className="modulo-content">
        {children || (
          <div className="modulo-empty-state">
            <span className="empty-icon">📦</span>
            <p>Aquí tu compañero conectará el componente o CRUD correspondiente a la tabla <strong>{tablaAsignada}</strong>.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlaceholderModulo;
