const { Usuario } = require('./sequelizeModels.js');

const registroModel = {
    async getUsuario(user) {
        const res = await Usuario.findOne(
            {
                attributes: {
                    include: ['id_usuario'],
                    exclude: ['clave','nombre','apellido1','apellido2','email','estado']
                },
                where: {
                    id_usuario: user,
                },
                raw: true,
            }
        );
        return res;
    },
    async createUsuario({ id_usuario, clave, nombre, apellido1, apellido2, email }) {
        const user = await Usuario.create(
            {
                id_usuario,
                clave,
                nombre,
                apellido1,
                apellido2,
                email,
                estado: 'N'
            }
        );
        return { id_usuario: user.id_usuario };
    }
};

module.exports = registroModel;