const { obtenerUsuario } = require("../services/loginService.js");

const getUsuario = async (req, res) => {
    const { usuario, clave } = req.body;
    const user = await obtenerUsuario(usuario,clave);
    res.json({usuario: user});
}

module.exports = { getUsuario }