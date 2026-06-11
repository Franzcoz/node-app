const jwt = require("jsonwebtoken")
const { loginUsuario } = require("../services/authService.js")

require("dotenv").config()
const SECRET = process.env.PORTAFOLIO_JWT_SECRET

const login = async (req, res) => {
    const { usuario, clave } = req.body
    const user = await loginUsuario(usuario, clave)
    if (!user) {
        return res.status(401).json({ mensaje: "Credenciales incorrectas" });
    };

    const token = jwt.sign(
        { id_usuario: user.id_usuario, id_rol: user.id_rol },
        SECRET,
        { expiresIn: "2h" }
    );

    res.cookie('authToken', token, {
        httpOnly: true, //No accesible desde JavaScript (seguro)
        secure: true,
        maxAge: 7200000, // 2 horas
        sameSite: 'strict'
    });

    res.json({
        usuario: user
    });
}

module.exports = { login }