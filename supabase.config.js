/**
 * ============================================================
 * CONFIGURACIÓN DE SUPABASE — BIBLIOTECA COLEGIO HUMBOLDT
 * ============================================================
 * 
 * Instrucciones:
 * 1. Crea un proyecto gratuito en https://supabase.com
 * 2. Copia tu URL de proyecto y tu Anon Key (Project Settings -> API)
 * 3. Pégalos en las constantes SUPABASE_URL y SUPABASE_ANON_KEY a continuación.
 * 
 * Si dejas los valores por defecto o vacíos, el sistema continuará
 * funcionando automáticamente en Modo Local (localStorage).
 * ============================================================
 */

const SUPABASE_CONFIG = {
    // URL raíz de tu proyecto en Supabase (sin /rest/v1/)
    url: 'https://xabwigkfiaudlteqcfon.supabase.co',

    // Clave anónima pública (anon key)
    anonKey: 'sb_publishable_g-MnXeMyWzb7NTvnaoGZjg_ReU5i0WD'
};

// Instancia global del cliente de Supabase
let supabaseClient = null;

/**
 * Inicializa el cliente de Supabase si la librería y las credenciales están disponibles.
 */
function inicializarSupabase() {
    if (typeof window.supabase !== 'undefined' && SUPABASE_CONFIG.url && SUPABASE_CONFIG.anonKey) {
        try {
            // Limpiar la URL en caso de que termine en /rest/v1/ o barras extras
            let urlLimpia = SUPABASE_CONFIG.url.trim().replace(/\/rest\/v1\/?$/, '').replace(/\/+$/, '');
            supabaseClient = window.supabase.createClient(urlLimpia, SUPABASE_CONFIG.anonKey.trim());
            console.log('✅ Conexión con Supabase inicializada correctamente con URL:', urlLimpia);
            return true;
        } catch (err) {
            console.error('❌ Error al inicializar Supabase:', err);
            supabaseClient = null;
            return false;
        }
    }
    return false;
}

/**
 * Verifica si Supabase está activo y configurado.
 */
function esSupabaseActivo() {
    return supabaseClient !== null;
}

/**
 * Mapea un registro de la base de datos Supabase al formato de la aplicación JS.
 */
function mapearLibroDesdeSupabase(row) {
    if (!row) return null;
    return {
        id: row.id,
        titulo: row.titulo || '',
        autor: row.autor || '',
        categoria: row.categoria || 'General',
        editorial: row.editorial || '',
        anio: row.anio || 0,
        isbn: row.isbn || '',
        estado: row.estado || 'Disponible',
        copiasTotal: typeof row.copias_total !== 'undefined' ? row.copias_total : (row.copiasTotal || 1),
        copiasDisponibles: typeof row.copias_disponibles !== 'undefined' ? row.copias_disponibles : (row.copiasDisponibles || 0),
        imagen: row.imagen || null,
        ubicacion: typeof row.ubicacion === 'object' && row.ubicacion !== null ? row.ubicacion : {
            estanteria: 'Estantería A',
            seccion: 'General',
            nivel: 'Nivel 1'
        }
    };
}

/**
 * Mapea un objeto libro de JavaScript al formato de columnas en Supabase.
 */
function mapearLibroHaciaSupabase(libro) {
    return {
        titulo: libro.titulo,
        autor: libro.autor,
        categoria: libro.categoria,
        editorial: libro.editorial || null,
        anio: libro.anio ? parseInt(libro.anio, 10) : null,
        isbn: libro.isbn || null,
        estado: libro.estado || 'Disponible',
        copias_total: typeof libro.copiasTotal !== 'undefined' ? libro.copiasTotal : 1,
        copias_disponibles: typeof libro.copiasDisponibles !== 'undefined' ? libro.copiasDisponibles : 1,
        imagen: libro.imagen || null,
        ubicacion: libro.ubicacion || {
            estanteria: 'Estantería A',
            seccion: 'General',
            nivel: 'Nivel 1'
        }
    };
}

/**
 * Consulta todos los libros desde Supabase ordenados por ID.
 */
