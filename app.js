// Importar módulos necesarios path, express, cors, dotenv
const path = require('path');
const express = require('express');
const logfs = require('./src/utils/fileLogger.js');
const logM = require('./src/middlewares/loggerMiddle.js');
const authRoutes = require('./src/routes/authRoutes');
const menuRoutes = require('./src/routes/menuRoutes.js');
const loginRoutes = require('./src/routes/loginRoutes.js');
const instrumentoRoutes = require('./src/routes/instrumentoRoutes.js');
const emisorRoutes = require('./src/routes/emisorRoutes.js');
const fondoRoutes = require('./src/routes/fondoRoutes.js');
const operacionRoutes = require('./src/routes/operacionRoutes.js');
const nemotecnicoRoutes = require('./src/routes/nemotecnicoRoutes.js')
const cors = require("cors");
require('dotenv').config();

// Instanciar app express
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.use(logM);

// Definir rutas

app.use('/api/login', loginRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/menus', menuRoutes);
app.use('/api/inst', instrumentoRoutes);
app.use('/api/emisor', emisorRoutes);
app.use('/api/fondo', fondoRoutes);
app.use('/api/operacion', operacionRoutes);
app.use('/api/nemotecnico', nemotecnicoRoutes);

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'/public/main.html'));
});

app.get('/api/status',(req,res)=>{
    res.send({status: 'up',msg: 'API funcionando'});
});

app.get('/login',(req,res)=>{
    res.sendFile(path.join(__dirname,'/public/login.html'));
});

// Configuración del servidor
// El puerto a utilizar se leerá del archivo .env o en su defecto se asignará el puerto 3000

const PORT = process.env.PORT || 3000;

// Iniciar servidor

app.listen(PORT,()=>{
    // Llamada a función que registra en log e imprime en consola
    logfs.saveLog(`Servidor iniciado en puerto ${PORT}`);
});