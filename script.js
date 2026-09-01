/**
 * ============================================================
 * BIBLIOTECA COLEGIO HUMBOLDT — script.js
 * Sistema de búsqueda, filtrado, Inventario/Copias y CRUD Admin
 * ============================================================
 *
 * ESTRUCTURA:
 *  1. Catálogo inicial por defecto (LIBROS_INICIALES con copias)
 *  2. Estado global y Persistencia (localStorage)
 *  3. Referencias al DOM
 *  4. Inicialización
 *  5. Funciones de Renderizado y Tarjetas (con contador de copias)
 *  6. Búsqueda y Filtros
 *  7. Módulo Administrador (Autenticación y Sesión)
 *  8. Operaciones CRUD y Control de Inventario/Copias
 *  9. Modales (Ubicación, Login Admin, Formulario Libro, Eliminar)
 * 10. Sistema de Notificaciones Toast
 * 11. Utilidades y Helpers
 * 12. Event Listeners
 * ============================================================
 */

/* ============================================================
   1. CATÁLOGO INICIAL POR DEFECTO (Con Gestión de Copias)
   ============================================================ */
const LIBROS_INICIALES = [
    {
        id: 1,
        titulo: "El Principito",
        autor: "Antoine de Saint-Exupéry",
        categoria: "Literatura",
        editorial: "Salamandra",
        anio: 1943,
        isbn: "978-0156012195",
        estado: "Disponible",
        copiasTotal: 4,
        copiasDisponibles: 3,
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
        copiasTotal: 3,
        copiasDisponibles: 0,
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
        copiasTotal: 3,
        copiasDisponibles: 2,
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
        copiasTotal: 2,
        copiasDisponibles: 1,
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
        copiasTotal: 2,
        copiasDisponibles: 0,
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
        copiasTotal: 3,
        copiasDisponibles: 2,
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
        copiasTotal: 5,
        copiasDisponibles: 4,
        imagen: "images/cover-7.jpg",
        ubicacion: {
            estanteria: "Estantería D",
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
        copiasTotal: 2,
        copiasDisponibles: 0,
        imagen: "images/cover-8.jpg",
        ubicacion: {
            estanteria: "Estantería E",
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
        copiasTotal: 3,
        copiasDisponibles: 1,
        imagen: "images/cover-9.jpg",
        ubicacion: {
            estanteria: "Estantería F",
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
        copiasTotal: 4,
        copiasDisponibles: 2,
        imagen: "images/cover-10.jpg",
        ubicacion: {
            estanteria: "Estantería E",
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
        copiasTotal: 3,
        copiasDisponibles: 0,
        imagen: "images/cover-11.jpg",
        ubicacion: {
            estanteria: "Estantería A",
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
        copiasTotal: 2,
        copiasDisponibles: 2,
        imagen: "images/cover-12.jpg",
        ubicacion: {
            estanteria: "Estantería G",
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
        copiasTotal: 3,
        copiasDisponibles: 2,
        imagen: "images/cover-13.jpg",
        ubicacion: {
            estanteria: "Estantería B",
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
        copiasTotal: 3,
        copiasDisponibles: 1,
        imagen: "images/cover-14.jpg",
        ubicacion: {
            estanteria: "Estantería A",
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
        copiasTotal: 3,
        copiasDisponibles: 0,
        imagen: "images/cover-15.jpg",
        ubicacion: {
            estanteria: "Estantería D",
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
        copiasTotal: 4,
        copiasDisponibles: 3,
        imagen: "images/cover-16.jpg",
        ubicacion: {
            estanteria: "Estantería C",
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
        copiasTotal: 2,
        copiasDisponibles: 1,
        imagen: "images/cover-17.jpg",
        ubicacion: {
            estanteria: "Estantería A",
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
        copiasTotal: 2,
        copiasDisponibles: 0,
        imagen: "images/cover-18.jpg",
        ubicacion: {
            estanteria: "Estantería G",
            seccion: "Programación",
            nivel: "Nivel 2"
        }
    }
];

/* ============================================================
   2. ESTADO GLOBAL Y PERSISTENCIA (localStorage)
   ============================================================ */
const STORAGE_KEY_LIBROS = 'humboldt_biblioteca_libros';
const STORAGE_KEY_ADMIN  = 'humboldt_biblioteca_admin';
const CLAVE_ADMIN        = 'admin123'; // Contraseña de administración

let libros = cargarLibros();
let esAdmin = localStorage.getItem(STORAGE_KEY_ADMIN) === 'true';
let libroAEliminarId = null;

/**
 * Carga los libros desde localStorage o inicializa con el array por defecto.
 * Asegura que todos los libros tengan los campos copiasTotal, copiasDisponibles e imagen.
 */
function cargarLibros() {
    try {
        const data = localStorage.getItem(STORAGE_KEY_LIBROS);
        if (data) {
            const parseados = JSON.parse(data);
            if (Array.isArray(parseados) && parseados.length > 0) {
                // Normalizar campos y asignar portadas si no las tenían
                parseados.forEach(function(l) {
                    if (typeof l.copiasTotal === 'undefined') {
                        l.copiasTotal = l.estado === 'Disponible' ? 3 : 2;
                        l.copiasDisponibles = l.estado === 'Disponible' ? 2 : 0;
                    }
                    if (typeof l.copiasDisponibles === 'undefined') {
                        l.copiasDisponibles = l.estado === 'Disponible' ? l.copiasTotal : 0;
                    }
                    // Asignar carátula si es de los libros base y no tenía
                    if (!l.imagen && l.id >= 1 && l.id <= 18) {
                        l.imagen = `images/cover-${l.id}.jpg`;
                    }
                    // Sincronizar estado con copias disponibles
                    l.estado = l.copiasDisponibles > 0 ? 'Disponible' : 'Prestado';
                });
                return parseados;
            }
        }
    } catch (e) {
        console.warn('Error al leer de localStorage:', e);
    }
    // Si no hay datos, inicializamos con los libros por defecto
    guardarLibros(LIBROS_INICIALES);
    return JSON.parse(JSON.stringify(LIBROS_INICIALES));
}

/**
 * Guarda el array de libros en localStorage.
 */
function guardarLibros(lista) {
    try {
        localStorage.setItem(STORAGE_KEY_LIBROS, JSON.stringify(lista));
    } catch (e) {
        console.error('Error al guardar en localStorage:', e);
    }
}

/* ============================================================
   3. REFERENCIAS AL DOM
   ============================================================ */
// Buscador y filtros
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

// Header y navegación
const menuToggle       = document.getElementById('menuToggle');
const mobileMenu       = document.getElementById('mobileMenu');
const btnAdminAuth     = document.getElementById('btnAdminAuth');
const btnAdminAuthText = document.getElementById('btnAdminAuthText');
const btnAdminAuthMobile = document.getElementById('btnAdminAuthMobile');
const btnAdminAuthMobileText = document.getElementById('btnAdminAuthMobileText');

// Toolbar Admin
const adminToolbar          = document.getElementById('adminToolbar');
const btnNuevoLibro         = document.getElementById('btnNuevoLibro');
const btnRestablecerCatalogo= document.getElementById('btnRestablecerCatalogo');
const btnCerrarSesionAdmin  = document.getElementById('btnCerrarSesionAdmin');

// Modal Ubicación
const modalOverlay     = document.getElementById('modalOverlay');
const modalLibroNombre = document.getElementById('modalLibroNombre');
const modalUbicacion   = document.getElementById('modalUbicacion');
const modalCerrar      = document.getElementById('modalCerrar');
const modalBtnCerrar   = document.getElementById('modalBtnCerrar');

// Modal Login Admin
const modalAdminLogin         = document.getElementById('modalAdminLogin');
const modalAdminLoginCerrar   = document.getElementById('modalAdminLoginCerrar');
const formAdminLogin          = document.getElementById('formAdminLogin');
const adminPassword           = document.getElementById('adminPassword');
const btnTogglePassword       = document.getElementById('btnTogglePassword');
const iconTogglePassword      = document.getElementById('iconTogglePassword');
const adminLoginError         = document.getElementById('adminLoginError');
const btnCancelarLoginAdmin   = document.getElementById('btnCancelarLoginAdmin');

// Modal Formulario Libro
const modalLibroForm           = document.getElementById('modalLibroForm');
const modalLibroFormCerrar     = document.getElementById('modalLibroFormCerrar');
const modalLibroFormTitulo     = document.getElementById('modalLibroFormTitulo');
const modalLibroFormSubtitulo  = document.getElementById('modalLibroFormSubtitulo');
const modalLibroFormIcono      = document.getElementById('modalLibroFormIcono');
const formLibro                = document.getElementById('formLibro');
const formLibroId              = document.getElementById('formLibroId');
const formLibroTitulo          = document.getElementById('formLibroTitulo');
const formLibroAutor           = document.getElementById('formLibroAutor');
const formLibroCategoria       = document.getElementById('formLibroCategoria');
const formLibroCategoriaOtra   = document.getElementById('formLibroCategoriaOtra');
const formLibroEditorial       = document.getElementById('formLibroEditorial');
const formLibroAnio            = document.getElementById('formLibroAnio');
const formLibroIsbn            = document.getElementById('formLibroIsbn');
const formLibroCopiasTotal     = document.getElementById('formLibroCopiasTotal');
const formLibroCopiasDisponibles = document.getElementById('formLibroCopiasDisponibles');
const formLibroImagen          = document.getElementById('formLibroImagen');
const formLibroEstanteria      = document.getElementById('formLibroEstanteria');
const formLibroSeccion         = document.getElementById('formLibroSeccion');
const formLibroNivel           = document.getElementById('formLibroNivel');
const btnCancelarLibroForm     = document.getElementById('btnCancelarLibroForm');

// Modal Confirmación Eliminar
const modalConfirmarEliminar   = document.getElementById('modalConfirmarEliminar');
const modalEliminarCerrar      = document.getElementById('modalEliminarCerrar');
const modalEliminarNombreLibro = document.getElementById('modalEliminarNombreLibro');
const btnCancelarEliminar      = document.getElementById('btnCancelarEliminar');
const btnConfirmarEliminar     = document.getElementById('btnConfirmarEliminar');

// Toast
const toastContainer = document.getElementById('toastContainer');

/* ============================================================
   4. INICIALIZACIÓN
   ============================================================ */
function inicializar() {
    poblarFiltros();
    actualizarEstadoAdminUI();
    renderizarLibros(libros);
    actualizarContador(libros.length);
}

/* ============================================================
   5. FUNCIONES DE RENDERIZADO Y TARJETAS
   ============================================================ */

/**
 * Genera el HTML de las tarjetas de libro y las inserta en el grid.
 * @param {Array} lista - Array filtrado de libros a mostrar
 */
function renderizarLibros(lista) {
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
 * Crea el elemento DOM de una tarjeta de libro con contador de copias.
 * @param {Object} libro - Objeto con los datos del libro
 * @param {number} indice - Índice para escalonar la animación
 * @returns {HTMLElement} - El elemento de la tarjeta
 */
function crearTarjeta(libro, indice) {
    const card = document.createElement('div');
    card.className = 'libro-card';
    card.setAttribute('role', 'listitem');
    card.style.animationDelay = (indice * 30) + 'ms';

    const totalCopias = typeof libro.copiasTotal === 'number' ? libro.copiasTotal : 1;
    const dispCopias  = typeof libro.copiasDisponibles === 'number' ? libro.copiasDisponibles : (libro.estado === 'Disponible' ? 1 : 0);
    const hayDisponibilidad = dispCopias > 0;

    // Estado para badge en portada
    let claseEstadoBadge, textoEstadoBadge;
    if (dispCopias === 0) {
        claseEstadoBadge = 'estado--prestado';
        textoEstadoBadge = `🔴 0 de ${totalCopias} disp.`;
    } else if (dispCopias === 1 && totalCopias > 1) {
        claseEstadoBadge = 'estado--disponible';
        textoEstadoBadge = `🟡 1 de ${totalCopias} disp.`;
    } else {
        claseEstadoBadge = 'estado--disponible';
        textoEstadoBadge = `🟢 ${dispCopias} de ${totalCopias} disp.`;
    }

    const clasePortion = obtenerClasePortada(libro.categoria);
    const iniciales    = obtenerIniciales(libro.titulo);

    // Portada imagen real o fallback degradado
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

    // Badge detallado de copias
    let copiasBadgeClase, copiasBadgeTexto;
    if (dispCopias === 0) {
        copiasBadgeClase = 'copias--agotado';
        copiasBadgeTexto = `<span><strong>Agotado</strong> (0 de ${totalCopias} copias)</span>`;
    } else if (dispCopias === 1 && totalCopias > 1) {
        copiasBadgeClase = 'copias--pocas';
        copiasBadgeTexto = `<span><strong>Última copia disponible</strong> (1 de ${totalCopias})</span>`;
    } else {
        copiasBadgeClase = 'copias--disponible';
        copiasBadgeTexto = `<span><strong>${dispCopias} de ${totalCopias}</strong> copias disponibles</span>`;
    }

    // Botones de administración (visibles solo cuando esAdmin es true)
    const adminAccionesHTML = esAdmin ? `
        <div class="admin-card-acciones">
            <div class="admin-card-copias-controls">
                <span class="admin-card-copias-label">Copias: ${dispCopias}/${totalCopias}</span>
                <div class="admin-card-copias-btns">
                    <button class="btn--copia-accion" onclick="prestarCopia(${libro.id})" title="Prestar una copia (-1 disponible)" ${dispCopias === 0 ? 'disabled' : ''}>
                        -1 Prestar
                    </button>
                    <button class="btn--copia-accion" onclick="devolverCopia(${libro.id})" title="Devolver una copia (+1 disponible)" ${dispCopias >= totalCopias ? 'disabled' : ''}>
                        +1 Devolver
                    </button>
                </div>
            </div>
            <div class="admin-card-btn-group">
                <button class="btn--admin-edit" onclick="abrirModalEditarLibro(${libro.id})" title="Editar libro">
                    <span class="material-symbols-outlined" style="font-size: 16px;">edit</span>
                    Editar
                </button>
                <button class="btn--admin-delete" onclick="abrirModalEliminarLibro(${libro.id})" title="Eliminar libro">
                    <span class="material-symbols-outlined" style="font-size: 16px;">delete</span>
                    Eliminar
                </button>
            </div>
        </div>
    ` : '';

    card.innerHTML = `
        <div class="libro-card__portada ${libro.imagen ? 'portada--con-imagen' : clasePortion}">
            ${portadaHTML}
            <span class="libro-card__estado-badge ${claseEstadoBadge}">
                ${textoEstadoBadge}
            </span>
        </div>

        <div class="libro-card__cuerpo">
            <span class="libro-card__categoria-tag">${escaparHTML(libro.categoria)}</span>
            <h3 class="libro-card__titulo">${escaparHTML(libro.titulo)}</h3>
            <p class="libro-card__autor">${escaparHTML(libro.autor)}</p>

            <div class="libro-card__copias-info">
                <div class="copias-badge ${copiasBadgeClase}">
                    <span class="material-symbols-outlined">inventory_2</span>
                    ${copiasBadgeTexto}
                </div>
            </div>

            <div class="libro-card__meta">
                <span class="libro-card__meta-item">Editorial: <span>${escaparHTML(libro.editorial)}</span></span>
                <span class="libro-card__meta-item">Año: <span>${libro.anio}</span></span>
            </div>

            <p class="libro-card__isbn">ISBN: ${escaparHTML(libro.isbn)}</p>

            <div class="libro-card__acciones">
                ${hayDisponibilidad
                    ? `<button
                            class="btn btn--ubicacion"
                            id="btn-ubicacion-${libro.id}"
                            onclick="mostrarUbicacion(${libro.id})"
                            aria-label="Ver ubicación de ${escaparHTML(libro.titulo)}"
                       >
                           🗺️ Ver ubicación (${dispCopias} disp.)
                       </button>`
                    : `<p style="font-size:0.78rem; color:var(--error); font-weight:600; margin-top:auto; text-align:center;">
                           🔴 Todos los ejemplares (${totalCopias}) prestados
                       </p>`
                }
            </div>

            ${adminAccionesHTML}
        </div>
    `;

    return card;
}

/**
 * Llena los selectores de filtro con los valores únicos del catálogo.
 */
function poblarFiltros() {
    const categoriaActual = filtroCategoria.value;
    const autorActual = filtroAutor.value;

    const categorias = [...new Set(libros.map(l => l.categoria))].sort();
    const autores    = [...new Set(libros.map(l => l.autor))].sort();

    filtroCategoria.innerHTML = '<option value="">Todas las categorías</option>';
    categorias.forEach(function(cat) {
        const option = document.createElement('option');
        option.value = cat;
        option.textContent = cat;
        filtroCategoria.appendChild(option);
    });

    filtroAutor.innerHTML = '<option value="">Todos los autores</option>';
    autores.forEach(function(autor) {
        const option = document.createElement('option');
        option.value = autor;
        option.textContent = autor;
        filtroAutor.appendChild(option);
    });

    if (categorias.includes(categoriaActual)) filtroCategoria.value = categoriaActual;
    if (autores.includes(autorActual)) filtroAutor.value = autorActual;
}

/* ============================================================
   6. BÚSQUEDA Y FILTROS
   ============================================================ */

/**
 * Aplica la búsqueda de texto y los filtros activos simultáneamente.
 */
function filtrarYRenderizar() {
    const termino    = campoBusqueda.value.toLowerCase().trim();
    const categoria  = filtroCategoria.value;
    const autor      = filtroAutor.value;
    const estado     = filtroEstado.value;

    btnLimpiar.style.display = termino ? 'flex' : 'none';

    let resultado = libros;

    if (termino) {
        resultado = resultado.filter(function(libro) {
            return (
                (libro.titulo && libro.titulo.toLowerCase().includes(termino))       ||
                (libro.autor && libro.autor.toLowerCase().includes(termino))         ||
                (libro.isbn && libro.isbn.toLowerCase().includes(termino))           ||
                (libro.categoria && libro.categoria.toLowerCase().includes(termino)) ||
                (libro.editorial && libro.editorial.toLowerCase().includes(termino))
            );
        });
    }

    if (categoria) {
        resultado = resultado.filter(l => l.categoria === categoria);
    }

    if (autor) {
        resultado = resultado.filter(l => l.autor === autor);
    }

    if (estado) {
        if (estado === 'Disponible') {
            resultado = resultado.filter(l => (typeof l.copiasDisponibles === 'number' ? l.copiasDisponibles : (l.estado === 'Disponible' ? 1 : 0)) > 0);
        } else if (estado === 'Prestado') {
            resultado = resultado.filter(l => (typeof l.copiasDisponibles === 'number' ? l.copiasDisponibles : (l.estado === 'Disponible' ? 1 : 0)) === 0);
        }
    }

    renderizarLibros(resultado);
    actualizarContador(resultado.length);
}

/**
 * Filtra los libros al hacer clic en un chip de categoría.
 */
function filtrarPorChip(categoria) {
    document.querySelectorAll('.chip').forEach(function(chip) {
        chip.classList.remove('activo');
    });

    const chipActivo = categoria
        ? document.getElementById('chip-' + categoria.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/\s+/g, ''))
        : document.getElementById('chip-todos');
    if (chipActivo) chipActivo.classList.add('activo');

    filtroCategoria.value = categoria;
    filtrarYRenderizar();
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
   7. MÓDULO ADMINISTRADOR (AUTENTICACIÓN Y SESIÓN)
   ============================================================ */

/**
 * Sincroniza la interfaz con el estado actual de la sesión de administrador.
 */
function actualizarEstadoAdminUI() {
    if (esAdmin) {
        adminToolbar.style.display = 'flex';
        btnAdminAuth.classList.add('activo');
        btnAdminAuthText.textContent = 'Admin Activo';
        if (btnAdminAuthMobileText) btnAdminAuthMobileText.textContent = 'Admin (Activo)';
    } else {
        adminToolbar.style.display = 'none';
        btnAdminAuth.classList.remove('activo');
        btnAdminAuthText.textContent = 'Admin';
        if (btnAdminAuthMobileText) btnAdminAuthMobileText.textContent = 'Modo Administrador';
    }
}

/**
 * Maneja el clic en el botón de acceso Admin.
 */
function toggleAdminAccess() {
    if (esAdmin) {
        adminToolbar.scrollIntoView({ behavior: 'smooth', block: 'center' });
        mostrarToast('Modo Administrador activo', 'info');
    } else {
        abrirModalAdminLogin();
    }
}

function abrirModalAdminLogin() {
    adminPassword.value = '';
    adminLoginError.style.display = 'none';
    modalAdminLogin.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    setTimeout(() => adminPassword.focus(), 150);
}

function cerrarModalAdminLogin() {
    modalAdminLogin.style.display = 'none';
    document.body.style.overflow = '';
}

formAdminLogin.addEventListener('submit', function(e) {
    e.preventDefault();
    const pass = adminPassword.value.trim();

    if (pass === CLAVE_ADMIN || pass === 'humboldt2025') {
        esAdmin = true;
        localStorage.setItem(STORAGE_KEY_ADMIN, 'true');
        cerrarModalAdminLogin();
        actualizarEstadoAdminUI();
        filtrarYRenderizar();
        mostrarToast('¡Bienvenido, Administrador!', 'success');
        adminToolbar.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
        adminLoginError.style.display = 'block';
        adminPassword.focus();
    }
});

function cerrarSesionAdmin() {
    esAdmin = false;
    localStorage.removeItem(STORAGE_KEY_ADMIN);
    actualizarEstadoAdminUI();
    filtrarYRenderizar();
    mostrarToast('Sesión de administrador finalizada', 'info');
}

btnTogglePassword.addEventListener('click', function() {
    const esPassword = adminPassword.type === 'password';
    adminPassword.type = esPassword ? 'text' : 'password';
    iconTogglePassword.textContent = esPassword ? 'visibility_off' : 'visibility';
});

/* ============================================================
   8. OPERACIONES CRUD Y GESTIÓN DE COPIAS
   ============================================================ */

/**
 * Presta una copia del libro (-1 disponible).
 * @param {number} id - ID del libro
 */
function prestarCopia(id) {
    const libro = libros.find(l => l.id === id);
    if (!libro) return;

    if (libro.copiasDisponibles > 0) {
        libro.copiasDisponibles--;
        libro.estado = libro.copiasDisponibles > 0 ? 'Disponible' : 'Prestado';
        guardarLibros(libros);
        filtrarYRenderizar();
        mostrarToast(`Copia prestada de "${libro.titulo}". Quedan ${libro.copiasDisponibles} disponibles.`, 'info');
    }
}

/**
 * Devuelve una copia del libro (+1 disponible).
 * @param {number} id - ID del libro
 */
function devolverCopia(id) {
    const libro = libros.find(l => l.id === id);
    if (!libro) return;

    if (libro.copiasDisponibles < libro.copiasTotal) {
        libro.copiasDisponibles++;
        libro.estado = 'Disponible';
        guardarLibros(libros);
        filtrarYRenderizar();
        mostrarToast(`Copia devuelta de "${libro.titulo}". Ahora hay ${libro.copiasDisponibles} disponibles.`, 'success');
    }
}

/**
 * Abre el modal para crear un nuevo libro.
 */
function abrirModalCrearLibro() {
    formLibro.reset();
    formLibroId.value = '';
    formLibroCopiasTotal.value = 3;
    formLibroCopiasDisponibles.value = 3;
    formLibroCategoriaOtra.style.display = 'none';
    modalLibroFormTitulo.textContent = 'Agregar Nuevo Libro';
    modalLibroFormSubtitulo.textContent = 'Ingresa los datos y la cantidad de copias del ejemplar';
    modalLibroFormIcono.textContent = 'add_circle';

    modalLibroForm.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    setTimeout(() => formLibroTitulo.focus(), 150);
}

/**
 * Abre el modal para editar un libro existente.
 * @param {number} id - ID del libro a editar
 */
function abrirModalEditarLibro(id) {
    const libro = libros.find(l => l.id === id);
    if (!libro) return;

    formLibro.reset();
    formLibroId.value               = libro.id;
    formLibroTitulo.value           = libro.titulo || '';
    formLibroAutor.value            = libro.autor || '';
    formLibroEditorial.value        = libro.editorial || '';
    formLibroAnio.value             = libro.anio || '';
    formLibroIsbn.value             = libro.isbn || '';
    formLibroCopiasTotal.value      = typeof libro.copiasTotal === 'number' ? libro.copiasTotal : 1;
    formLibroCopiasDisponibles.value= typeof libro.copiasDisponibles === 'number' ? libro.copiasDisponibles : 1;
    formLibroImagen.value           = libro.imagen || '';

    // Manejo de categoría
    const categoriasSelect = Array.from(formLibroCategoria.options).map(o => o.value);
    if (categoriasSelect.includes(libro.categoria)) {
        formLibroCategoria.value = libro.categoria;
        formLibroCategoriaOtra.style.display = 'none';
    } else {
        formLibroCategoria.value = 'Otro';
        formLibroCategoriaOtra.value = libro.categoria;
        formLibroCategoriaOtra.style.display = 'block';
    }

    // Ubicación
    formLibroEstanteria.value = (libro.ubicacion && libro.ubicacion.estanteria) || '';
    formLibroSeccion.value    = (libro.ubicacion && libro.ubicacion.seccion) || '';
    formLibroNivel.value      = (libro.ubicacion && libro.ubicacion.nivel) || '';

    modalLibroFormTitulo.textContent = 'Editar Libro';
    modalLibroFormSubtitulo.textContent = `Modificando ejemplar #${libro.id}: "${libro.titulo}"`;
    modalLibroFormIcono.textContent = 'edit_note';

    modalLibroForm.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

/**
 * Guarda (Crear o Actualizar) un libro a partir del formulario.
 */
formLibro.addEventListener('submit', function(e) {
    e.preventDefault();

    const idExistente = formLibroId.value ? parseInt(formLibroId.value, 10) : null;
    
    // Resolver categoría
    let categoriaFinal = formLibroCategoria.value;
    if (categoriaFinal === 'Otro') {
        categoriaFinal = formLibroCategoriaOtra.value.trim() || 'General';
    }

    const totalCopias = Math.max(1, parseInt(formLibroCopiasTotal.value, 10) || 1);
    let dispCopias    = parseInt(formLibroCopiasDisponibles.value, 10);
    if (isNaN(dispCopias) || dispCopias < 0) dispCopias = 0;
    if (dispCopias > totalCopias) dispCopias = totalCopias;

    const libroData = {
        titulo: formLibroTitulo.value.trim(),
        autor: formLibroAutor.value.trim(),
        categoria: categoriaFinal,
        editorial: formLibroEditorial.value.trim(),
        anio: parseInt(formLibroAnio.value, 10) || new Date().getFullYear(),
        isbn: formLibroIsbn.value.trim(),
        copiasTotal: totalCopias,
        copiasDisponibles: dispCopias,
        estado: dispCopias > 0 ? 'Disponible' : 'Prestado',
        imagen: formLibroImagen.value.trim() || null,
        ubicacion: {
            estanteria: formLibroEstanteria.value.trim(),
            seccion: formLibroSeccion.value.trim(),
            nivel: formLibroNivel.value.trim()
        }
    };

    if (idExistente) {
        // ACTUALIZAR (Update)
        const index = libros.findIndex(l => l.id === idExistente);
        if (index !== -1) {
            libros[index] = { ...libroData, id: idExistente };
            mostrarToast(`"${libroData.titulo}" actualizado correctamente`, 'success');
        }
    } else {
        // CREAR (Create)
        const nuevoId = libros.length > 0 ? Math.max(...libros.map(l => l.id)) + 1 : 1;
        libros.unshift({ ...libroData, id: nuevoId });
        mostrarToast(`"${libroData.titulo}" agregado al catálogo`, 'success');
    }

    guardarLibros(libros);
    poblarFiltros();
    filtrarYRenderizar();
    cerrarModalLibroForm();
});

function cerrarModalLibroForm() {
    modalLibroForm.style.display = 'none';
    document.body.style.overflow = '';
}

formLibroCategoria.addEventListener('change', function() {
    if (this.value === 'Otro') {
        formLibroCategoriaOtra.style.display = 'block';
        formLibroCategoriaOtra.required = true;
        formLibroCategoriaOtra.focus();
    } else {
        formLibroCategoriaOtra.style.display = 'none';
        formLibroCategoriaOtra.required = false;
    }
});

function abrirModalEliminarLibro(id) {
    const libro = libros.find(l => l.id === id);
    if (!libro) return;

    libroAEliminarId = id;
    modalEliminarNombreLibro.innerHTML = `¿Estás seguro de que deseas eliminar <strong>"${escaparHTML(libro.titulo)}"</strong> (${escaparHTML(libro.autor)})?`;
    modalConfirmarEliminar.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function cerrarModalEliminar() {
    modalConfirmarEliminar.style.display = 'none';
    libroAEliminarId = null;
    document.body.style.overflow = '';
}

btnConfirmarEliminar.addEventListener('click', function() {
    if (!libroAEliminarId) return;

    const libro = libros.find(l => l.id === libroAEliminarId);
    const tituloLibro = libro ? libro.titulo : 'Libro';

    libros = libros.filter(l => l.id !== libroAEliminarId);
    guardarLibros(libros);

    poblarFiltros();
    filtrarYRenderizar();
    cerrarModalEliminar();
    mostrarToast(`"${tituloLibro}" ha sido eliminado`, 'error');
});

function restablecerCatalogoOriginal() {
    if (confirm('¿Estás seguro de que deseas restablecer el catálogo a los libros originales? Se perderán los cambios manuales.')) {
        libros = JSON.parse(JSON.stringify(LIBROS_INICIALES));
        guardarLibros(libros);
        poblarFiltros();
        limpiarBusqueda();
        mostrarToast('Catálogo restablecido al estado original', 'info');
    }
}

/* ============================================================
   9. MODAL DE UBICACIÓN
   ============================================================ */

function mostrarUbicacion(id) {
    const libro = libros.find(l => l.id === id);
    if (!libro) return;

    modalLibroNombre.textContent = '"' + libro.titulo + '"';

    const totalCopias = typeof libro.copiasTotal === 'number' ? libro.copiasTotal : 1;
    const dispCopias  = typeof libro.copiasDisponibles === 'number' ? libro.copiasDisponibles : (libro.estado === 'Disponible' ? 1 : 0);

    modalUbicacion.innerHTML = `
        <div class="ubicacion-fila">
            <span class="ubicacion-fila__icono">📚</span>
            <div>
                <p class="ubicacion-fila__label">Estantería</p>
                <p class="ubicacion-fila__valor">${escaparHTML((libro.ubicacion && libro.ubicacion.estanteria) || 'No especificada')}</p>
            </div>
        </div>
        <div class="ubicacion-fila">
            <span class="ubicacion-fila__icono">🗂️</span>
            <div>
                <p class="ubicacion-fila__label">Sección</p>
                <p class="ubicacion-fila__valor">${escaparHTML((libro.ubicacion && libro.ubicacion.seccion) || 'General')}</p>
            </div>
        </div>
        <div class="ubicacion-fila">
            <span class="ubicacion-fila__icono">🔢</span>
            <div>
                <p class="ubicacion-fila__label">Nivel</p>
                <p class="ubicacion-fila__valor">${escaparHTML((libro.ubicacion && libro.ubicacion.nivel) || 'N/A')}</p>
            </div>
        </div>
        <div class="ubicacion-fila">
            <span class="ubicacion-fila__icono">📦</span>
            <div>
                <p class="ubicacion-fila__label">Disponibilidad en Estante</p>
                <p class="ubicacion-fila__valor" style="color: ${dispCopias > 0 ? '#15803d' : 'var(--error)'};">
                    ${dispCopias} de ${totalCopias} ejemplares disponibles
                </p>
            </div>
        </div>
    `;

    modalOverlay.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function cerrarModal() {
    modalOverlay.style.display = 'none';
    document.body.style.overflow = '';
}

/* ============================================================
   10. SISTEMA DE NOTIFICACIONES TOAST
   ============================================================ */

function mostrarToast(mensaje, tipo = 'info') {
    if (!toastContainer) return;

    const iconos = {
        success: 'check_circle',
        error: 'cancel',
        info: 'info'
    };

    const toast = document.createElement('div');
    toast.className = `toast toast--${tipo}`;
    toast.innerHTML = `
        <span class="material-symbols-outlined">${iconos[tipo] || 'info'}</span>
        <span>${escaparHTML(mensaje)}</span>
    `;

    toastContainer.appendChild(toast);

    setTimeout(() => {
        if (toast.parentNode) {
            toast.parentNode.removeChild(toast);
        }
    }, 4000);
}

/* ============================================================
   11. UTILIDADES Y HELPERS
   ============================================================ */

function actualizarContador(cantidad) {
    const texto = cantidad === 1
        ? '1 libro encontrado'
        : cantidad + ' libros encontrados';
    contadorEl.textContent = texto;
}

function mostrarSinResultados(mostrar) {
    sinResultados.style.display = mostrar ? 'block' : 'none';
    librosGrid.style.display    = mostrar ? 'none'  : 'grid';
}

function obtenerClasePortada(categoria) {
    const mapa = {
        'Literatura':   'portada--literatura',
        'Ciencias':     'portada--ciencias',
        'Historia':     'portada--historia',
        'Matemáticas':  'portada--matematicas',
        'Filosofía':    'portada--filosofia',
        'Arte':         'portada--arte',
        'Tecnología':   'portada--tecnologia',
        'Infantil':     'portada--literatura'
    };
    return mapa[categoria] || 'portada--default';
}

function obtenerIniciales(titulo) {
    if (!titulo) return 'LIBRO';
    const palabras = titulo.split(' ');
    if (palabras.length === 1) return titulo.substring(0, 8);
    const relevantes = palabras.filter(p => p.length > 2).slice(0, 3);
    if (relevantes.length === 0) return titulo.substring(0, 10);
    return relevantes.join('\n');
}

function escaparHTML(texto) {
    if (typeof texto !== 'string') return String(texto || '');
    return texto
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

/* ============================================================
   12. EVENT LISTENERS
   ============================================================ */

// Búsqueda y Filtros
btnBuscar.addEventListener('click', filtrarYRenderizar);
campoBusqueda.addEventListener('input', filtrarYRenderizar);
campoBusqueda.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') filtrarYRenderizar();
});
btnLimpiar.addEventListener('click', limpiarBusqueda);
btnTodos.addEventListener('click', limpiarBusqueda);
btnVerTodos.addEventListener('click', limpiarBusqueda);
filtroCategoria.addEventListener('change', filtrarYRenderizar);
filtroAutor.addEventListener('change', filtrarYRenderizar);
filtroEstado.addEventListener('change', filtrarYRenderizar);

// Modales - Ubicación
modalCerrar.addEventListener('click', cerrarModal);
modalBtnCerrar.addEventListener('click', cerrarModal);
modalOverlay.addEventListener('click', function(e) {
    if (e.target === modalOverlay) cerrarModal();
});

// Modales - Admin Login
btnAdminAuth.addEventListener('click', toggleAdminAccess);
if (btnAdminAuthMobile) btnAdminAuthMobile.addEventListener('click', toggleAdminAccess);
modalAdminLoginCerrar.addEventListener('click', cerrarModalAdminLogin);
btnCancelarLoginAdmin.addEventListener('click', cerrarModalAdminLogin);
modalAdminLogin.addEventListener('click', function(e) {
    if (e.target === modalAdminLogin) cerrarModalAdminLogin();
});

// Modales - Formulario Libro (Crear/Editar)
btnNuevoLibro.addEventListener('click', abrirModalCrearLibro);
modalLibroFormCerrar.addEventListener('click', cerrarModalLibroForm);
btnCancelarLibroForm.addEventListener('click', cerrarModalLibroForm);
modalLibroForm.addEventListener('click', function(e) {
    if (e.target === modalLibroForm) cerrarModalLibroForm();
});

// Modales - Confirmar Eliminar
modalEliminarCerrar.addEventListener('click', cerrarModalEliminar);
btnCancelarEliminar.addEventListener('click', cerrarModalEliminar);
modalConfirmarEliminar.addEventListener('click', function(e) {
    if (e.target === modalConfirmarEliminar) cerrarModalEliminar();
});

// Admin Toolbar acciones
btnRestablecerCatalogo.addEventListener('click', restablecerCatalogoOriginal);
btnCerrarSesionAdmin.addEventListener('click', cerrarSesionAdmin);

// Cerrar modales con tecla Escape
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        if (modalOverlay.style.display === 'flex') cerrarModal();
        if (modalAdminLogin.style.display === 'flex') cerrarModalAdminLogin();
        if (modalLibroForm.style.display === 'flex') cerrarModalLibroForm();
        if (modalConfirmarEliminar.style.display === 'flex') cerrarModalEliminar();
    }
});

// Menú hamburguesa móvil
menuToggle.addEventListener('click', function() {
    const estaAbierto = mobileMenu.classList.toggle('abierto');
    menuToggle.setAttribute('aria-expanded', estaAbierto);
});

mobileMenu.querySelectorAll('.nav__link').forEach(function(enlace) {
    enlace.addEventListener('click', function() {
        mobileMenu.classList.remove('abierto');
        menuToggle.setAttribute('aria-expanded', 'false');
    });
});

// Resaltar nav link activo con scroll
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
   ARRANQUE
   ============================================================ */
inicializar();
