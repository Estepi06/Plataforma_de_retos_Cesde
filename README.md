# Plataforma de Retos e Innovación Empresarial (Frontend CESDE)

Proyecto Integrador III — CESDE (Nuevas Tecnologías de Programación)
**Entrega 1: React.js (Login, Registro, Dashboards CESDE y Rutas Privadas)**

---

## 📌 ¿Cómo ejecutar el proyecto?

1. Abre la terminal en esta carpeta (`Proyecto integrador FRONT`).
2. Para iniciar el servidor de desarrollo, ejecuta:
   ```bash
   npm run dev
   ```
   *(Si estás en PowerShell y te sale error de script por permisos de Windows, usa `npm.cmd run dev` o `cmd /c npm run dev`)*.
3. Abre en tu navegador la URL que te indique (usualmente `http://localhost:5173`).

---

## 🎨 Identidad Visual CESDE

El diseño ha sido adaptado a la línea gráfica oficial de **CESDE**:
* **Color Primario:** Rosa / Magenta institucional (`#d81e5b`).
* **Botones:** Estilo redondeado (pill buttons) tipo *"Inscríbete"*.
* **Barra superior oscura:** Acceso rápido institucional.

---

## 🚀 ¿Qué incluye esta Entrega 1?

1. **Página de Login (`/login`):**
   * Formulario con Correo, Contraseña y selección de Rol (**Empresa** o **Estudiante**).
   * **Botones de Acceso Rápido:** Permiten iniciar sesión con un solo clic como Empresa o como Estudiante para demostraciones rápidas ante el profesor.
2. **Página de Registro (`/registro`):**
   * Registro diferenciado para Empresas (con NIT) o Estudiantes/Participantes (con documento).
3. **Rutas Privadas (`RutaPrivada.jsx`):**
   * Cumple el requisito estricto: **Si un usuario intenta entrar a `/dashboard` sin haber iniciado sesión, es redirigido automáticamente a `/login`**.
4. **Dos Dashboards Diferenciados:**
   * **Dashboard de Empresa (`/dashboard/empresa`):** KPIs de retos publicados, categorías vinculadas, postulaciones recibidas y gestión empresarial.
   * **Dashboard de Estudiante (`/dashboard/estudiante`):** KPIs de retos disponibles, categorías abiertas, catálogo de retos y control de mis postulaciones.
5. **Espacios Modulares para las 4 Tablas del Equipo:**
   * Tabla `Empresa`
   * Tabla `Reto`
   * Tabla `Categoria`
   * Tabla `Registro`

---

## 👥 Credenciales Demo para Sustentación

Puedes pulsar los botones directos en el Login o usar estos datos:
* **Empresa:** `empresa@cesde.edu.co` / Contraseña: `123456`
* **Estudiante:** `estudiante@cesde.edu.co` / Contraseña: `123456`
