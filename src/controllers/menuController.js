const { obtenerMenusUsuario } = require("../services/menuService.js");

const getMenus = async (req, res) => {
    const usuario = req.query.user;
    const menus = await obtenerMenusUsuario(usuario);
    res.json(menus);
    console.log(menus);
}

module.exports = { getMenus }