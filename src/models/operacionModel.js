const { Op } = require('sequelize');
const { Operacion, OperacionDetalle, Fondo, sequelize } = require('./sequelizeModels.js');

const operacionModel = {
// BÚSQUEDA
    async buscar({ id_fondo, fecha_desde, fecha_hasta, tipo, id_usuario }) {
        let conditions = [];
        let query = {
            attributes: {
                exclude: ['monto', 'id_fondo']
            },
            include: [
                {
                    model: Fondo,
                    required: true,// Para forzar INNER JOIN
                    attributes: [['nombre', 'fondo_nombre']]
                },
                {
                    model: OperacionDetalle,
                    attributes: {exclude: ['id_operacion','correlativo']}
                    // LEFT JOIN (por defecto en sequelize)
                }
            ],
            order: [
                ['fecha','DESC'],
                ['id_operacion', 'DESC']
            ],
        };

        if (id_fondo) {
            conditions.push({ id_fondo: id_fondo });
        }
        if (tipo) {
            conditions.push({tipo: tipo});
        }
        if (fecha_desde) {
            conditions.push({fecha: {[Op.gte]: fecha_desde}});
        }
        if (fecha_hasta) {
            conditions.push({fecha: {[Op.lte]: fecha_hasta}});
        }
        if (id_usuario) {
            conditions.push({id_usuario: id_usuario});
        }
        if (conditions) {
            query = {...query, where: {[Op.and]: conditions} };
        };

        return await Operacion.findAll(query)
    },

// COMPRA
    async crearCompra({ id_fondo, fecha, detalles, id_usuario }) {
        const t = await sequelize.transaction();
        try {
            let montoTotal = detalles.reduce((acc, d) => acc + d.cantidad * d.precio, 0);
            
            const oper = await Operacion.create(
                {
                    // id_operacion se autoincrementa, configutado en Modelo y BD
                    id_fondo: id_fondo,
                    tipo: 'C',
                    fecha: fecha,
                    monto: montoTotal,
                    id_usuario: id_usuario
                },
                { transaction: t },
            );

            let correlativo = 1;

            for (const d of detalles) {
                const deta = await OperacionDetalle.create(
                    {
                        id_operacion: oper.id_operacion,
                        correlativo: correlativo++,
                        id_nemotecnico: d.id_nemotecnico,
                        cantidad: d.cantidad,
                        precio: d.precio
                    },
                    { transaction: t },
                )
            };
            await t.commit();
            return { id_operacion: oper.id_operacion }
        } catch(error) {
            await t.rollback();
            throw(error);
        }
    },
};

module.exports = operacionModel;