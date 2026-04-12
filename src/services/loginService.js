const pool = require('../config/database.js');

/*
Solicitamos id y nombre de usuario utilizando parametrización para evitar inyección sql
*/

async function obtenerUsuario(usuario,clave){
    const result = await pool.query(
    `SELECT id_usuario, concat(nombre, ' ',apellido1, ' ',apellido2) as nombre
    FROM usuario
    WHERE id_usuario = $1
    AND clave = $2
    AND estado = 'V'`,
    [ usuario, clave ]
);
    return result.rows[0]
};

module.exports = { obtenerUsuario }