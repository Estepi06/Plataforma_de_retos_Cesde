// Mismos valores del script simular_categorias.py
export const CATEGORIAS = [
  "Logistica", "Tecnologia", "Educacion", "Economia", "Ecologia",
  "Nutricion", "Psicologia", "Musica", "Fotografia", "Geografia",
];

export const AREAS = [
  "OPERACIONES", "INNOVACION", "BIENESTAR", "FORMACION", "COMUNICACIONES",
];

// Solo para mostrar el nombre con tilde en pantalla
const ACENTOS = {
  Logistica: "Logística", Tecnologia: "Tecnología", Educacion: "Educación",
  Economia: "Economía", Ecologia: "Ecología", Nutricion: "Nutrición",
  Psicologia: "Psicología", Musica: "Música", Fotografia: "Fotografía",
  Geografia: "Geografía",
};

export const etiqueta = (nombre) => ACENTOS[nombre] || nombre;

// Columnas de la tabla categorias: id, nombre, descripcion, area_responsable
export const CATEGORIAS_INICIALES = [
  { id: "1", nombre: "Logistica", descripcion: "Retos de transporte, inventario y cadena de suministro.", area_responsable: "OPERACIONES" },
  { id: "2", nombre: "Tecnologia", descripcion: "Retos de software, datos e infraestructura.", area_responsable: "INNOVACION" },
  { id: "3", nombre: "Educacion", descripcion: "Retos de formación y aprendizaje.", area_responsable: "FORMACION" },
  { id: "4", nombre: "Economia", descripcion: "Retos financieros y de modelos de negocio.", area_responsable: "INNOVACION" },
  { id: "5", nombre: "Ecologia", descripcion: "Retos ambientales y de sostenibilidad.", area_responsable: "OPERACIONES" },
  { id: "6", nombre: "Nutricion", descripcion: "Retos de alimentación y salud.", area_responsable: "BIENESTAR" },
  { id: "7", nombre: "Psicologia", descripcion: "Retos de bienestar y comportamiento.", area_responsable: "BIENESTAR" },
  { id: "8", nombre: "Musica", descripcion: "Retos de producción y difusión musical.", area_responsable: "COMUNICACIONES" },
  { id: "9", nombre: "Fotografia", descripcion: "Retos de imagen y contenido visual.", area_responsable: "COMUNICACIONES" },
  { id: "10", nombre: "Geografia", descripcion: "Retos de territorio y mapas.", area_responsable: "OPERACIONES" },
];