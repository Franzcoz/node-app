const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { saveLog } = require("../utils/fileLogger.js");
const { loginUsuario } = require("../services/authService.js");

require("dotenv").config()
const SECRET = process.env.PORTAFOLIO_JWT_SECRET

const login = async (req, res) => {
    const { usuario, clave } = req.body

    // Obtener usuario y hash de clave desde BD
    const user = await loginUsuario(usuario);
    if (!user) {
        return res.status(401).json({ mensaje: "Credenciales incorrectas" });
    };
    // Comparar hash con clave ingresada
    const esIgual = await bcrypt.compare(clave, user.clave);
    if (!esIgual) {
        return res.status(401).json({ mensaje: "Credenciales incorrectas" });
    };
    // ELiminar clave (hash) de datos a enviar a cliente
    delete user.clave;

    // Generación de token usando usuario y rol
    const token = jwt.sign(
        { id_usuario: user.id_usuario, id_rol: user.Rols.id_rol },
        SECRET,
        { expiresIn: "2h" }
    );

    // Guardado de token como cookie
    res.cookie('authToken', token, {
        httpOnly: true,
        secure: true,
        maxAge: 7200000, // 2 horas
        sameSite: 'strict'
    });

    saveLog(`Sesión iniciada. Usuario: ${user.id_usuario}. Rol: ${user.Rols.id_rol}`);

    // Envío de datos a cliente
    res.json({
        usuario: user
    });
}

module.exports = { login }