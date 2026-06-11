const precioMercado = require("../models/precioModel.js");
const { success, error } = require('../utils/response.js');
const { saveLog } = require('../utils/fileLogger');

const precioController = {
    async cargarArchivo(req, res) {
        try {
            const archivo = req.file;
            console.log(req.file);
            if (!archivo) {
                return error(res, 'Archivo requerido', 400);
            }
            console.log(archivo);
            const result = await precioMercado.cargarArchivo(archivo.path);
            return success(res, result, 'Archivo procesado correctamente');
        } catch (err) {
            saveLog(`Cargar Precios| ${err.stack}`);
            return error(res, 'Error procesando archivo');
        }
    },
};

module.exports = precioController;