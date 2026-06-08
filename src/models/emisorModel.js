const { Emisor } = require('./sequelizeModels.js');

const emisorModel = {
    async getAll() {
        return await Emisor.findAll(
            {
                order: [
                    ['id_emisor','ASC'],
                ],
                raw: true,
            }
        );
    },
    async create({ id, razon_social, nombre }) {
        try {
            const res = await Emisor.create(
                {
                    id_emisor: id,
                    razon_social: razon_social,
                    nombre: nombre,
                },
                {
                    raw: true
                }
            );
        } catch (err) {
            console.log(err);
        }
    },
    async update( id, { razon_social, nombre }) {
        const emisor = await Emisor.findByPk(id);
        if (!emisor) { return null };
        const res = await Emisor.update(
            {
                razon_social: razon_social,
                nombre: nombre
            },
            {
                where: {
                    id_emisor: id,
                }
            },
            {
                raw: true
            }
        );
        return res;
    },
    async delete(id) {
        const emisor = await Emisor.findByPk(id);
        if (!emisor) { return null };
        const res = await Emisor.destroy(
            {
                where: { id_emisor: id, }
            }
        );
        return res;
    }
};

module.exports = emisorModel;