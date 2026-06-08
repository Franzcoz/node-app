const { Nemotecnico } = require('./sequelizeModels.js');

const nemotecnicoModel = {
    async buscarPorId(id) {
        const res = await Nemotecnico.findByPk(id);
        return res;
    },
};

module.exports = nemotecnicoModel;