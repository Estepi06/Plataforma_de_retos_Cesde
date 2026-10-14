// Datos de ejemplo para la tabla REGISTRO (aún no hay backend).
// Columnas de registro: id, id_reto, id_estudiante, fecha_inscripcion, estado
// Los campos reto/estudiante simulan el JOIN que hará el backend.
// Cuando exista la API, reemplazar estas listas por un fetch.

export const ESTADOS = {
  PENDIENTE: 'Pendiente',
  ACEPTADO: 'Aceptado',
  RECHAZADO: 'Rechazado',
};

// Estudiantes postulados a los retos de la empresa
export const POSTULACIONES_INICIALES = [
  {
    id: 'reg-10',
    fecha_inscripcion: '2026-10-03',
    estado: 'PENDIENTE',
    estudiante: { nombre: 'Camila Restrepo', correo: 'camila.restrepo@cesde.net' },
    reto: { titulo: 'Optimización de Logística y Rutas', categoria: 'Logistica' },
  },
  {
    id: 'reg-11',
    fecha_inscripcion: '2026-10-05',
    estado: 'ACEPTADO',
    estudiante: { nombre: 'Juan Sebastián Osorio', correo: 'juan.osorio@cesde.net' },
    reto: { titulo: 'Optimización de Logística y Rutas', categoria: 'Logistica' },
  },
  {
    id: 'reg-12',
    fecha_inscripcion: '2026-10-08',
    estado: 'PENDIENTE',
    estudiante: { nombre: 'Valeria Gómez', correo: 'valeria.gomez@cesde.net' },
    reto: { titulo: 'Dashboard Financiero para Microempresas', categoria: 'Economia' },
  },
  {
    id: 'reg-13',
    fecha_inscripcion: '2026-10-11',
    estado: 'RECHAZADO',
    estudiante: { nombre: 'Andrés Londoño', correo: 'andres.londono@cesde.net' },
    reto: { titulo: 'Dashboard Financiero para Microempresas', categoria: 'Economia' },
  },
];

// Colores del estado (inline para no tocar index.css)
export const COLOR_ESTADO = {
  PENDIENTE: { background: '#fef3c7', color: '#b45309' },
  ACEPTADO: { background: '#dcfce7', color: '#15803d' },
  RECHAZADO: { background: '#fee2e2', color: '#b91c1c' },
};

export const formatearFecha = (iso) =>
  new Date(`${iso}T00:00:00`).toLocaleDateString('es-CO', {
    day: '2-digit', month: 'short', year: 'numeric',
  });
