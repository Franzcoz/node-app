const { PrecioMercado, sequelize } = require("./sequelizeModels.js");
const fs = require('fs');

const precioMercado = {
    async cargarArchivo(rutaArchivo) {
        const t = await sequelize.transaction();
        try {
            const contenido = fs.readFileSync(rutaArchivo, 'utf-8');
            const lineas = contenido.split('\n');
            
            let count = 0;

            for (let linea of lineas) {
                if (!linea.trim()) continue;

                const [fecha, id_nemotecnico, precio] = linea.split(';');
                await PrecioMercado.upsert(
                    {
                        fecha: fecha,
                        id_nemotecnico: id_nemotecnico,
                        precio: precio
                    },
                    {
                        fields: [ 'precio' ],
                        conflictFields: [
                            'fecha',
                            'id_nemotecnico'
                        ],
                        transaction: t,
                    }
                );
                count++;
            };
            await t.commit();
            return { registros: count }
        } catch (error) {
            await t.rollback();
            throw(error);
        }
    }
};

module.exports = precioMercado;