const { UsuarioRol, Menu, RolMenu, Rol, sequelize } = require('../models/sequelizeModels.js');

async function obtenerMenusUsuario(usuario){
    try {
        const res = await UsuarioRol.findAll(
            {
                attributes: [],
                include: {
                    model: Rol,
                    attributes: [],
                    include: {
                        model: RolMenu,
                        attributes: [],
                        include: {
                            model: Menu,
                            attributes: [
                                'id_menu',
                                'nombre',
                                'ruta'
                            ]
                        }
                    }
                },
                where: {
                    id_usuario: usuario
                },
                order: [
                    [{ model: Rol }, { model: RolMenu }, { model: Menu }, 'nombre', 'ASC']
                ],
                distinct: true,
                raw: true,
            },
        );
        const menus = res.map(m => ({
            id_menu: m['Rol.RolMenus.Menu.id_menu'],
            nombre: m['Rol.RolMenus.Menu.nombre'],
            ruta: m['Rol.RolMenus.Menu.ruta']
        }));

        return menus;
    } catch (error) {
        throw error
    };
};

module.exports = { obtenerMenusUsuario }