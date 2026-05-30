const { Instrumento } = require('./sequelizeModels.js');

const instrumentoModel = {
    async getAll() {
        return await Instrumento.findAll({
            order: [['id_instrumento', 'ASC']],
        });
    },
    async getById(id_instrumento) {
        return await Instrumento.findByPk(id_instrumento);
    },
    async create({ id_instrumento, nombre, tipo_mercado }) {
        return await Instrumento.create({ id_instrumento, nombre, tipo_mercado });
    },
    async update( id_instrumento, { nombre, tipo_mercado }) {
        const instrumento = await Instrumento.findByPk(id_instrumento);
        if (!instrumento) return null;
        await instrumento.update({ nombre, tipo_mercado });
        return instrumento;
    },
    async delete(id_instrumento) {
        const instrumento = await Instrumento.findByPk(id_instrumento);
        if (!instrumento) return null;
        await instrumento.destroy();
        return instrumento;
    },
};

module.exports = instrumentoModel;