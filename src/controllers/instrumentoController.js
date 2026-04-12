const instrumentoService = require("../services/instrumentoService.js");

const instrumentoController = {
    getAll: async (req, res) => {
        const inst = await instrumentoService.getAll();
        res.json(inst);
    },
    getById: async (req, res) => {
        const instId = await instrumentoService.getById(req.params.id);
        res.json({instrum: instId});
    },
    create: async (req, res) => {
        const nuevo = await instrumentoService.create(req.body);
        res.status(201).json(nuevo);
    },
    update: async (req, res) => {
        const mod = await instrumentoService.update(req.params.id, req.body);
        res.json(mod);
        console.log("Controller");
    },
    delete: async (req, res)=>{
        const del = await instrumentoService.delete(req.params.id);
        res.json(del);
        console.log("Controller");
    },
};

module.exports = instrumentoController;