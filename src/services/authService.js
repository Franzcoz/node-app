const { Usuario, Rol, sequelize } = require('../models/sequelizeModels.js');

async function loginUsuario(usuario, clave) {
    try {
        const res = await Usuario.findOne(
            {
                attributes: {
                    include: [
                        [sequelize.fn('concat', sequelize.col('Usuario.nombre'), ' ', sequelize.col('Usuario.apellido1'), ' ', sequelize.col('Usuario.apellido2')),
                            'nombre']
                    ],
                    exclude: [
                        'clave', 'nombre', 'apellido1', 'apellido2', 'email', 'estado'
                    ]
                },
                include: [
                    {
                        model: Rol,
                        attributes: ['id_rol', ['nombre', 'nombre_rol']],
                        required: true,
                        through: { attributes: [] }
                    }
                ],
                where: {
                    id_usuario: usuario,
                    clave: clave,
                    estado: 'V'
                },
                raw: true,
                subQuery: false,
                nest: true// Anida objetos pero con nombres más simples
            }
        );
        return res;
    } catch (error) {
        throw error;
    }
}

module.exports = { loginUsuario }