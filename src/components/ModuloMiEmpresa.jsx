import React, { useState } from 'react';

// Sectores oficiales del proyecto integrador (mismos del script simular_empresa.py)
const SECTORES = [
  "TECNOLOGIA",
  "FINANZAS",
  "SALUD",
  "ADMINISTRACION",
  "CONTABLE",
  "EDUCACION",
  "CONSTRUCCION",
  "TRANSPORTE"
];

export const ModuloMiEmpresa = () => {
  const [estaEditando, setEstaEditando] = useState(false);
  const [mensajeExito, setMensajeExito] = useState(false);

  // Datos iniciales de la empresa (según las columnas de la tabla Empresa de Backend)
  const [datosEmpresa, setDatosEmpresa] = useState({
    nombre: 'Tech Solutions S.A.S.',
    nit: '901.458.932-1',
    sector: 'TECNOLOGIA',
    contacto: 'Carlos Mario Restrepo',
    correo: 'contacto@techsolutions.com',
    telefono: '3004567890',
    activa: true
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDatosEmpresa(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleGuardar = (e) => {
    e.preventDefault();
    setEstaEditando(false);
    setMensajeExito(true);
    setTimeout(() => setMensajeExito(false), 3500);
  };

  return (
    <div className="empresa-profile-card">
      <div className="profile-card-header">
        <div>
          <span className="modulo-tag">Tabla: Empresa · Mi Perfil</span>
          <h3 className="profile-title">{datosEmpresa.nombre}</h3>
        </div>
        <div className="profile-header-actions">
          <span className="badge-empresa-activa">
            {datosEmpresa.activa ? '✓ Empresa Activa' : 'Inactiva'}
          </span>
          {!estaEditando && (
            <button 
              type="button" 
              onClick={() => setEstaEditando(true)}
              className="btn-edit-perfil"
            >
              ✏️ Editar Datos
            </button>
          )}
        </div>
      </div>

      {mensajeExito && (
        <div className="alert-success">
          ✓ ¡Datos de la empresa actualizados exitosamente!
        </div>
      )}

      {estaEditando ? (
        /* Formulario para actualizar datos */
        <form onSubmit={handleGuardar} className="form-perfil-empresa">
          <div className="form-grid-empresa">
            <div className="form-group">
              <label>Razón Social / Nombre</label>
              <input
                type="text"
                name="nombre"
                value={datosEmpresa.nombre}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>NIT</label>
              <input
                type="text"
                name="nit"
                value={datosEmpresa.nit}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Sector Económico</label>
              <select
                name="sector"
                value={datosEmpresa.sector}
                onChange={handleChange}
                className="select-sector"
              >
                {SECTORES.map(sec => (
                  <option key={sec} value={sec}>{sec}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Persona de Contacto</label>
              <input
                type="text"
                name="contacto"
                value={datosEmpresa.contacto}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Correo Electrónico</label>
              <input
                type="email"
                name="correo"
                value={datosEmpresa.correo}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Teléfono de Contacto</label>
              <input
                type="tel"
                name="telefono"
                value={datosEmpresa.telefono}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-buttons-perfil">
            <button type="submit" className="btn-guardar-perfil">
              Guardar Cambios
            </button>
            <button 
              type="button" 
              onClick={() => setEstaEditando(false)} 
              className="btn-cancelar-perfil"
            >
              Cancelar
            </button>
          </div>
        </form>
      ) : (
        /* Vista de lectura de los datos de la empresa */
        <div className="perfil-datos-grid">
          <div className="dato-item">
            <span className="dato-label">NIT:</span>
            <span className="dato-valor">{datosEmpresa.nit}</span>
          </div>

          <div className="dato-item">
            <span className="dato-label">Sector Económico:</span>
            <span className="dato-valor sector-badge">{datosEmpresa.sector}</span>
          </div>

          <div className="dato-item">
            <span className="dato-label">Persona de Contacto:</span>
            <span className="dato-valor">{datosEmpresa.contacto}</span>
          </div>

          <div className="dato-item">
            <span className="dato-label">Correo Institucional:</span>
            <span className="dato-valor">{datosEmpresa.correo}</span>
          </div>

          <div className="dato-item">
            <span className="dato-label">Teléfono:</span>
            <span className="dato-valor">{datosEmpresa.telefono}</span>
          </div>

          <div className="dato-item">
            <span className="dato-label">Convenio CESDE:</span>
            <span className="dato-valor text-cesde-bold">Vigente 2026-2</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModuloMiEmpresa;
