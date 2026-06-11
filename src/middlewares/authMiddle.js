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
        console.log(1);
        //console.log(req);
        if (isFetch) {
            console.log(11)
            // Se envía objeto json a solicitud fetch
            res.status(401).json({ mensaje: "token requerido" });
            return;
        } else if (isNavigation) {
            console.log(12)
            // Se redirecciona desde servidor
            return res.redirect('/login');
        } else {
            res.status(401).json({ mensaje: "token requerido" });
            return
        }
    }
    //const token = authHeader.split(" ")[1];
    try {
        console.log(2);
        //console.log(authToken);
        const decoded = jwt.verify(authToken, SECRET);
        req.usuario = decoded;
        next();
    } catch (err) {
        console.log(3);
        //console.log(req);
        if (isFetch) {
            console.log(31)
            // Se envía objeto json a solicitud fetch
            //res.clearCookie('authToken');
            return res.status(401).json({ mensaje: "token inválido" });
        } else if (isNavigation) {
            console.log(32)
            // Se redirecciona desde servidor
            return res.redirect('/login');
        }
    }
};

module.exports = { verificarToken };
