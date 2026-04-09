const pool = require('../config/database.js');

/*
Obtiene los menús permitidos para un usuario.
El usuario puede tener uno o más roles.
Cada rol tiene asociados ciertos menús.
*/

async function obtenerUsuario(usuario,clave){
    const result = await pool.query(
    `SELECT id_usuario, concat(nombre, ' ',apellido1, ' ',apellido2) as nombre
    FROM usuario
    WHERE id_usuario = '${usuario}'
    AND clave = '${clave}'
    AND estado = 'V'`);
    return result.rows[0]
};

module.exports = { obtenerUsuario }