const pool = require('../config/database.js');

/*
Obtiene los menús permitidos para un usuario.
El usuario puede tener uno o más roles.
Cada rol tiene asociados ciertos menús.
*/

async function obtenerMenusUsuario(usuario){
    console.log(usuario);
    const result = await pool.query(

    `
    SELECT DISTINCT
        m.id_menu,
        m.nombre,
        m.ruta
    FROM usuario_rol ur
    JOIN rol_menu rm
        ON ur.id_rol = rm.id_rol
    JOIN menu m
        ON rm.id_menu = m.id_menu
    WHERE ur.id_usuario = '${usuario}'
    ORDER BY m.nombre
    `,
    )
    // rows contiene la lista de menús permitidos
return result.rows;
};

module.exports = { obtenerMenusUsuario }