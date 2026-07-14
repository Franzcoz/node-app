const jwt = require("jsonwebtoken");
require("dotenv").config();

const SECRET = process.env.PORTAFOLIO_JWT_SECRET;
const verificarToken = (req, res, next) => {
    // Obtener token desde cookies
    const authToken = req.cookies.authToken;
    // Detectar si es petición de navegación o fetch desde script
    const isFetch = (req.headers['sec-fetch-mode'] === 'cors' &&
        req.headers['sec-fetch-dest'] != 'document');
    const isNavigation = req.get('sec-fetch-mode') === 'navigate';

    // Si no hay token
    if (!authToken) {
        // Respuesta adaptada a origen de petición ya sea fetch o desde navegador
        if (isFetch) {
            // Se envía objeto json a solicitud fetch
            res.status(401).json({ mensaje: "token requerido" });
            return;
        } else if (isNavigation) {
            // Se redirecciona desde servidor
            return res.redirect('/login');
        } else {
            res.status(401).json({ mensaje: "token requerido" });
            return
        }
    }
    //const token = authHeader.split(" ")[1];
    try {
        const decoded = jwt.verify(authToken, SECRET);
        req.usuario = decoded;
        next();
    } catch (err) {
        if (isFetch) {
            // Se envía objeto json a solicitud fetch
            //res.clearCookie('authToken');
            return res.status(401).json({ mensaje: "token inválido" });
        } else if (isNavigation) {
            // Se redirecciona desde servidor
            return res.redirect('/login');
        }
    }
};

module.exports = { verificarToken };
