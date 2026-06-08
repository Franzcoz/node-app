const nemotecnicoModel = require('../models/nemotecnicoModel.js');

const nemoController = {
    async validar(req, res) {
        const { id } = req.params;

        const data = await nemotecnicoModel.buscarPorId(id);

        if (!data) {
        return res.status(404).json({ error: 'No existe' });
        }

        res.json(data);
    },
};

module.exports = nemoController;