const pool = require("../config/database.js")

async function loginUsuario(usuario, clave) {

    /*
    Se ejecuta una consulta SQL usando parámetros.
    $1 y $2 son marcadores de posición que luego se
    reemplazan con los valores enviados en el arreglo.
    Esto evita problemas de seguridad como SQL Injection.
  */

    const result = await pool.query(
        `SELECT
            u.id_usuario,
            concat(u.nombre ,' ',u.apellido1,' ',u.apellido2) as nombre,
            ur.id_rol,
            r.nombre as nombre_rol
        FROM usuario u
        JOIN usuario_rol ur ON ur.id_usuario = u.id_usuario
        JOIN rol r ON r.id_rol = ur.id_rol
        WHERE u.id_usuario = $1
        AND clave = $2
        AND estado = 'V'`,
        // Valores que reemplazan $1 y $2
        [usuario, clave]
    )

    /*
    result.rows contiene un arreglo con los registros encontrados.

    Ejemplo:
    [
        { id_usuario: 'JFLORES', nombre: 'Juan', id_rol: 'ADMIN', nombre_rol: 'Administrador' }
    ]

    Como el login debería encontrar solo un usuario,
    se devuelve el primer elemento del arreglo.
    En caso que no coincida clave ni usuario, se devuelve vacio [].
    */
    return result.rows[0]
}

module.exports = { loginUsuario }