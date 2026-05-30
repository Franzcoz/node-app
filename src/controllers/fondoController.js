const fondoService = require("../services/fondoService.js");
const { saveLog } = require("../utils/fileLogger.js");

const fondoController = {
    getAll: async (req, res) => {
        try {
            const inst = await fondoService.getAll();
            res.json(inst);
        } catch (err) {
            saveLog(`GET /fondo | ${err.stack}`)
            res.status(400).json({ error: "Error al consultar fondos" });
        }
    },
    getById: async (req, res) => {
        const instId = await fondoService.getById(req.params.id);
        res.json({instrum: instId});
    },
    create: async (req, res) => {
        try {
            const nuevo = await fondoService.create(req.body);
            res.status(201).json(nuevo);
        } catch (err) {
            saveLog(`usuario:${req.body.usuario} | POST /fondo | ${err.stack}`)
            res.status(400).json({ error: "No fue posible guardar el fondo" });
        }
    },
    update: async (req, res) => {
        try {
            const mod = await fondoService.update(req.params.id, req.body);
            res.json(mod);
        } catch (err) {
            saveLog(`usuario:${req.body.usuario} | PUT /fondo | ${err.stack}`)
            res.status(400).json({ error: "Error al modificar el fondo" });
        }
    },
    delete: async (req, res)=>{
        try {
            const del = await fondoService.delete(req.params.id);
            res.json(del);
        } catch (err) {
            saveLog(`usuario:${req.body.usuario} | DELETE /fondo | ${err.stack}`)
            res.status(400).json({ error: "Error al eliminar el fondo" });
        }
    },
};

module.exports = fondoController;