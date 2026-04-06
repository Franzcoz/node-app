// Importar módulo fs
const fs = require('fs-extra');

// Función para registrar mensajes al archivo log.txt e imprimir en consola
const saveLog = (mensaje) => {
    const fecha = new Date().toLocaleDateString('es-CL');
    const hora = new Date().toLocaleTimeString();
    const path = require('path');

    const ruta = path.join(__dirname, `../../logs/log-${fecha}.txt`);

    const lineamsg = `${fecha} | ${hora} | ${mensaje}`;

    // Escribimos mensaje al archivo log
    fs.appendFileSync(ruta,lineamsg + '\n',(err)=>{
        if (err) {
            console.error('Error al escribir log: ', err);
        }
    });

    // Mostramos mensaje en consola
    console.log(lineamsg);
};

// Exportar función
module.exports = { saveLog };