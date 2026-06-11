const { PrecioMercado, sequelize } = require("./sequelizeModels.js");
const fs = require('fs');

const precioMercado = {
    async cargarArchivo(rutaArchivo) {
        const t = await sequelize.transaction();
        try {
            const contenido = fs.readFileSync(rutaArchivo, 'utf-8');
            console.log(contenido);
            const lineas = contenido.split('\n');
            
            let count = 0;

            for (let linea of lineas) {
                if (!linea.trim()) continue;
                console.log(linea)

                const [fecha, id_nemotecnico, precio] = linea.split(';');
                console.log(linea.split(';'));
                console.log(fecha);
                console.log(id_nemotecnico);
                console.log(precio);
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