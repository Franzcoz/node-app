const { Fondo } = require('./sequelizeModels.js');

const fondoModel = {
    async getAll() {
        return await Fondo.findAll({
            order: [['id_fondo', 'ASC']],
        });
    },
    async getById(id_fondo) {
        return await Fondo.findByPk(id_fondo);
    },
    async create({ id_fondo, nombre, vigente }) {
        return await Fondo.create({ id_fondo, nombre, vigente });
    },
    async update( id_fondo, { nombre, vigente }) {
        const fondo = await Fondo.findByPk(id_fondo);
        if (!fondo) return null;
        await fondo.update({ nombre, vigente });
        return fondo;
    },
    async delete(id_fondo) {
        const fondo = await Fondo.findByPk(id_fondo);
        if (!fondo) return null;
        await fondo.destroy();
        return fondo;
    },
};

module.exports = fondoModel;