async function apiObtenerLibrosSupabase() {
    if (!esSupabaseActivo()) return null;
    try {
        const { data, error } = await supabaseClient
            .from('libros')
            .select('*')
            .order('id', { ascending: true });

        if (error) {
            console.error('Error al obtener libros de Supabase:', error);
            return null;
        }
        return (data || []).map(mapearLibroDesdeSupabase);
    } catch (err) {
        console.error('Excepción al consultar Supabase:', err);
        return null;
    }
}

/**
 * Inserta un nuevo libro en Supabase.
 */
async function apiInsertarLibroSupabase(libro) {
    if (!esSupabaseActivo()) return null;
    try {
        const payload = mapearLibroHaciaSupabase(libro);
        const { data, error } = await supabaseClient
            .from('libros')
            .insert([payload])
            .select();

        if (error) {
            console.error('Error al insertar libro en Supabase:', error);
            throw error;
        }
        return data && data[0] ? mapearLibroDesdeSupabase(data[0]) : null;
    } catch (err) {
        console.error('Excepción al insertar en Supabase:', err);
        throw err;
    }
}

/**
 * Actualiza un libro existente en Supabase.
 */
async function apiActualizarLibroSupabase(id, datosActualizados) {
    if (!esSupabaseActivo()) return null;
    try {
        const payload = mapearLibroHaciaSupabase(datosActualizados);
        payload.updated_at = new Date().toISOString();

        const { data, error } = await supabaseClient
            .from('libros')
            .update(payload)
            .eq('id', id)
            .select();

        if (error) {
            console.error('Error al actualizar libro en Supabase:', error);
            throw error;
        }
        return data && data[0] ? mapearLibroDesdeSupabase(data[0]) : null;
    } catch (err) {
        console.error('Excepción al actualizar en Supabase:', err);
        throw err;
    }
}

/**
 * Elimina un libro de Supabase por ID.
 */
async function apiEliminarLibroSupabase(id) {
    if (!esSupabaseActivo()) return null;
    try {
        const { error } = await supabaseClient
            .from('libros')
            .delete()
            .eq('id', id);

        if (error) {
            console.error('Error al eliminar libro en Supabase:', error);
            throw error;
        }
        return true;
    } catch (err) {
        console.error('Excepción al eliminar en Supabase:', err);
        throw err;
    }
}

/**
 * Migra o sincroniza un lote de libros hacia Supabase.
 */
async function apiMigrarLoteSupabase(listaLibros) {
    if (!esSupabaseActivo()) return null;
    try {
        const registros = listaLibros.map(l => {
            const row = mapearLibroHaciaSupabase(l);
            if (l.id) row.id = l.id;
            return row;
        });

        const { data, error } = await supabaseClient
            .from('libros')
            .upsert(registros, { onConflict: 'id' })
            .select();

        if (error) {
            console.error('Error al migrar lote a Supabase:', error);
            throw error;
        }
        return (data || []).map(mapearLibroDesdeSupabase);
    } catch (err) {
        console.error('Excepción al migrar lote a Supabase:', err);
        throw err;
    }
}

/**
 * ============================================================
 * MÓDULO DE AUTENTICACIÓN SEGURA (Supabase Auth)
 * ============================================================
 */

/**
 * Inicia sesión de administrador con correo y contraseña en Supabase.
 */
async function apiIniciarSesionSupabase(email, password) {
    if (!esSupabaseActivo()) return null;
    try {
        const { data, error } = await supabaseClient.auth.signInWithPassword({
            email: email.trim(),
            password: password
        });

        if (error) {
            console.error('Error al iniciar sesión en Supabase:', error);
            throw error;
        }
        return data;
    } catch (err) {
        console.error('Excepción al autenticar en Supabase:', err);
        throw err;
    }
}

/**
 * Cierra la sesión activa de administrador en Supabase.
 */
async function apiCerrarSesionSupabase() {
    if (!esSupabaseActivo()) return;
    try {
        await supabaseClient.auth.signOut();
    } catch (err) {
        console.warn('Error al cerrar sesión en Supabase:', err);
    }
}

/**
 * Obtiene la sesión o usuario actualmente autenticado en Supabase.
 */
async function apiObtenerSesionActivaSupabase() {
    if (!esSupabaseActivo()) return null;
    try {
        const { data, error } = await supabaseClient.auth.getSession();
        if (error || !data || !data.session) return null;
        return data.session.user;
    } catch (err) {
        console.warn('Error al verificar sesión en Supabase:', err);
        return null;
    }
}

