# 📚 Sistema Web de Búsqueda de Libros — Biblioteca Colegio Humboldt

Plataforma web moderna, rápida y accesible diseñada para que estudiantes, docentes y la comunidad educativa del **Colegio Humboldt** puedan explorar el catálogo bibliotecario, consultar disponibilidad en tiempo real y encontrar rápidamente la ubicación física de cualquier ejemplar en los estantes.

---

## 🚀 Características Principales

- 🔍 **Buscador en tiempo real:** Búsqueda instantánea multi-criterio por título, autor, ISBN, categoría y editorial (insensible a mayúsculas y acentos).
- 🏷️ **Filtros combinados & Chips interactivos:**
  - Barra superior de desplazamiento horizontal con chips de acceso rápido por categoría.
  - Menús desplegables para filtrar por **Categoría**, **Autor** y **Estado** (*Disponible* / *Prestado*).
- 📖 **Catálogo visual estilo moderno:**
  - Tarjetas con formato 2:3 (estilo plataforma de streaming educativo).
  - Portadas ilustradas con respaldo visual automático por degradados temáticos.
  - Indicadores claros de estado en tiempo real (🟢 *Disponible* / 🔴 *Prestado*).
- 📦 **Control de Inventario y Copias:** Contador de copias totales y disponibles con botones directos para prestar o devolver ejemplares.
- 🔐 **Panel de Administración (CRUD Completo):**
  - Agregar nuevos libros con formulario guiado y previsualizador de imagen.
  - Editar datos, categorías y ubicaciones de cualquier ejemplar.
  - Eliminar libros con modal de confirmación segura.
- 📍 **Modal interactivo de ubicación:** Detalle preciso de ubicación en estantería física (*Estantería*, *Sección*, *Nivel*).
- ☁️ **Soporte de Base de Datos en la Nube (Supabase / PostgreSQL):** Conexión en tiempo real con sincronización automática y modo local de respaldo (*offline fallback*).
- 📱 **Diseño 100% Adaptativo (Responsive):** Experiencia optimizada para computadores, tablets y teléfonos móviles con barra de navegación inferior (*Bottom Nav*) en pantallas compactas.

---

## 🛠️ Tecnologías Utilizadas

- **HTML5:** Estructura semántica accesible con soporte de etiquetas ARIA.
- **CSS3 Vanilla:** 
  - Tipografías: **Hanken Grotesk** (titulares y jerarquía) e **Inter** (cuerpo y datos).
  - Iconografía: **Material Symbols** y vectores **SVG** integrados.
  - Grid y Flexbox adaptativo con variables y temas.
- **JavaScript Vanilla (ES6+):** Lógica pura de búsqueda, filtrado reactivo, renderizado dinámico del DOM y control de modales.
- **Supabase (PostgreSQL BaaS):** Base de datos en la nube gratuita, rápida y conectada directamente desde el cliente vía CDN.

---

## 📂 Estructura del Proyecto

```text
Humbolt_biblioteca/
│
├── index.html              # Estructura principal y componentes semánticos
├── styles.css              # Sistema de diseño, variables, grid y responsive
├── script.js               # Catálogo de datos, lógica de búsqueda, filtros, CRUD y modales
├── supabase.config.js      # Configuración y cliente de conexión con Supabase
├── supabase_schema.sql     # Script SQL para crear la base de datos en Supabase
├── README.md               # Documentación del proyecto
└── images/                 # Activos gráficos y portadas ilustradas
    ├── logo_bgn.png        # Logotipo institucional
    ├── cover-1.jpg         # Portadas ilustradas de libros (1 al 18)
    └── ...
```

---

## ⚡ Conexión a la Base de Datos Gratuita (Supabase)

La aplicación funciona inmediatamente en **Modo Local** (utilizando `localStorage`), pero para compartir el catálogo en la nube entre múltiples dispositivos y administradores, sigue estos 3 sencillos pasos:

### Paso 1: Crear proyecto en Supabase (Gratis)
1. Entra a [supabase.com](https://supabase.com) y regístrate con tu cuenta de GitHub o correo.
2. Haz clic en **"New Project"**, elige un nombre (ej. `humboldt-biblioteca`) y una contraseña de base de datos.

### Paso 2: Crear la tabla `libros`
1. En el menú lateral izquierdo de tu proyecto en Supabase, entra en **SQL Editor**.
2. Haz clic en **"New query"**.
3. Abre el archivo [`supabase_schema.sql`](./supabase_schema.sql), copia todo su contenido, pégalo en el editor y presiona **"Run"** (o `Ctrl + Enter`).
   *(Esto creará la tabla `libros`, los índices, las políticas de seguridad y precargará los 18 libros iniciales).*

### Paso 3: Pegar tus credenciales en `supabase.config.js`
1. En Supabase, ve a **Project Settings** (ícono de engranaje abajo a la izquierda) -> **API**.
2. Copia tu **Project URL** y tu **anon public key**.
3. Abre el archivo [`supabase.config.js`](./supabase.config.js) y reemplaza los valores:
   ```javascript
   const SUPABASE_CONFIG = {
       url: 'https://tu-proyecto.supabase.co',
       anonKey: 'tu-anon-key-aqui...'
   };
   ```
4. ¡Listo! Abre `index.html` y verás el badge **"Supabase Conectado"** 🟢 en el panel de administración.

---

## 💻 Instalación y Uso Local

No requiere NodeJS, gestores de paquetes (`npm`/`yarn`) ni servidores complejos.

1. **Clonar o descargar la carpeta del proyecto:**
   ```bash
   git clone https://github.com/JulianFVasquez1/humboldt_biblioteca.git
   ```
2. **Abrir el proyecto:**
   - Haz doble clic en `index.html` para abrirlo en cualquier navegador (Chrome, Edge, Firefox, Safari).
   - O usa una extensión como *Live Server* en VS Code.

---

## 🔐 Clave de Administrador

Para acceder al modo administrador (agregar, editar, eliminar libros o cambiar copias):
- Haz clic en **"Admin"** en la barra superior.
- Contraseña por defecto: `admin123` (o `humboldt2025`).

---

## 🏫 Colegio Humboldt

*Un espacio para aprender, investigar y descubrir nuevas historias.*
