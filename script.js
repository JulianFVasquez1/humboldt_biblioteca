/**
 * ============================================================
 * BIBLIOTECA COLEGIO HUMBOLDT — script.js
 * Sistema de búsqueda y filtrado de libros
 * ============================================================
 *
 * ESTRUCTURA:
 *  1. Datos del catálogo (array `libros`)
 *  2. Referencias al DOM
 *  3. Inicialización
 *  4. Funciones de renderizado
 *  5. Funciones de búsqueda y filtros
 *  6. Funciones del modal de ubicación
 *  7. Funciones de utilidad
 *  8. Event listeners
 *
 * Para actualizar el catálogo, modifica únicamente el array
 * `libros` al inicio de este archivo.
 * ============================================================
 */

/* ============================================================
   1. DATOS DEL CATÁLOGO
   ============================================================
   Reemplaza este array con el catálogo real cuando esté disponible.
   Cada libro debe seguir exactamente esta estructura.
*/
const libros = [
    {
        id: 1,
        titulo: "El Principito",
        autor: "Antoine de Saint-Exupéry",
        categoria: "Literatura",
        editorial: "Salamandra",
        anio: 1943,
        isbn: "978-0156012195",
        estado: "Disponible",
        imagen: "images/cover-1.jpg",
        ubicacion: {
            estanteria: "Estantería A",
            seccion: "Juvenil",
            nivel: "Nivel 2"
        }
    },
    {
        id: 2,
        titulo: "Cien años de soledad",
        autor: "Gabriel García Márquez",
        categoria: "Literatura",
        editorial: "Sudamericana",
        anio: 1967,
        isbn: "978-0307474728",
        estado: "Prestado",
        imagen: "images/cover-2.jpg",
        ubicacion: {
            estanteria: "Estantería A",
            seccion: "Clásicos Latinoamericanos",
            nivel: "Nivel 3"
        }
    },
    {
        id: 3,
        titulo: "Sapiens: De animales a dioses",
        autor: "Yuval Noah Harari",
        categoria: "Historia",
        editorial: "Debate",
        anio: 2011,
        isbn: "978-9584255181",
        estado: "Disponible",
        imagen: "images/cover-3.jpg",
        ubicacion: {
            estanteria: "Estantería C",
            seccion: "Historia Universal",
            nivel: "Nivel 1"
        }
    },
    {
        id: 4,
        titulo: "El universo en una cáscara de nuez",
        autor: "Stephen Hawking",
        categoria: "Ciencias",
        editorial: "Crítica",
        anio: 2001,
        isbn: "978-8484327653",
        estado: "Disponible",
        imagen: "images/cover-4.jpg",
        ubicacion: {
            estanteria: "Estantería B",
            seccion: "Física y Astronomía",
            nivel: "Nivel 1"
        }
    },
    {
        id: 5,
        titulo: "Don Quijote de la Mancha",
        autor: "Miguel de Cervantes",
        categoria: "Literatura",
        editorial: "Alfaguara",
        anio: 1605,
        isbn: "978-8420412146",
        estado: "Prestado",
        imagen: "images/cover-5.jpg",
        ubicacion: {
            estanteria: "Estantería A",
            seccion: "Clásicos",
            nivel: "Nivel 2"
        }
    },
    {
        id: 6,
        titulo: "Brevísima historia del tiempo",
        autor: "Stephen Hawking",
        categoria: "Ciencias",
        editorial: "Crítica",
        anio: 2005,
        isbn: "978-8484326113",
        estado: "Disponible",
        imagen: "images/cover-6.jpg",
        ubicacion: {
            estanteria: "Estantería B",
            seccion: "Física y Astronomía",
            nivel: "Nivel 2"
        }
    },
    {
        id: 7,
        titulo: "Cálculo: Una variable",
        autor: "James Stewart",
        categoria: "Matemáticas",
        editorial: "Cengage Learning",
        anio: 2015,
        isbn: "978-6075193274",
        estado: "Disponible",
        imagen: "images/cover-7.jpg",
        ubicacion: {
            seccion: "Matemáticas",
            nivel: "Nivel 1"
        }
    },
    {
        id: 8,
        titulo: "La república",
        autor: "Platón",
        categoria: "Filosofía",
        editorial: "Gredos",
        anio: 2000,
        isbn: "978-8424922597",
        estado: "Prestado",
        imagen: "images/cover-8.jpg",
        ubicacion: {
            seccion: "Filosofía Clásica",
            nivel: "Nivel 3"
        }
    },
    {
        id: 9,
        titulo: "Historia del arte",
        autor: "E.H. Gombrich",
        categoria: "Arte",
        editorial: "Phaidon",
        anio: 1950,
        isbn: "978-0714832470",
        estado: "Disponible",
        imagen: "images/cover-9.jpg",
        ubicacion: {
            seccion: "Arte y Cultura",
            nivel: "Nivel 2"
        }
    },
    {
        id: 10,
        titulo: "El mundo de Sofía",
        autor: "Jostein Gaarder",
        categoria: "Filosofía",
        editorial: "Siruela",
        anio: 1991,
        isbn: "978-8478442089",
        estado: "Disponible",
        imagen: "images/cover-10.jpg",
        ubicacion: {
            seccion: "Filosofía Juvenil",
            nivel: "Nivel 1"
        }
    },
    {
        id: 11,
        titulo: "1984",
        autor: "George Orwell",
        categoria: "Literatura",
        editorial: "Debolsillo",
        anio: 1949,
        isbn: "978-8497592011",
        estado: "Prestado",
        imagen: "images/cover-11.jpg",
        ubicacion: {
            seccion: "Distopías",
            nivel: "Nivel 4"
        }
    },
    {
        id: 12,
        titulo: "Código limpio",
        autor: "Robert C. Martin",
        categoria: "Tecnología",
        editorial: "Anaya",
        anio: 2009,
        isbn: "978-8441532106",
        estado: "Disponible",
        imagen: null,
        ubicacion: {
            seccion: "Programación",
            nivel: "Nivel 1"
        }
    },
    {
        id: 13,
        titulo: "Física conceptual",
        autor: "Paul Hewitt",
        categoria: "Ciencias",
        editorial: "Pearson",
        anio: 2016,
        isbn: "978-6073240222",
        estado: "Disponible",
        imagen: null,
        ubicacion: {
            seccion: "Física General",
            nivel: "Nivel 3"
        }
    },
    {
        id: 14,
        titulo: "La metamorfosis",
        autor: "Franz Kafka",
        categoria: "Literatura",
        editorial: "Alianza",
        anio: 1915,
        isbn: "978-8420604022",
        estado: "Disponible",
        imagen: null,
        ubicacion: {
            seccion: "Literatura Europea",
            nivel: "Nivel 1"
        }
    },
    {
        id: 15,
        titulo: "Álgebra lineal y sus aplicaciones",
        autor: "Gilbert Strang",
        categoria: "Matemáticas",
        editorial: "Cengage",
        anio: 2009,
        isbn: "978-6074814989",
        estado: "Prestado",
        imagen: null,
        ubicacion: {
            seccion: "Matemáticas",
            nivel: "Nivel 2"
        }
    },
    {
        id: 16,
        titulo: "El arte de la guerra",
        autor: "Sun Tzu",
        categoria: "Historia",
        editorial: "Edaf",
        anio: 500,
        isbn: "978-8441432468",
        estado: "Disponible",
        imagen: null,
        ubicacion: {
            seccion: "Historia Antigua",
            nivel: "Nivel 2"
        }
    },
    {
        id: 17,
        titulo: "Crónica de una muerte anunciada",
        autor: "Gabriel García Márquez",
        categoria: "Literatura",
        editorial: "Sudamericana",
        anio: 1981,
        isbn: "978-0307387738",
        estado: "Disponible",
        imagen: null,
        ubicacion: {
            seccion: "Clásicos Latinoamericanos",
            nivel: "Nivel 3"
        }
    },
    {
        id: 18,
        titulo: "Introducción a la programación con Python",
        autor: "John Zelle",
        categoria: "Tecnología",
        editorial: "Franklin, Beedle & Associates",
        anio: 2010,
        isbn: "978-1590282755",
        estado: "Prestado",
        imagen: null,
        ubicacion: {
            seccion: "Programación",
            nivel: "Nivel 2"
        }
    }
];

