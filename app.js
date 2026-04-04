// Importar módulos necesarios path, express, cors
const path = require('path');
const express = require('express');
const logfs = require('./src/logs.js');
//const cors = require("cors");

// Instanciar app express
const app = express();

//app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// Definir rutas
app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'/public/index.html'));
    logfs.saveLog('/','sitio');
});

app.get('/status',(req,res)=>{
    res.send({status: 'up'});
    logfs.saveLog('/status','sitio');
});

app.get('/login',(req,res)=>{
    res.sendFile(path.join(__dirname,'/public/login.html'));
    logfs.saveLog('/login','sitio');
});

// Función principal que muestra mensaje de inicio y registra log
const main = function() {
    logfs.saveLog('Servidor iniciado','app');
};

// Iniciar servidor
app.listen(3000,()=>{
    main();
});