const Instrumento = require("../models/instrumentoModel.js");

const instrumentoService = {
    getAll: () => Instrumento.getAll(),
    getById: (id) => Instrumento.getById(id),
    create: (data) => Instrumento.create(data),
    update: (id, data) => Instrumento.update(id, data),
    delete: (id) => Instrumento.delete(id),
};

module.exports = instrumentoService;