/* ============================================================
   2. REFERENCIAS AL DOM
   ============================================================ */
const campoBusqueda    = document.getElementById('campoBusqueda');
const btnBuscar        = document.getElementById('btnBuscar');
const btnLimpiar       = document.getElementById('btnLimpiar');
const btnTodos         = document.getElementById('btnTodos');
const btnVerTodos      = document.getElementById('btnVerTodos');
const librosGrid       = document.getElementById('librosGrid');
const sinResultados    = document.getElementById('sinResultados');
const contadorEl       = document.getElementById('contadorResultados');
const filtroCategoria  = document.getElementById('filtroCategoria');
const filtroAutor      = document.getElementById('filtroAutor');
const filtroEstado     = document.getElementById('filtroEstado');
const modalOverlay     = document.getElementById('modalOverlay');
const modalLibroNombre = document.getElementById('modalLibroNombre');
const modalUbicacion   = document.getElementById('modalUbicacion');
const modalCerrar      = document.getElementById('modalCerrar');
const modalBtnCerrar   = document.getElementById('modalBtnCerrar');
const menuToggle       = document.getElementById('menuToggle');
const mobileMenu       = document.getElementById('mobileMenu');

/* ============================================================
   3. INICIALIZACIÓN
   ============================================================ */
function inicializar() {
    poblarFiltros();
    renderizarLibros(libros);
    actualizarContador(libros.length);
}

