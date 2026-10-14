import React, { createContext, useContext, useState, useEffect } from 'react';
import { CATEGORIAS } from '../components/categoriasData';

// Contexto central para la tabla RETO
const RetosContext = createContext();

// Retos iniciales basados en problemas reales del Banco de Innovación CESDE
// Conectados con las categorías oficiales de categoriasData.jsx
export const RETOS_INICIALES = [
  {
    id: 'reto-1',
    nombre: 'Optimización de Enrutamiento y Despachos de Última Milla',
    descripcion: 'Diseñar un algoritmo o modelo analítico que optimice los tiempos de entrega de pedidos y reduzca las emisiones en las rutas metropolitanas del Valle de Aburrá.',
    categoria: 'Logistica',
    empresa: 'Tech Solutions S.A.S.',
    requisitos: 'Conocimientos en Python, análisis de grafos o algoritmos de enrutamiento.',
    fecha_inicio: '2026-10-01',
    fecha_fin: '2026-11-30',
    estado: 'ABIERTO', // ABIERTO, EN_PROGRESO, COMPLETADO, CERRADO
    prioridad: 'ALTA',
    postulados: 4
  },
  {
    id: 'reto-2',
    nombre: 'Detección de Patrones Atípicos y Fraude Transaccional',
    descripcion: 'Construir un prototipo predictivo para clasificar microtransacciones sospechosas y prevenir fraudes en billeteras digitales.',
    categoria: 'Tecnologia',
    empresa: 'Bancolombia Tech Innovation',
    requisitos: 'Machine Learning, Pandas, Scikit-Learn o visualización en Dashboards.',
    fecha_inicio: '2026-09-15',
    fecha_fin: '2026-12-15',
    estado: 'ABIERTO',
    prioridad: 'ALTA',
    postulados: 7
  },
  {
    id: 'reto-3',
    nombre: 'Tutor Inteligente y Rutas de Aprendizaje Personalizadas',
    descripcion: 'Desarrollar un sistema de recomendación pedagógica que identifique vacíos de conceptos en programación y proponga actividades de refuerzo adaptativas.',
    categoria: 'Educacion',
    empresa: 'Tech Solutions S.A.S.',
    requisitos: 'React, consumo de APIs, analítica de aprendizaje o diseño UX/UI.',
    fecha_inicio: '2026-10-05',
    fecha_fin: '2026-11-20',
    estado: 'ABIERTO',
    prioridad: 'MEDIA',
    postulados: 5
  },
  {
    id: 'reto-4',
    nombre: 'Dashboard de Proyecciones de Flujo de Caja para Microempresas',
    descripcion: 'Crear una herramienta intuitiva que permita a tenderos y micronegocios registrar ingresos/egresos y proyectar su liquidez a 30 días.',
    categoria: 'Economia',
    empresa: 'Tech Solutions S.A.S.',
    requisitos: 'Modelos financieros básicos, manipulación de datos o dashboards interactivos.',
    fecha_inicio: '2026-09-20',
    fecha_fin: '2026-12-05',
    estado: 'ABIERTO',
    prioridad: 'MEDIA',
    postulados: 3
  },
  {
    id: 'reto-5',
    nombre: 'Monitoreo de Huella de Carbono y Residuos en Construcción',
    descripcion: 'Implementar un panel de trazabilidad y métricas de consumo de agua, escombros y reciclaje para obras civiles sostenibles.',
    categoria: 'Ecologia',
    empresa: 'Constructora Bolívar Antioquia',
    requisitos: 'Indicadores ambientales, formularios de captura y visualización gráfica.',
    fecha_inicio: '2026-10-10',
    fecha_fin: '2026-11-25',
    estado: 'ABIERTO',
    prioridad: 'ALTA',
    postulados: 2
  },
  {
    id: 'reto-6',
    nombre: 'Automatización de Recordatorios y Adherencia Nutricional',
    descripcion: 'Diseñar una solución de seguimiento a planes alimentarios para pacientes crónicos que disminuya el ausentismo en controles.',
    categoria: 'Nutricion',
    empresa: 'Clínica Salud Integral S.A.',
    requisitos: 'Flujo de usuarios, automatización de mensajería o análisis de datos de salud.',
    fecha_inicio: '2026-10-08',
    fecha_fin: '2026-12-10',
    estado: 'ABIERTO',
    prioridad: 'MEDIA',
    postulados: 6
  },
  {
    id: 'reto-7',
    nombre: 'Diagnóstico Preventivo de Estrés y Desgaste Estudiantil',
    descripcion: 'Diseño de un instrumento analítico para evaluar señales tempranas de sobrecarga académica y recomendar pausas activas o acompañamiento.',
    categoria: 'Psicologia',
    empresa: 'Tech Solutions S.A.S.',
    requisitos: 'Estadística descriptiva, encuestas estructuradas, visualización amigable.',
    fecha_inicio: '2026-10-02',
    fecha_fin: '2026-12-01',
    estado: 'ABIERTO',
    prioridad: 'MEDIA',
    postulados: 2
  },
  {
    id: 'reto-8',
    nombre: 'Catalogación Digital y Preservación de Archivo Sonoro',
    descripcion: 'Crear un módulo de metadatos, tags y reproducción para clasificar registros musicales tradicionales de Antioquia.',
    categoria: 'Musica',
    empresa: 'Sofka Technologies',
    requisitos: 'Gestión de metadatos, frontend multimedia o arquitectura de datos.',
    fecha_inicio: '2026-09-25',
    fecha_fin: '2026-11-18',
    estado: 'ABIERTO',
    prioridad: 'BAJA',
    postulados: 1
  },
  {
    id: 'reto-9',
    nombre: 'Mapeo Territorial y Visualización de Zonas de Riesgo',
    descripcion: 'Integrar datos geoespaciales abiertos para mapear cuencas hidrográficas con riesgo de desbordamiento en temporadas de lluvia.',
    categoria: 'Geografia',
    empresa: 'Tech Solutions S.A.S.',
    requisitos: 'Manejo de coordenadas, mapas interactivos (Leaflet/Mapbox) o geo-análisis.',
    fecha_inicio: '2026-10-12',
    fecha_fin: '2026-12-20',
    estado: 'ABIERTO',
    prioridad: 'ALTA',
    postulados: 0
  }
];

