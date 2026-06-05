const operacionModel = require("../models/operacionModel.js");
const { success, error } = require('../utils/response.js');

const operacionController = {
    async buscar(req, res) {
        try {
            const data = await operacionModel.buscar(req.query);
            success(res, data, 'Operaciones obtenidas');
        } catch (err) {
            console.error(err);
            error(res, 'Error al consultar operaciones');
        }
    },
    async crearCompra(req, res) {
        try {
            const data = await operacionModel.crearCompra(req.body);
            success(res, data, 'Compra creada correctamente');
        } catch (err) {
            console.error(err);
            error(res, 'Error al crear compra');
        }
    },
};

module.exports = operacionController;