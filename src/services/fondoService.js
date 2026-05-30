const Fondo = require("../models/fondoModel.js");

const fondoService = {
    getAll: () => Fondo.getAll(),
    getById: (id) => Fondo.getById(id),
    create: (data) => Fondo.create(data),
    update: (id, data) => Fondo.update(id, data),
    delete: (id) => Fondo.delete(id),
};

module.exports = fondoService;