/* ============================================================
   4. FUNCIONES DE RENDERIZADO
   ============================================================ */

/**
 * Genera el HTML de las tarjetas de libro y las inserta en el grid.
 * @param {Array} lista - Array filtrado de libros a mostrar
 */
function renderizarLibros(lista) {
    // Limpiar el grid antes de renderizar
    librosGrid.innerHTML = '';

    if (lista.length === 0) {
        mostrarSinResultados(true);
        return;
    }

    mostrarSinResultados(false);

    lista.forEach(function(libro, indice) {
        const tarjeta = crearTarjeta(libro, indice);
        librosGrid.appendChild(tarjeta);
    });
}

/**
 * Crea el elemento DOM de una tarjeta de libro.
 * @param {Object} libro - Objeto con los datos del libro
 * @param {number} indice - Índice para escalonar la animación
 * @returns {HTMLElement} - El elemento de la tarjeta
 */
function crearTarjeta(libro, indice) {
    const card = document.createElement('div');
    card.className = 'libro-card';
    card.setAttribute('role', 'listitem');
    // Escalonar la animación para que aparezcan en cascada
    card.style.animationDelay = (indice * 40) + 'ms';

    const esDisponible = libro.estado === 'Disponible';
    const claseEstado  = esDisponible ? 'estado--disponible' : 'estado--prestado';
    const iconoEstado  = esDisponible ? '🟢' : '🔴';
    const clasePortion = obtenerClasePortada(libro.categoria);
    // Iniciales del título para mostrar en la portada (solo si no hay imagen)
    const iniciales    = obtenerIniciales(libro.titulo);

    // Contenido de la portada: imagen real o gradiente con iniciales
    const portadaHTML = libro.imagen
        ? `<img
                src="${libro.imagen}"
                alt="Portada de ${escaparHTML(libro.titulo)}"
                class="libro-card__portada-img"
                loading="lazy"
                onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';"
           >
           <span class="libro-card__portada-letras" style="display:none;">${iniciales}</span>`
        : `<span class="libro-card__portada-letras">${iniciales}</span>`;

    card.innerHTML = `
        <div class="libro-card__portada ${libro.imagen ? 'portada--con-imagen' : clasePortion}">
            ${portadaHTML}
            <span class="libro-card__estado-badge ${claseEstado}">
                ${iconoEstado} ${libro.estado}
            </span>
        </div>

        <div class="libro-card__cuerpo">
            <span class="libro-card__categoria-tag">${libro.categoria}</span>
            <h3 class="libro-card__titulo">${escaparHTML(libro.titulo)}</h3>
            <p class="libro-card__autor">${escaparHTML(libro.autor)}</p>

            <div class="libro-card__meta">
                <span class="libro-card__meta-item">Editorial: <span>${escaparHTML(libro.editorial)}</span></span>
                <span class="libro-card__meta-item">Año: <span>${libro.anio}</span></span>
            </div>

            <p class="libro-card__isbn">ISBN: ${escaparHTML(libro.isbn)}</p>

            <div class="libro-card__acciones">
                ${esDisponible
                    ? `<button
                            class="btn btn--ubicacion"
                            id="btn-ubicacion-${libro.id}"
                            onclick="mostrarUbicacion(${libro.id})"
                            aria-label="Ver ubicación de ${escaparHTML(libro.titulo)}"
                       >
                           🗺️ Ver ubicación
                       </button>`
                    : `<p style="font-size:0.78rem; color:var(--error); font-weight:600; margin-top:auto; text-align:center;">
                           🔴 Actualmente prestado
                       </p>`
                }
            </div>
        </div>
    `;

    return card;
}

