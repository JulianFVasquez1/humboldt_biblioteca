# 📚 Sistema Web de Búsqueda de Libros — Biblioteca Colegio Humboldt

Plataforma web estática moderna, rápida y accesible diseñada para que estudiantes, docentes y la comunidad educativa del **Colegio Humboldt** puedan explorar el catálogo bibliotecario, consultar disponibilidad y encontrar rápidamente la ubicación física de cualquier ejemplar en los estantes.

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
- 📍 **Modal interactivo de ubicación:** Detalle preciso de ubicación en estantería física:
  - **Estantería** (Ej. *Estantería A*)
  - **Sección** (Ej. *Juvenil*, *Clásicos Latinoamericanos*)
  - **Nivel** (Ej. *Nivel 2*)
- 📱 **Diseño 100% Adaptativo (Responsive):** Experiencia optimizada para computadores, tablets y teléfonos móviles con barra de navegación inferior (*Bottom Nav*) en pantallas compactas.
- ⚡ **Cero dependencias:** Funciona abriendo directamente `index.html` en cualquier navegador web sin necesidad de servidores, APIs externas ni configuraciones de compilación.

---

## 🛠️ Tecnologías Utilizadas

- **HTML5:** Estructura semántica accesible con soporte de etiquetas ARIA.
- **CSS3 Vanilla:** 
  - Tipografías: **Hanken Grotesk** (titulares y jerarquía) e **Inter** (cuerpo y datos).
  - Iconografía: **Material Symbols** y vectores **SVG** integrados.
  - Grid y Flexbox adaptativo con transiciones suaves.
- **JavaScript Vanilla (ES6+):** Lógica pura de búsqueda, filtrado reactivo, renderizado dinámico del DOM y control de modales.

---

## 📂 Estructura del Proyecto

```text
Humbolt_biblioteca/
│
├── index.html          # Estructura principal y componentes semánticos
├── styles.css          # Sistema de diseño, variables, grid y responsive
├── script.js           # Catálogo de datos, lógica de búsqueda, filtros y modales
├── README.md           # Documentación del proyecto
└── images/             # Activos gráficos
    ├── logo_bgn.png    # Logotipo institucional
    ├── cover-1.jpg     # Portadas ilustradas de libros
    ├── ...
    └── cover-11.jpg
```

---

## 💻 Instalación y Uso Local

No requiere NodeJS, gestores de paquetes (`npm`/`yarn`) ni base de datos externa.

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/JulianFVasquez1/humboldt_biblioteca.git
   ```
2. **Abrir el proyecto:**
   - Haz doble clic en `index.html` para abrirlo en tu navegador favorito (Chrome, Edge, Firefox, Safari).
   - O usa una extensión como *Live Server* en VS Code.

---


---

## 📝 Cómo Agregar o Modificar Libros

Para actualizar el catálogo, simplemente edita el arreglo `libros` dentro de [`script.js`](./script.js):

```javascript
{
    id: 19,
    titulo: "Nuevo Título de Ejemplo",
    autor: "Nombre del Autor",
    categoria: "Ciencias", // Literatura, Ciencias, Historia, Matemáticas, Filosofía, Arte, Tecnología, etc.
    editorial: "Editorial",
    anio: 2024,
    isbn: "978-XXXXXXXXXX",
    estado: "Disponible", // "Disponible" o "Prestado"
    imagen: "images/cover-19.jpg", // o null para usar portada temática automática
    ubicacion: {
        estanteria: "Estantería B",
        seccion: "Física General",
        nivel: "Nivel 2"
    }
}
```

Los filtros de categorías, autores y el buscador se adaptarán automáticamente a los nuevos datos.

---

## 🏫 Colegio Humboldt

*Un espacio para aprender, investigar y descubrir nuevas historias.*
