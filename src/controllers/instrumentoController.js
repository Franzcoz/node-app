const instrumentoService = require("../services/instrumentoService.js");
const { saveLog } = require("../utils/fileLogger");

const instrumentoController = {
    getAll: async (req, res) => {
        try {
            const inst = await instrumentoService.getAll();
            res.json(inst);
        } catch (err) {
            saveLog(`usuario:${req.body.usuario} | GET /instrumento | ${err.stack}`)
            res.status(400).json({ error: "Error al consultar instrumentos" });
        }
    },
    getById: async (req, res) => {
        const instId = await instrumentoService.getById(req.params.id);
        res.json({instrum: instId});
    },
    create: async (req, res) => {
        try {
            const nuevo = await instrumentoService.create(req.body);
            res.status(201).json(nuevo);
        } catch (err) {
            saveLog(`usuario:${req.body.usuario} | POST /instrumento | ${err.stack}`)
            res.status(400).json({ error: "No fue posible guardar el instrumento" });
        }
    },
    update: async (req, res) => {
        try {
            const mod = await instrumentoService.update(req.params.id, req.body);
            res.json(mod);
        } catch (err) {
            saveLog(`usuario:${req.body.usuario} | PUT /instrumento | ${err.stack}`)
            res.status(400).json({ error: "Error al modificar el instrumento" });
        }
    },
    delete: async (req, res)=>{
        try {
            const del = await instrumentoService.delete(req.params.id);
            res.json(del);
        } catch (err) {
            saveLog(`usuario:${req.body.usuario} | DELETE /instrumento | ${err.stack}`)
            res.status(400).json({ error: "Error al eliminar el instrumento" });
        }
    },
};

module.exports = instrumentoController;