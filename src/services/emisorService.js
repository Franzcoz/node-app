const emisorModel = require("../models/emisorModel.js");

const emisorService = {
    getAll: () => emisorModel.getAll(),
    create: (data) => emisorModel.create(data),
    update: (id, data) => emisorModel.update(id, data),
    delete: (id) => emisorModel.delete(id),
};

module.exports = emisorService;