/**
 * ============================================================
 * BIBLIOTECA COLEGIO HUMBOLDT — app-core.js
 * Motor de Datos Unificado, Persistencia Supabase & LocalStorage,
 * Gestión de Inventario, Autenticación y Helpers Multi-Página
 * ============================================================
 */

const STORAGE_KEY_LIBROS = 'humboldt_biblioteca_libros';
const STORAGE_KEY_ADMIN = 'humboldt_biblioteca_admin';


// Catálogo Maestro Inicial (18 libros con metadatos completos y coordenadas físicas)
const CATALOGO_INICIAL_MAESTRO = [
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
        descripcion: "Un piloto que sufre una avería en el desierto del Sahara conoce a un pequeño príncipe proveniente de un asteroide. A través de sus conversaciones, el autor nos invita a reflexionar sobre la amistad, el amor, la pérdida y el sentido de la vida, recordando que 'lo esencial es invisible a los ojos'.",
        ubicacion: {
            estanteria: "Estantería A",
            seccion: "Literatura Juvenil",
            nivel: "Nivel 2",
            codigo: "Est. A1 · 03"
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
        descripcion: "La obra cumbre del realismo mágico relata la historia de la familia Buendía a lo largo de siete generaciones en el pueblo ficticio de Macondo, explorando la soledad, el destino y la memoria histórica de Latinoamérica.",
        ubicacion: {
            estanteria: "Estantería A",
            seccion: "Clásicos Latinoamericanos",
            nivel: "Nivel 3",
            codigo: "Est. A1 · 11"
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
        descripcion: "Un recorrido fascinante por la historia de la humanidad, desde los primeros homínidos hasta las revoluciones cognitiva, agrícola y científica que moldearon la sociedad moderna.",
        ubicacion: {
            estanteria: "Estantería C",
            seccion: "Historia Universal",
            nivel: "Nivel 1",
            codigo: "Est. C3 · 07"
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
        descripcion: "Una guía ilustrada hacia los descubrimientos más profundos de la física teórica moderna, la teoría de cuerdas, los agujeros negros y el origen del cosmos.",
        ubicacion: {
            estanteria: "Estantería B",
            seccion: "Física y Astronomía",
            nivel: "Nivel 1",
            codigo: "Est. B2 · 04"
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
        descripcion: "Las célebres aventuras del hidalgo don Quijote y su fiel escudero Sancho Panza por las tierras de La Mancha, cumbre de la literatura en lengua española.",
        ubicacion: {
            estanteria: "Estantería A",
            seccion: "Clásicos Universales",
            nivel: "Nivel 2",
            codigo: "Est. A2 · 08"
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
        descripcion: "Una versión clara y accesible sobre los grandes enigmas del cosmos: el Big Bang, el espacio-tiempo curvo y el destino final del universo.",
        ubicacion: {
            estanteria: "Estantería B",
            seccion: "Física y Astronomía",
            nivel: "Nivel 2",
            codigo: "Est. B2 · 09"
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
        descripcion: "Texto fundamental de cálculo diferencial e integral con rigor pedagógico, ejercicios aplicados a las ciencias y demostraciones matemáticas claras.",
        ubicacion: {
            estanteria: "Estantería D",
            seccion: "Cálculo y Álgebra",
            nivel: "Nivel 1",
            codigo: "Est. D1 · 01"
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
        descripcion: "Diálogo socrático fundamental sobre la justicia, el orden de la ciudad-estado ideal, la alegoría de la caverna y la naturaleza del alma.",
        ubicacion: {
            estanteria: "Estantería C",
            seccion: "Filosofía Clásica",
            nivel: "Nivel 3",
            codigo: "Est. C2 · 05"
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
        descripcion: "Uno de los libros de arte más influyentes y leídos de todos los tiempos, explorando la creación artística desde las cavernas prehistóricas hasta las vanguardias del siglo XX.",
        ubicacion: {
            estanteria: "Estantería A",
            seccion: "Arte y Cultura",
            nivel: "Nivel 2",
            codigo: "Est. A3 · 14"
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
        descripcion: "Una novela cautivadora que sirve a la vez como una completa y amena historia de la filosofía occidental, siguiendo las cartas misteriosas que recibe la joven Sofía.",
        ubicacion: {
            estanteria: "Estantería C",
            seccion: "Filosofía Juvenil",
            nivel: "Nivel 1",
            codigo: "Est. C1 · 02"
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
        descripcion: "La célebre novela distópica sobre el totalitarismo, la neolengua, la vigilancia omnipresente del Gran Hermano y la lucha de Winston Smith por la verdad.",
        ubicacion: {
            estanteria: "Estantería A",
            seccion: "Distopías y Ficción",
            nivel: "Nivel 4",
            codigo: "Est. A4 · 19"
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
        descripcion: "Manual fundamental de buenas prácticas para desarrolladores de software que enseña a escribir código legible, mantenible, modular y eficiente.",
        ubicacion: {
            estanteria: "Estantería B",
            seccion: "Programación e Informática",
            nivel: "Nivel 1",
            codigo: "Est. B3 · 06"
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
        descripcion: "Introducción intuitiva y fascinante a los principios de la física clásica y moderna, facilitando la comprensión conceptual antes del desarrollo matemático.",
        ubicacion: {
            estanteria: "Estantería B",
            seccion: "Física General",
            nivel: "Nivel 3",
            codigo: "Est. B2 · 12"
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
        descripcion: "El despertar de Gregorio Samsa convertido en un insecto monstruoso y el drama familiar posterior, clásico indiscutible del existencialismo del siglo XX.",
        ubicacion: {
            estanteria: "Estantería A",
            seccion: "Literatura Europea",
            nivel: "Nivel 1",
            codigo: "Est. A2 · 03"
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
        descripcion: "Obra de referencia académica sobre espacios vectoriales, transformaciones lineales, valores propios y aplicaciones prácticas en ingeniería.",
        ubicacion: {
            estanteria: "Estantería D",
            seccion: "Cálculo y Álgebra",
            nivel: "Nivel 2",
            codigo: "Est. D1 · 05"
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
        descripcion: "Tratado milenario sobre estrategia militar, liderazgo, resolución de conflictos y toma de decisiones aplicable a múltiples disciplinas.",
        ubicacion: {
            estanteria: "Estantería C",
            seccion: "Historia Antigua",
            nivel: "Nivel 2",
            codigo: "Est. C3 · 04"
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
        descripcion: "Novela breve y deslumbrante donde el periodismo y la ficción se unen para reconstruir el asesinato de Santiago Nasar en un pueblo caribeño.",
        ubicacion: {
            estanteria: "Estantería A",
            seccion: "Clásicos Latinoamericanos",
            nivel: "Nivel 3",
            codigo: "Est. A1 · 15"
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
        descripcion: "Aprende los fundamentos de la informática, algoritmos y estructuras de datos utilizando el lenguaje Python con ejemplos claros y proyectos didácticos.",
        ubicacion: {
            estanteria: "Estantería B",
            seccion: "Programación e Informática",
            nivel: "Nivel 2",
            codigo: "Est. B3 · 10"
        }
    }
];

// Estado Global en Memoria
let stateLibros = [];
let stateEsAdmin = localStorage.getItem(STORAGE_KEY_ADMIN) === 'true';
let stateSupabaseEnLinea = false;

// ── Gestor de Persistencia ──
function cargarLibrosDeMemoriaLocal() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY_LIBROS);
        if (raw) {
            const parsed = JSON.parse(raw);
            if (Array.isArray(parsed) && parsed.length > 0) {
                parsed.forEach(l => {
                    if (typeof l.copiasTotal === 'undefined') l.copiasTotal = 2;
                    if (typeof l.copiasDisponibles === 'undefined') l.copiasDisponibles = l.estado === 'Disponible' ? l.copiasTotal : 0;
                    l.estado = l.copiasDisponibles > 0 ? 'Disponible' : 'Prestado';
                });
                return parsed;
            }
        }
    } catch (e) {
        console.warn('Error leyendo localStorage:', e);
    }
    guardarLibrosEnMemoriaLocal(CATALOGO_INICIAL_MAESTRO);
    return JSON.parse(JSON.stringify(CATALOGO_INICIAL_MAESTRO));
}

function guardarLibrosEnMemoriaLocal(lista) {
    try {
        localStorage.setItem(STORAGE_KEY_LIBROS, JSON.stringify(lista));
    } catch (e) {
        console.error('Error guardando en localStorage:', e);
    }
}

/**
 * Inicializa los datos cargando desde Supabase si está disponible, con fallback a localStorage.
 */
async function inicializarMotorDatos() {
    // 1. Inicializar Supabase si existe la función
    if (typeof inicializarSupabase === 'function') {
        inicializarSupabase();
    }

    // 2. Carga inmediata síncrona desde localStorage
    stateLibros = cargarLibrosDeMemoriaLocal();

    // 3. Verificar si hay sesión de Supabase Auth
    if (typeof apiObtenerSesionActivaSupabase === 'function') {
        try {
            const usuario = await apiObtenerSesionActivaSupabase();
            if (usuario) {
                stateEsAdmin = true;
                localStorage.setItem(STORAGE_KEY_ADMIN, 'true');
            }
        } catch (e) { }
    }

    // 4. Intentar cargar desde Supabase en segundo plano
    if (typeof esSupabaseActivo === 'function' && esSupabaseActivo()) {
        try {
            const librosNube = await apiObtenerLibrosSupabase();
            if (librosNube && Array.isArray(librosNube) && librosNube.length > 0) {
                stateLibros = librosNube;
                guardarLibrosEnMemoriaLocal(stateLibros);
                stateSupabaseEnLinea = true;
            } else if (librosNube && Array.isArray(librosNube) && librosNube.length === 0) {
                // Si la tabla existe pero está vacía, auto-poblamos con los 18 iniciales
                console.log('Tabla vacía en Supabase. Sincronizando catálogo inicial...');
                if (typeof apiMigrarLoteSupabase === 'function') {
                    await apiMigrarLoteSupabase(stateLibros);
                }
                stateSupabaseEnLinea = true;
            }
        } catch (err) {
            console.warn('Supabase no disponible, usando almacenamiento local:', err);
            stateSupabaseEnLinea = false;
        }
    }

    // Disparar evento para que cualquier página suscrita actualice su UI
    window.dispatchEvent(new CustomEvent('datosCargados', { detail: { libros: stateLibros, enLinea: stateSupabaseEnLinea } }));
    return stateLibros;
}

// ── Métodos de Consulta y Operaciones CRUD ──
function obtenerTodosLosLibros() {
    if (!stateLibros || stateLibros.length === 0) {
        stateLibros = cargarLibrosDeMemoriaLocal();
    }
    return stateLibros;
}

function obtenerLibroPorId(id) {
    const lista = obtenerTodosLosLibros();
    const numId = parseInt(id, 10);
    return lista.find(l => l.id === numId) || null;
}

function obtenerLibrosPorEstanteria(letraEstanteria) {
    const lista = obtenerTodosLosLibros();
    const query = letraEstanteria.toUpperCase().trim();
    return lista.filter(l => {
        if (!l.ubicacion) return false;
        const est = (l.ubicacion.estanteria || '').toUpperCase();
        const cod = (l.ubicacion.codigo || '').toUpperCase();
        return est.includes(`ESTANTERÍA ${query}`) || est.includes(`ZONA ${query}`) || cod.includes(`EST. ${query}`) || cod.includes(`ZONA ${query}`);
    });
}

function obtenerEstadisticasCatalogo() {
    const lista = obtenerTodosLosLibros();
    const totalLibros = lista.length;
    let totalCopias = 0;
    let copiasDisponibles = 0;
    let copiasPrestadas = 0;

    lista.forEach(l => {
        const tot = typeof l.copiasTotal === 'number' ? l.copiasTotal : 1;
        const disp = typeof l.copiasDisponibles === 'number' ? l.copiasDisponibles : (l.estado === 'Disponible' ? 1 : 0);
        totalCopias += tot;
        copiasDisponibles += disp;
        copiasPrestadas += (tot - disp);
    });

    const porcentajeDisponibles = totalCopias > 0 ? Math.round((copiasDisponibles / totalCopias) * 100) : 0;

    return {
        totalLibros,
        totalCopias,
        copiasDisponibles,
        copiasPrestadas,
        porcentajeDisponibles
    };
}

// Control de Inventario / Copias (Solo Admin)
async function prestarCopiaLibro(id) {
    const libro = obtenerLibroPorId(id);
    if (!libro) return false;
    if (libro.copiasDisponibles <= 0) {
        mostrarToastGlobal('No hay copias disponibles para prestar.', 'error');
        return false;
    }

    libro.copiasDisponibles -= 1;
    libro.estado = libro.copiasDisponibles > 0 ? 'Disponible' : 'Prestado';

    guardarLibrosEnMemoriaLocal(stateLibros);

    if (typeof apiActualizarLibroSupabase === 'function' && stateSupabaseEnLinea) {
        try {
            await apiActualizarLibroSupabase(libro.id, libro);
        } catch (e) {
            console.warn('Error al actualizar en Supabase:', e);
        }
    }

    mostrarToastGlobal(`Copia prestada: "${libro.titulo}". Quedan ${libro.copiasDisponibles} disp.`, 'info');
    window.dispatchEvent(new CustomEvent('libroActualizado', { detail: { libro } }));
    return true;
}

async function devolverCopiaLibro(id) {
    const libro = obtenerLibroPorId(id);
    if (!libro) return false;
    if (libro.copiasDisponibles >= libro.copiasTotal) {
        mostrarToastGlobal('Todas las copias ya están en la biblioteca.', 'error');
        return false;
    }

    libro.copiasDisponibles += 1;
    libro.estado = 'Disponible';

    guardarLibrosEnMemoriaLocal(stateLibros);

    if (typeof apiActualizarLibroSupabase === 'function' && stateSupabaseEnLinea) {
        try {
            await apiActualizarLibroSupabase(libro.id, libro);
        } catch (e) {
            console.warn('Error al actualizar en Supabase:', e);
        }
    }

    mostrarToastGlobal(`Copia devuelta: "${libro.titulo}". Ahora hay ${libro.copiasDisponibles} disp.`, 'success');
    window.dispatchEvent(new CustomEvent('libroActualizado', { detail: { libro } }));
    return true;
}

// Operaciones CRUD de Administración
async function guardarNuevoLibro(libroData) {
    // Generar ID único
    const maxId = stateLibros.reduce((max, l) => Math.max(max, l.id || 0), 0);
    libroData.id = maxId + 1;
    libroData.estado = libroData.copiasDisponibles > 0 ? 'Disponible' : 'Prestado';

    stateLibros.unshift(libroData);
    guardarLibrosEnMemoriaLocal(stateLibros);

    if (typeof apiInsertarLibroSupabase === 'function' && stateSupabaseEnLinea) {
        try {
            const resp = await apiInsertarLibroSupabase(libroData);
            if (resp && resp.id) libroData.id = resp.id;
        } catch (e) {
            console.warn('Guardado localmente. Error en Supabase:', e);
        }
    }

    mostrarToastGlobal(`Libro "${libroData.titulo}" agregado al catálogo con éxito.`, 'success');
    window.dispatchEvent(new CustomEvent('catalogoModificado', { detail: { accion: 'crear', libro: libroData } }));
    return libroData;
}

async function actualizarLibroExistente(id, datos) {
    const index = stateLibros.findIndex(l => l.id === parseInt(id, 10));
    if (index === -1) return null;

    datos.id = parseInt(id, 10);
    datos.estado = datos.copiasDisponibles > 0 ? 'Disponible' : 'Prestado';
    stateLibros[index] = { ...stateLibros[index], ...datos };
    guardarLibrosEnMemoriaLocal(stateLibros);

    if (typeof apiActualizarLibroSupabase === 'function' && stateSupabaseEnLinea) {
        try {
            await apiActualizarLibroSupabase(datos.id, datos);
        } catch (e) {
            console.warn('Actualizado localmente. Error en Supabase:', e);
        }
    }

    mostrarToastGlobal(`Libro "${datos.titulo}" actualizado correctamente.`, 'success');
    window.dispatchEvent(new CustomEvent('catalogoModificado', { detail: { accion: 'actualizar', libro: datos } }));
    return stateLibros[index];
}

async function eliminarLibroPorId(id) {
    const numId = parseInt(id, 10);
    const index = stateLibros.findIndex(l => l.id === numId);
    if (index === -1) return false;

    const [eliminado] = stateLibros.splice(index, 1);
    guardarLibrosEnMemoriaLocal(stateLibros);

    if (typeof apiEliminarLibroSupabase === 'function' && stateSupabaseEnLinea) {
        try {
            await apiEliminarLibroSupabase(numId);
        } catch (e) {
            console.warn('Eliminado localmente. Error en Supabase:', e);
        }
    }

    mostrarToastGlobal(`Libro "${eliminado.titulo}" eliminado permanentemente.`, 'info');
    window.dispatchEvent(new CustomEvent('catalogoModificado', { detail: { accion: 'eliminar', id: numId } }));
    return true;
}

async function sincronizarLoteConSupabase() {
    if (typeof apiMigrarLoteSupabase === 'function') {
        try {
            mostrarToastGlobal('Sincronizando inventario con Supabase...', 'info');
            const res = await apiMigrarLoteSupabase(stateLibros);
            if (res) {
                stateSupabaseEnLinea = true;
                mostrarToastGlobal('¡Inventario sincronizado exitosamente con la nube!', 'success');
                window.dispatchEvent(new CustomEvent('datosCargados', { detail: { libros: stateLibros, enLinea: true } }));
                return true;
            }
        } catch (e) {
            mostrarToastGlobal('Error al sincronizar con Supabase.', 'error');
            return false;
        }
    }
    return false;
}

async function restablecerCatalogoInicial() {
    stateLibros = JSON.parse(JSON.stringify(CATALOGO_INICIAL_MAESTRO));
    guardarLibrosEnMemoriaLocal(stateLibros);

    if (typeof apiMigrarLoteSupabase === 'function' && stateSupabaseEnLinea) {
        try {
            await apiMigrarLoteSupabase(stateLibros);
        } catch (e) { }
    }

    mostrarToastGlobal('Catálogo restablecido a los 18 ejemplares oficiales.', 'success');
    window.dispatchEvent(new CustomEvent('catalogoModificado', { detail: { accion: 'restablecer' } }));
    return stateLibros;
}

// ── Autenticación de Administrador (100% Supabase Auth con Tokens JWT) ──
function verificarSesionAdmin() {
    return stateEsAdmin || localStorage.getItem(STORAGE_KEY_ADMIN) === 'true';
}

async function iniciarSesionAdmin(email, password) {
    const correo = String(email || '').trim();
    const clave = String(password || '').trim();

    if (!correo || !clave) {
        return { 
            success: false, 
            message: 'Por favor ingresa tanto el correo electrónico como la contraseña de tu usuario de Supabase.' 
        };
    }

    if (typeof esSupabaseActivo !== 'function' || !esSupabaseActivo() || typeof apiIniciarSesionSupabase !== 'function') {
        return { 
            success: false, 
            message: 'No se pudo conectar con el servicio de autenticación de Supabase. Verifica tu conexión a internet.' 
        };
    }

    try {
        console.log('Autenticando usuario mediante Supabase Auth JWT:', correo);
        const dataAuth = await apiIniciarSesionSupabase(correo, clave);
        
        if (dataAuth && dataAuth.user) {
            stateEsAdmin = true;
            localStorage.setItem(STORAGE_KEY_ADMIN, 'true');
            mostrarToastGlobal(`¡Sesión iniciada con éxito (${dataAuth.user.email})!`, 'success');
            return { success: true, user: dataAuth.user };
        } else {
            return { 
                success: false, 
                message: 'No se pudo verificar la sesión con Supabase Auth.' 
            };
        }
    } catch (errSupabase) {
        console.warn('Error en Supabase Auth:', errSupabase);
        let errorMsg = 'Credenciales inválidas en Supabase Auth.';
        if (errSupabase && errSupabase.message) {
            if (errSupabase.message.includes('Invalid login credentials')) {
                errorMsg = 'Correo o contraseña incorrectos en Supabase Auth.';
            } else if (errSupabase.message.includes('Email not confirmed')) {
                errorMsg = 'El correo electrónico no ha sido confirmado en Supabase.';
            } else {
                errorMsg = errSupabase.message;
            }
        }
        return { success: false, message: errorMsg };
    }
}

async function cerrarSesionAdmin() {
    stateEsAdmin = false;
    localStorage.removeItem(STORAGE_KEY_ADMIN);
    if (typeof apiCerrarSesionSupabase === 'function') {
        try {
            await apiCerrarSesionSupabase();
        } catch (e) {}
    }
    mostrarToastGlobal('Sesión de administrador finalizada.', 'info');
    setTimeout(() => {
        window.location.reload();
    }, 400);
}

// ── Sistema de Toast Global ──
function mostrarToastGlobal(mensaje, tipo = 'info') {
    let container = document.getElementById('toast-container-global');
    if (!container) {
        container = document.createElement('div');
        container.id = 'toast-container-global';
        container.className = 'fixed bottom-20 md:bottom-6 right-6 z-[999] flex flex-col gap-2 pointer-events-none';
        document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    const borderCol = tipo === 'success' ? 'border-emerald-500' : (tipo === 'error' ? 'border-rose-500' : 'border-[#4647d7]');
    const icon = tipo === 'success' ? 'check_circle' : (tipo === 'error' ? 'error' : 'info');

    toast.className = `pointer-events-auto bg-[#191c1f] text-white px-5 py-3 rounded-xl shadow-2xl border-l-4 ${borderCol} flex items-center gap-3 text-sm font-medium transition-all duration-300 transform translate-y-4 opacity-0`;
    toast.innerHTML = `
        <span class="material-symbols-outlined text-[20px]">${icon}</span>
        <span>${mensaje}</span>
    `;

    container.appendChild(toast);

    requestAnimationFrame(() => {
        toast.classList.remove('translate-y-4', 'opacity-0');
    });

    setTimeout(() => {
        toast.classList.add('translate-y-4', 'opacity-0');
        setTimeout(() => toast.remove(), 300);
    }, 4000);
}

// ── Helper para Extraer Código de Estantería Física ──
function obtenerCodigoEstanteria(libro) {
    if (!libro || !libro.ubicacion) return 'A1';
    const cod = (libro.ubicacion.codigo || '').toUpperCase();
    const matchCod = cod.match(/([A-D][1-5])/i);
    if (matchCod) return matchCod[1].toUpperCase();

    const est = (libro.ubicacion.estanteria || '').toUpperCase();
    const matchEst = est.match(/([A-D])/i);
    if (matchEst) return matchEst[1].toUpperCase() + '1';

    return 'A1';
}

// ── Modal Global de Disponibilidad & Ubicación en Sala ──
function abrirModalDisponibilidad(idLibro) {
    const libro = typeof idLibro === 'object' ? idLibro : obtenerLibroPorId(idLibro);
    if (!libro) {
        mostrarToastGlobal('No se encontró la información del libro solicitado.', 'error');
        return;
    }

    const total = typeof libro.copiasTotal === 'number' ? libro.copiasTotal : 1;
    const disp = typeof libro.copiasDisponibles === 'number' ? libro.copiasDisponibles : (libro.estado === 'Disponible' ? 1 : 0);
    const shelfCode = obtenerCodigoEstanteria(libro);

    // Estado y colores de disponibilidad
    let estadoClase = 'bg-emerald-50 text-emerald-900 border-emerald-200';
    let estadoIcono = 'check_circle';
    let estadoTitulo = 'Disponible para Consulta y Préstamo';
    let estadoTexto = `${disp} de ${total} ejemplares disponibles en sala`;

    if (disp === 0) {
        estadoClase = 'bg-rose-50 text-rose-900 border-rose-200';
        estadoIcono = 'cancel';
        estadoTitulo = 'Ejemplar Agotado Temporalmente';
        estadoTexto = `Todos los ejemplares (${total}) se encuentran prestados actualmente.`;
    } else if (disp === 1 && total > 1) {
        estadoClase = 'bg-amber-50 text-amber-900 border-amber-200';
        estadoIcono = 'warning';
        estadoTitulo = 'Última Copia Disponible';
        estadoTexto = `Solo queda 1 ejemplar de ${total} en estantería.`;
    }

    let modal = document.getElementById('modalDisponibilidadGlobal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'modalDisponibilidadGlobal';
        modal.className = 'fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity duration-300 opacity-0 pointer-events-none';
        modal.innerHTML = `
            <div id="modalDisponibilidadCard" class="relative w-full max-w-lg bg-surface-container-lowest rounded-3xl p-6 md:p-8 shadow-2xl border border-outline-variant/30 transform scale-95 transition-all duration-300 flex flex-col gap-5 text-on-surface">
                <!-- Botón Cerrar X -->
                <button onclick="cerrarModalDisponibilidad()" class="absolute top-5 right-5 w-8 h-8 rounded-full bg-surface-container hover:bg-surface-container-high flex items-center justify-center text-on-surface-variant hover:text-on-surface transition-colors">
                    <span class="material-symbols-outlined text-[20px]">close</span>
                </button>

                <!-- Encabezado Modal -->
                <div class="flex items-center gap-3 pr-8">
                    <div class="w-10 h-10 rounded-2xl bg-secondary-fixed text-primary flex items-center justify-center shrink-0">
                        <span class="material-symbols-outlined text-[22px]">inventory_2</span>
                    </div>
                    <div>
                        <span class="text-[11px] font-bold tracking-wider uppercase text-secondary block">Inventario de Biblioteca</span>
                        <h3 class="text-lg font-bold text-primary-container leading-tight">Disponibilidad & Ubicación</h3>
                    </div>
                </div>

                <!-- Resumen del Libro -->
                <div class="p-3.5 bg-surface-container-low rounded-2xl border border-outline-variant/20 flex items-center gap-4">
                    <img id="modalDispImg" src="" alt="Portada" class="w-14 aspect-[2/3] object-cover rounded-lg shadow-sm shrink-0 bg-primary-container" onerror="this.src='images/cover-1.jpg'">
                    <div class="flex flex-col flex-1 min-w-0">
                        <span id="modalDispCat" class="text-[10px] font-bold uppercase text-secondary tracking-wide"></span>
                        <h4 id="modalDispTitulo" class="font-bold text-sm text-primary-container truncate"></h4>
                        <span id="modalDispAutor" class="text-xs text-on-surface-variant truncate"></span>
                        <span id="modalDispEditorial" class="text-[11px] text-on-surface-variant/80 mt-0.5"></span>
                    </div>
                </div>

                <!-- Caja de Estado de Disponibilidad -->
                <div id="modalDispStatusBox" class="p-3.5 rounded-2xl border flex items-center gap-3">
                    <span id="modalDispStatusIcon" class="material-symbols-outlined text-[24px] shrink-0"></span>
                    <div class="flex flex-col flex-1">
                        <strong id="modalDispStatusTitle" class="text-xs font-bold leading-tight"></strong>
                        <span id="modalDispStatusText" class="text-xs mt-0.5 opacity-90"></span>
                    </div>
                </div>

                <!-- Desglose de Coordenadas Físicas -->
                <div class="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
                    <div class="p-2.5 bg-surface-container-low rounded-xl border border-outline-variant/20 flex flex-col">
                        <span class="text-[10px] font-semibold text-on-surface-variant uppercase">Estantería</span>
                        <strong id="modalDispEstanteria" class="text-primary-container font-bold text-xs mt-0.5"></strong>
                    </div>
                    <div class="p-2.5 bg-surface-container-low rounded-xl border border-outline-variant/20 flex flex-col">
                        <span class="text-[10px] font-semibold text-on-surface-variant uppercase">Código</span>
                        <strong id="modalDispCodigo" class="text-primary-container font-bold text-xs mt-0.5 font-mono"></strong>
                    </div>
                    <div class="p-2.5 bg-surface-container-low rounded-xl border border-outline-variant/20 flex flex-col">
                        <span class="text-[10px] font-semibold text-on-surface-variant uppercase">Sección</span>
                        <strong id="modalDispSeccion" class="text-primary-container font-bold text-xs mt-0.5 truncate"></strong>
                    </div>
                    <div class="p-2.5 bg-surface-container-low rounded-xl border border-outline-variant/20 flex flex-col">
                        <span class="text-[10px] font-semibold text-on-surface-variant uppercase">Nivel</span>
                        <strong id="modalDispNivel" class="text-primary-container font-bold text-xs mt-0.5"></strong>
                    </div>
                </div>

                <!-- Botones de Acción -->
                <div class="flex flex-col sm:flex-row items-center gap-3 pt-2">
                    <a id="modalDispBtnMapa" href="mapa.html" class="w-full sm:flex-1 py-3 px-4 rounded-full bg-primary-container hover:bg-secondary text-white font-bold text-xs text-center transition-all shadow-md flex items-center justify-center gap-2 group">
                        <span class="material-symbols-outlined text-[18px] group-hover:scale-110 transition-transform">explore</span>
                        <span>Ver en Mapa de Sala</span>
                    </a>
                    <a id="modalDispBtnDetalle" href="detalle.html" class="w-full sm:w-auto py-3 px-5 rounded-full bg-surface-container hover:bg-surface-container-high text-primary-container font-bold text-xs text-center transition-all border border-outline-variant/30 flex items-center justify-center gap-1.5">
                        <span class="material-symbols-outlined text-[16px]">menu_book</span>
                        <span>Ver Ficha</span>
                    </a>
                </div>
            </div>
        `;
        document.body.appendChild(modal);

        modal.addEventListener('click', (e) => {
            if (e.target === modal) cerrarModalDisponibilidad();
        });
    }

    // Inyectar datos del libro
    document.getElementById('modalDispImg').src = libro.imagen || 'images/cover-1.jpg';
    document.getElementById('modalDispCat').textContent = libro.categoria || 'General';
    document.getElementById('modalDispTitulo').textContent = libro.titulo || 'Sin Título';
    document.getElementById('modalDispAutor').textContent = libro.autor ? `por ${libro.autor}` : '';
    document.getElementById('modalDispEditorial').textContent = `${libro.editorial || 'Biblioteca Humboldt'} · ${libro.anio || ''}`;

    const statusBox = document.getElementById('modalDispStatusBox');
    statusBox.className = `p-3.5 rounded-2xl border flex items-center gap-3 ${estadoClase}`;
    document.getElementById('modalDispStatusIcon').textContent = estadoIcono;
    document.getElementById('modalDispStatusTitle').textContent = estadoTitulo;
    document.getElementById('modalDispStatusText').textContent = estadoTexto;

    const ubi = libro.ubicacion || {};
    document.getElementById('modalDispEstanteria').textContent = ubi.estanteria || `Estantería ${shelfCode.charAt(0)}`;
    document.getElementById('modalDispCodigo').textContent = ubi.codigo || `Est. ${shelfCode} · 01`;
    document.getElementById('modalDispSeccion').textContent = ubi.seccion || 'General';
    document.getElementById('modalDispNivel').textContent = ubi.nivel || 'Nivel 1';

    // Configurar enlaces directos
    document.getElementById('modalDispBtnMapa').href = `mapa.html?shelf=${encodeURIComponent(shelfCode)}`;
    document.getElementById('modalDispBtnDetalle').href = `detalle.html?id=${libro.id}`;

    // Mostrar modal con animación fluida
    modal.classList.remove('opacity-0', 'pointer-events-none');
    const card = document.getElementById('modalDisponibilidadCard');
    if (card) {
        card.classList.remove('scale-95');
        card.classList.add('scale-100');
    }
    document.body.style.overflow = 'hidden';
}

function cerrarModalDisponibilidad() {
    const modal = document.getElementById('modalDisponibilidadGlobal');
    if (!modal) return;

    modal.classList.add('opacity-0', 'pointer-events-none');
    const card = document.getElementById('modalDisponibilidadCard');
    if (card) {
        card.classList.remove('scale-100');
        card.classList.add('scale-95');
    }
    document.body.style.overflow = '';
}

// Alias para compatibilidad con código existente
const abrirModalUbicacion = abrirModalDisponibilidad;
const mostrarUbicacion = abrirModalDisponibilidad;

// Cerrar con tecla Escape
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        cerrarModalDisponibilidad();
    }
});

// Helpers de escape HTML
function escapeHTML(str) {
    if (!str) return '';
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

// Iniciar automáticamente al cargar cualquier página
document.addEventListener('DOMContentLoaded', () => {
    inicializarMotorDatos();
});