export const RetosProvider = ({ children }) => {
  // Estado de los retos con persistencia en localStorage
  const [retos, setRetos] = useState(() => {
    const guardados = localStorage.getItem('retos_banco_cesde');
    return guardados ? JSON.parse(guardados) : RETOS_INICIALES;
  });

  // Estado de las postulaciones (id_estudiante -> retoId)
  const [postulaciones, setPostulaciones] = useState(() => {
    const guardadas = localStorage.getItem('postulaciones_cesde');
    return guardadas ? JSON.parse(guardadas) : [
      {
        id: 'post-1',
        retoId: 'reto-1',
        estudianteId: 'demo-estudiante',
        nombreEstudiante: 'Esteban - Participante',
        fecha: '2026-10-10',
        estado: 'EN_REVISION'
      },
      {
        id: 'post-2',
        retoId: 'reto-2',
        estudianteId: 'demo-estudiante',
        nombreEstudiante: 'Esteban - Participante',
        fecha: '2026-10-11',
        estado: 'ACEPTADA'
      }
    ];
  });

  // Guardar en localStorage
  useEffect(() => {
    localStorage.setItem('retos_banco_cesde', JSON.stringify(retos));
  }, [retos]);

  useEffect(() => {
    localStorage.setItem('postulaciones_cesde', JSON.stringify(postulaciones));
  }, [postulaciones]);

  // 1. Crear nuevo reto (Dashboard Empresa)
  const publicarReto = (datosReto, nombreEmpresa = 'Tech Solutions S.A.S.') => {
    const nuevoReto = {
      id: `reto-${Date.now()}`,
      nombre: datosReto.nombre.trim(),
      descripcion: datosReto.descripcion.trim(),
      categoria: datosReto.categoria || CATEGORIAS[0],
      empresa: nombreEmpresa,
      requisitos: datosReto.requisitos?.trim() || 'Estudiantes CESDE de cualquier programa con ganas de innovar.',
      fecha_inicio: datosReto.fecha_inicio || new Date().toISOString().split('T')[0],
      fecha_fin: datosReto.fecha_fin || '2026-12-31',
      estado: datosReto.estado || 'ABIERTO',
      prioridad: datosReto.prioridad || 'MEDIA',
      postulados: 0
    };

    setRetos((prev) => [nuevoReto, ...prev]);
    return nuevoReto;
  };

  // 2. Actualizar reto existente
  const actualizarReto = (id, datosActualizados) => {
    setRetos((prev) =>
      prev.map((r) => (r.id === id ? { ...r, ...datosActualizados } : r))
    );
  };

  // 3. Eliminar reto
  const eliminarReto = (id) => {
    setRetos((prev) => prev.filter((r) => r.id !== id));
    // Eliminar también postulaciones asociadas
    setPostulaciones((prev) => prev.filter((p) => p.retoId !== id));
  };

  // 4. Cambiar estado rápido de un reto (ABIERTO, EN_PROGRESO, COMPLETADO, CERRADO)
  const cambiarEstadoReto = (id, nuevoEstado) => {
    setRetos((prev) =>
      prev.map((r) => (r.id === id ? { ...r, ...datosActualizados(r, nuevoEstado) } : r))
    );
  };

  const datosActualizados = (reto, nuevoEstado) => ({
    estado: nuevoEstado
  });

  // 5. Postularse a un reto (Dashboard Estudiante)
  const postularmeAReto = (retoId, estudiante) => {
    const yaInscrito = postulaciones.some(
      (p) => p.retoId === retoId && p.estudianteId === (estudiante?.id || 'demo-estudiante')
    );

    if (yaInscrito) {
      return { exito: false, mensaje: 'Ya te has postulado a este reto.' };
    }

    const nuevaPostulacion = {
      id: `post-${Date.now()}`,
      retoId,
      estudianteId: estudiante?.id || 'demo-estudiante',
      nombreEstudiante: estudiante?.nombre || 'Estudiante CESDE',
      fecha: new Date().toISOString().split('T')[0],
      estado: 'EN_REVISION'
    };

    setPostulaciones((prev) => [nuevaPostulacion, ...prev]);

    // Incrementar contador de postulados en el reto
    setRetos((prev) =>
      prev.map((r) => (r.id === retoId ? { ...r, postulados: (r.postulados || 0) + 1 } : r))
    );

    return { exito: true, mensaje: '¡Postulación exitosa! La empresa revisará tu registro.' };
  };

  // 6. Cancelar postulación
  const cancelarPostulacion = (retoId, estudianteId = 'demo-estudiante') => {
    setPostulaciones((prev) =>
      prev.filter((p) => !(p.retoId === retoId && p.estudianteId === estudianteId))
    );

    // Disminuir contador de postulados en el reto
    setRetos((prev) =>
      prev.map((r) =>
        r.id === retoId ? { ...r, postulados: Math.max(0, (r.postulados || 1) - 1) } : r
      )
    );

    return { exito: true, mensaje: 'Has cancelado tu postulación a este reto.' };
  };

  // 7. Helpers de consulta
  const estaPostulado = (retoId, estudianteId = 'demo-estudiante') => {
    return postulaciones.some(
      (p) => p.retoId === retoId && p.estudianteId === estudianteId
    );
  };

  const obtenerRetosEmpresa = (nombreEmpresa = 'Tech Solutions S.A.S.') => {
    return retos.filter(
      (r) => r.empresa.toLowerCase() === nombreEmpresa.toLowerCase()
    );
  };

  const obtenerPostulacionesEstudiante = (estudianteId = 'demo-estudiante') => {
    const misPosts = postulaciones.filter((p) => p.estudianteId === estudianteId);
    return misPosts.map((p) => {
      const reto = retos.find((r) => r.id === p.retoId);
      return {
        ...p,
        reto
      };
    }).filter((p) => p.reto !== undefined);
  };

  // Reiniciar a valores iniciales si se desea
  const reiniciarDatos = () => {
    setRetos(RETOS_INICIALES);
    setPostulaciones([]);
    localStorage.removeItem('retos_banco_cesde');
    localStorage.removeItem('postulaciones_cesde');
  };

  return (
    <RetosContext.Provider
      value={{
        retos,
        postulaciones,
        publicarReto,
        actualizarReto,
        eliminarReto,
        cambiarEstadoReto,
        postularmeAReto,
        cancelarPostulacion,
        estaPostulado,
        obtenerRetosEmpresa,
        obtenerPostulacionesEstudiante,
        reiniciarDatos
      }}
    >
      {children}
    </RetosContext.Provider>
  );
};

export const useRetos = () => {
  const context = useContext(RetosContext);
  if (!context) {
    throw new Error('useRetos debe ser usado dentro de un RetosProvider');
  }
  return context;
};

export default RetosContext;
