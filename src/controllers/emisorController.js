const emisorService = require("../services/emisorService.js");
const { saveLog } = require("../utils/fileLogger.js");

const emisorController = {
    getAll: async (req, res) => {
        try {
            const inst = await emisorService.getAll();
            res.json(inst);
        } catch (err) {
            saveLog(`usuario:${req.body.usuario} | GET /emisor | ${err.stack}`)
            res.status(400).json({ error: "Error al consultar emisores" });
        }
    },
    create: async (req, res) => {
        try {
            const nuevo = await emisorService.create(req.body);
            res.status(201).json(nuevo);
        } catch (err) {
            saveLog(`usuario:${req.body.usuario} | POST /emisor | ${err.stack}`)
            res.status(400).json({ error: "No fue posible guardar el emisor" });
        }
    },
    update: async (req, res) => {
        try {
            const mod = await emisorService.update(req.params.id, req.body);
            res.json(mod);
        } catch (err) {
            saveLog(`usuario:${req.body.usuario} | PUT /emisor | ${err.stack}`)
            res.status(400).json({ error: "Error al modificar el emisor" });
        }
    },
    delete: async (req, res)=>{
        try {
            const del = await emisorService.delete(req.params.id);
            res.json(del);
        } catch (err) {
            saveLog(`usuario:${req.body.usuario} | DELETE /emisor | ${err.stack}`)
            res.status(400).json({ error: "Error al eliminar el emisor" });
        }
    },
};

module.exports = emisorController;