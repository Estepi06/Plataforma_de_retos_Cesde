import React, { useState } from 'react';

// Lista de empresas aliadas que tienen retos en la plataforma CESDE
const EMPRESAS_INICIALES = [
  {
    id: 'emp-1',
    nombre: 'Bancolombia Tech Innovation',
    nit: '890.903.938-8',
    sector: 'TECNOLOGIA',
    contacto: 'Mariana Duque',
    correo: 'innovacion@bancolombia.com',
    telefono: '3104561234',
    retosAbiertos: 3,
    activa: true
  },
  {
    id: 'emp-2',
    nombre: 'Clínica Salud Integral S.A.',
    nit: '900.231.844-5',
    sector: 'SALUD',
    contacto: 'Dr. Alejandro Restrepo',
    correo: 'proyectos@saludintegral.com.co',
    telefono: '3128905678',
    retosAbiertos: 2,
    activa: true
  },
  {
    id: 'emp-3',
    nombre: 'Grupo Éxito Logística',
    nit: '890.900.608-9',
    sector: 'TRANSPORTE',
    contacto: 'Laura Camila Henao',
    correo: 'talento@exito.com',
    telefono: '3017654321',
    retosAbiertos: 2,
    activa: true
  },
  {
    id: 'emp-4',
    nombre: 'Sofka Technologies',
    nit: '900.543.210-3',
    sector: 'TECNOLOGIA',
    contacto: 'Andrés Felipe Morales',
    correo: 'challengers@sofka.com.co',
    telefono: '3159988776',
    retosAbiertos: 4,
    activa: true
  },
  {
    id: 'emp-5',
    nombre: 'Constructora Bolívar Antioquia',
    nit: '860.034.908-1',
    sector: 'CONSTRUCCION',
    contacto: 'Valentina Osorio',
    correo: 'innovacion@cbolivar.com',
    telefono: '3201122334',
    retosAbiertos: 1,
    activa: true
  }
];

export const DirectorioEmpresasEstudiante = () => {
  const [busqueda, setBusqueda] = useState('');
  const [sectorFiltro, setSectorFiltro] = useState('TODOS');
  const [mensajeRetos, setMensajeRetos] = useState('');

  // Filtrado por buscador y por sector
  const empresasFiltradas = EMPRESAS_INICIALES.filter(emp => {
    const coincideTexto = emp.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
                          emp.nit.includes(busqueda);
    const coincideSector = sectorFiltro === 'TODOS' || emp.sector === sectorFiltro;
    return coincideTexto && coincideSector;
  });

  const handleVerRetos = (nombreEmpresa) => {
    setMensajeRetos(`Mostrando retos de: ${nombreEmpresa}`);
    setTimeout(() => setMensajeRetos(''), 4000);
  };

  return (
    <div className="directorio-empresas-modulo">
      {/* Barra de Búsqueda y Filtros */}
      <div className="directorio-filtros-bar">
        <div className="buscador-input-box">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Buscar empresa por nombre o NIT..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="input-buscar-empresa"
          />
        </div>

        <select
          value={sectorFiltro}
          onChange={(e) => setSectorFiltro(e.target.value)}
          className="select-filtro-sector"
        >
          <option value="TODOS">Todos los Sectores</option>
          <option value="TECNOLOGIA">Tecnología</option>
          <option value="SALUD">Salud</option>
          <option value="TRANSPORTE">Transporte</option>
          <option value="CONSTRUCCION">Construcción</option>
          <option value="FINANZAS">Finanzas</option>
        </select>
      </div>

      {mensajeRetos && (
        <div className="alert-info-filtro">
          ℹ️ {mensajeRetos}. Puedes postularte a los retos de esta empresa en el catálogo de arriba.
        </div>
      )}

      {/* Cuadrícula de Empresas */}
      <div className="empresas-grid">
        {empresasFiltradas.length > 0 ? (
          empresasFiltradas.map(emp => (
            <div key={emp.id} className="empresa-card-estudiante">
              <div className="card-empresa-header">
                <div>
                  <span className="badge-sector-tag">{emp.sector}</span>
                  <h4 className="nombre-empresa">{emp.nombre}</h4>
                </div>
                <span className="badge-retos-count">
                  🎯 {emp.retosAbiertos} retos
                </span>
              </div>

              <div className="empresa-card-detalles">
                <p><strong>NIT:</strong> {emp.nit}</p>
                <p><strong>Contacto:</strong> {emp.contacto}</p>
                <p><strong>Correo:</strong> {emp.correo}</p>
              </div>

              <div className="empresa-card-footer">
                <span className="convenio-badge">✓ Aliado CESDE</span>
                <button
                  type="button"
                  onClick={() => handleVerRetos(emp.nombre)}
                  className="btn-ver-retos"
                >
                  Ver sus Retos
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="no-empresas-found">
            <p>No se encontraron empresas con ese criterio de búsqueda.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DirectorioEmpresasEstudiante;
