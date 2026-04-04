// Importar módulo fs
const fs = require('fs-extra');

// Función para registrar mensajes al archivo log.txt e imprimir en consola
const saveLog = (mensaje, tipo) => {
    if (tipo == "sitio") {
        let fecha = new Date().toLocaleString();
        fs.appendFileSync('logs/log.txt',`${fecha} Sitio visitado: ${mensaje}\n`);
        console.log(`${fecha} Sitio visitado: ${mensaje}`);
    } else if (tipo == "app") {
        let fecha = new Date().toLocaleString();
        fs.appendFileSync('logs/log.txt',`${fecha} ${mensaje}\n`);
        console.log(`${fecha} ${mensaje}`);
    } else {
        console.log('Tipo no válido');
    }
};

// Exportar función
module.exports = { saveLog };