/**
 * Llena los selectores de filtro con los valores únicos del catálogo.
 * Debe llamarse una sola vez durante la inicialización.
 */
function poblarFiltros() {
    // Obtener valores únicos y ordenados
    const categorias = [...new Set(libros.map(l => l.categoria))].sort();
    const autores    = [...new Set(libros.map(l => l.autor))].sort();

    // Llenar select de categorías
    categorias.forEach(function(cat) {
        const option = document.createElement('option');
        option.value = cat;
        option.textContent = cat;
        filtroCategoria.appendChild(option);
    });

    // Llenar select de autores
    autores.forEach(function(autor) {
        const option = document.createElement('option');
        option.value = autor;
        option.textContent = autor;
        filtroAutor.appendChild(option);
    });
}

/* ============================================================
   5. BÚSQUEDA Y FILTROS
   ============================================================ */

/**
 * Punto de entrada principal: lee el texto del input y los
 * filtros activos, aplica ambos y actualiza la UI.
 */
function filtrarYRenderizar() {
    const termino    = campoBusqueda.value.toLowerCase().trim();
    const categoria  = filtroCategoria.value;
    const autor      = filtroAutor.value;
    const estado     = filtroEstado.value;

    // Mostrar u ocultar botón de limpiar
    btnLimpiar.style.display = termino ? 'flex' : 'none';

    let resultado = libros;

    // Aplicar búsqueda por texto
    if (termino) {
        resultado = resultado.filter(function(libro) {
            return (
                libro.titulo.toLowerCase().includes(termino)    ||
                libro.autor.toLowerCase().includes(termino)     ||
                libro.isbn.toLowerCase().includes(termino)      ||
                libro.categoria.toLowerCase().includes(termino) ||
                libro.editorial.toLowerCase().includes(termino)
            );
        });
    }

    // Aplicar filtro de categoría
    if (categoria) {
        resultado = resultado.filter(l => l.categoria === categoria);
    }

    // Aplicar filtro de autor
    if (autor) {
        resultado = resultado.filter(l => l.autor === autor);
    }

    // Aplicar filtro de estado
    if (estado) {
        resultado = resultado.filter(l => l.estado === estado);
    }

    renderizarLibros(resultado);
    actualizarContador(resultado.length);
}

/**
 * Filtra los libros al hacer clic en un chip de categoría (scroll horizontal).
 * Se integra con los filtros existentes manteniendo la búsqueda activa.
 * @param {string} categoria - Categoría a filtrar. Vacío = todos.
 */
