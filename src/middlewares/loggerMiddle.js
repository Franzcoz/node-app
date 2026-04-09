const logfs = require('../utils/fileLogger.js');

function loggerMiddleware(req, res, next) {
    if (
        // Se condiciona el registro en log a tipos de rutas específicas
        req.originalUrl.endsWith('.html') ||
        req.originalUrl.startsWith('/api') || // solicitudes API
        req.originalUrl === '/' // página principal
    ) {
        // Se llama a función logfs con mensaje que incluye método de petición y ruta visitada
        logfs.saveLog(`Solicitud ${req.method} en ${req.originalUrl}`);
    }

    next(); // Se continúa a siguiente middleware
}

module.exports = loggerMiddleware;