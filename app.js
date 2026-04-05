// Importar módulos necesarios path, express, cors, dotenv
const path = require('path');
const express = require('express');
const logfs = require('./src/logs.js');
//const cors = require("cors");
require('dotenv').config();

// Instanciar app express
const app = express();

//app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname,'public')));

// Definir rutas
app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'/public/inicio.html'));
    logfs.saveLog('/','sitio');
});

app.get('/api/status',(req,res)=>{
    res.send({status: 'up',msg: 'API funcionando'});
    logfs.saveLog('/status','sitio');
});

app.get('/login',(req,res)=>{
    res.sendFile(path.join(__dirname,'/public/login.html'));
    logfs.saveLog('/login','sitio');
});

// Configuración del servidor
// El puerto a utilizar se leerá del archivo .env o en su defecto se asinará el puerto 3000

const PORT = process.env.PORT || 3000;

// Iniciar servidor

app.listen(PORT,()=>{
    // Llamada a función que registra en log e imprime en consola
    logfs.saveLog(`Servidor iniciado en puerto ${PORT}`,'app');
});