function filtrarPorChip(categoria) {
    // Actualizar estado visual de los chips
    document.querySelectorAll('.chip').forEach(function(chip) {
        chip.classList.remove('activo');
    });

    // Activar el chip seleccionado
    const chipActivo = categoria
        ? document.getElementById('chip-' + categoria.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/\s+/g, ''))
        : document.getElementById('chip-todos');
    if (chipActivo) chipActivo.classList.add('activo');

    // Sincronizar con el select de filtro de categoría
    filtroCategoria.value = categoria;

    // Aplicar búsqueda + filtros
    filtrarYRenderizar();

    // Scroll suave al catálogo
    document.getElementById('catalogo').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

/**
 * Restablece la búsqueda, los filtros y muestra todos los libros.
 */
function limpiarBusqueda() {
    campoBusqueda.value = '';
    filtroCategoria.value = '';
    filtroAutor.value = '';
    filtroEstado.value = '';
    btnLimpiar.style.display = 'none';

    // Resetear chips: activar "Todos"
    document.querySelectorAll('.chip').forEach(function(chip) {
        chip.classList.remove('activo');
    });
    const chipTodos = document.getElementById('chip-todos');
    if (chipTodos) chipTodos.classList.add('activo');

    renderizarLibros(libros);
    actualizarContador(libros.length);
    campoBusqueda.focus();
}

/* ============================================================
   6. MODAL DE UBICACIÓN
   ============================================================ */

/**
 * Abre el modal mostrando la ubicación del libro indicado.
 * @param {number} id - ID del libro a consultar
 */
function mostrarUbicacion(id) {
    const libro = libros.find(l => l.id === id);
    if (!libro) return;

    // Actualizar contenido del modal
    modalLibroNombre.textContent = '"' + libro.titulo + '"';

    modalUbicacion.innerHTML = `
        <div class="ubicacion-fila">
            <span class="ubicacion-fila__icono">📚</span>
            <div>
                <p class="ubicacion-fila__label">Estantería</p>
                <p class="ubicacion-fila__valor">${escaparHTML(libro.ubicacion.estanteria)}</p>
            </div>
        </div>
        <div class="ubicacion-fila">
            <span class="ubicacion-fila__icono">🗂️</span>
            <div>
                <p class="ubicacion-fila__label">Sección</p>
                <p class="ubicacion-fila__valor">${escaparHTML(libro.ubicacion.seccion)}</p>
            </div>
        </div>
        <div class="ubicacion-fila">
            <span class="ubicacion-fila__icono">🔢</span>
            <div>
                <p class="ubicacion-fila__label">Nivel</p>
                <p class="ubicacion-fila__valor">${escaparHTML(libro.ubicacion.nivel)}</p>
            </div>
        </div>
    `;

    // Mostrar modal
    modalOverlay.style.display = 'flex';
    document.body.style.overflow = 'hidden'; // Evitar scroll del fondo
}

/**
 * Cierra el modal de ubicación.
 */
function cerrarModal() {
    modalOverlay.style.display = 'none';
    document.body.style.overflow = '';
}

/* ============================================================
   7. FUNCIONES DE UTILIDAD
   ============================================================ */

/**
 * Actualiza el texto del contador de resultados.
 * @param {number} cantidad - Número de libros encontrados
 */
function actualizarContador(cantidad) {
    const texto = cantidad === 1
        ? '1 libro encontrado'
        : cantidad + ' libros encontrados';
    contadorEl.textContent = texto;
}

/**
 * Muestra u oculta la sección "sin resultados".
 * @param {boolean} mostrar
 */
function mostrarSinResultados(mostrar) {
    sinResultados.style.display = mostrar ? 'block' : 'none';
    librosGrid.style.display    = mostrar ? 'none'  : 'grid';
}

/**
 * Devuelve la clase CSS de portada según la categoría del libro.
 * @param {string} categoria
 * @returns {string} - Nombre de clase CSS
 */
function obtenerClasePortada(categoria) {
    const mapa = {
        'Literatura':   'portada--literatura',
        'Ciencias':     'portada--ciencias',
        'Historia':     'portada--historia',
        'Matemáticas':  'portada--matematicas',
        'Filosofía':    'portada--filosofia',
        'Arte':         'portada--arte',
        'Tecnología':   'portada--tecnologia'
    };
    return mapa[categoria] || 'portada--default';
}

/**
 * Extrae las primeras palabras del título para mostrar en la portada.
 * @param {string} titulo
 * @returns {string} - Texto abreviado para la portada
 */
function obtenerIniciales(titulo) {
    const palabras = titulo.split(' ');
    if (palabras.length === 1) return titulo.substring(0, 8);
    // Tomar las primeras 3 palabras relevantes (omitir artículos cortos)
    const relevantes = palabras.filter(p => p.length > 2).slice(0, 3);
    if (relevantes.length === 0) return titulo.substring(0, 10);
    return relevantes.join('\n');
}

/**
 * Escapa caracteres HTML para prevenir XSS al insertar texto dinámico.
 * @param {string} texto
 * @returns {string}
 */
function escaparHTML(texto) {
    if (typeof texto !== 'string') return String(texto);
    return texto
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

/* ============================================================
   8. EVENT LISTENERS
   ============================================================ */

// Botón "Buscar"
btnBuscar.addEventListener('click', filtrarYRenderizar);

// Búsqueda dinámica al escribir (sin necesidad de presionar enter)
campoBusqueda.addEventListener('input', filtrarYRenderizar);

// Tecla Enter en el input de búsqueda
campoBusqueda.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') filtrarYRenderizar();
});

// Botón limpiar (✕ dentro del input)
btnLimpiar.addEventListener('click', limpiarBusqueda);

// Botón "Todos los libros" en filtros
btnTodos.addEventListener('click', limpiarBusqueda);

// Botón "Ver todos los libros" en estado sin resultados
btnVerTodos.addEventListener('click', limpiarBusqueda);

// Cambios en los selectores de filtro
filtroCategoria.addEventListener('change', filtrarYRenderizar);
filtroAutor.addEventListener('change', filtrarYRenderizar);
filtroEstado.addEventListener('change', filtrarYRenderizar);

// Cerrar modal
modalCerrar.addEventListener('click', cerrarModal);
modalBtnCerrar.addEventListener('click', cerrarModal);

// Cerrar modal al hacer clic fuera (en el overlay)
modalOverlay.addEventListener('click', function(e) {
    if (e.target === modalOverlay) cerrarModal();
});

// Cerrar modal con tecla Escape
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modalOverlay.style.display === 'flex') {
        cerrarModal();
    }
});

// Menú hamburguesa (móvil)
menuToggle.addEventListener('click', function() {
    const estaAbierto = mobileMenu.classList.toggle('abierto');
    menuToggle.setAttribute('aria-expanded', estaAbierto);
});

// Cerrar menú móvil al hacer clic en un enlace
mobileMenu.querySelectorAll('.nav__link').forEach(function(enlace) {
    enlace.addEventListener('click', function() {
        mobileMenu.classList.remove('abierto');
        menuToggle.setAttribute('aria-expanded', 'false');
    });
});

// Resaltar enlace de nav activo según scroll
window.addEventListener('scroll', function() {
    const secciones = ['inicio', 'catalogo', 'informacion'];
    let seccionActiva = 'inicio';

    secciones.forEach(function(id) {
        const seccion = document.getElementById(id);
        if (seccion) {
            const rect = seccion.getBoundingClientRect();
            if (rect.top <= 80) seccionActiva = id;
        }
    });

    document.querySelectorAll('.nav__link').forEach(function(link) {
        link.classList.remove('activo');
        if (link.getAttribute('href') === '#' + seccionActiva) {
            link.classList.add('activo');
        }
    });
});

/* ============================================================
   ARRANQUE DE LA APLICACIÓN
   ============================================================ */
inicializar();
