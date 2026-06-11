// Importar módulos necesarios path, express, cors, dotenv
require('dotenv').config();
const path = require('path');
const express = require('express');
const cors = require("cors");
const cookieParser = require('cookie-parser');

const logfs = require('./src/utils/fileLogger.js');
const logM = require('./src/middlewares/loggerMiddle.js');
const authRoutes = require('./src/routes/authRoutes');
const menuRoutes = require('./src/routes/menuRoutes.js');
const instrumentoRoutes = require('./src/routes/instrumentoRoutes.js');
const emisorRoutes = require('./src/routes/emisorRoutes.js');
const fondoRoutes = require('./src/routes/fondoRoutes.js');
const operacionRoutes = require('./src/routes/operacionRoutes.js');
const nemotecnicoRoutes = require('./src/routes/nemotecnicoRoutes.js');
const precioRoutes = require('./src/routes/precioRoutes.js')
// Importar rutas privadas
const privateRoutes = require('./src/routes/privateRoutes.js');

// El puerto a utilizar se leerá del archivo .env o en su defecto se asignará el puerto 3000
const PORT = process.env.PORT || 3000;

// Instanciar app express
const app = express();

app.use(cookieParser());
app.use(cors({
    origin: `http://localhost:${PORT}` || 'http://localhost:3000',
    credentials: true
}));
app.use(express.json());
app.use(logM);

// Definir rutas
// Rutas públicas
app.use(express.static(path.join(__dirname,'/public')));
/* app.use(express.static(path.join(__dirname,'/assets')/* , {
    maxAge: 86400000 // cache de 1 día para assets
} )); */

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'/public/main.html'));
});

app.get('/api/status',(req,res)=>{
    res.send({status: 'up',msg: 'API funcionando'});
});

app.get('/login',(req,res)=>{
    res.sendFile(path.join(__dirname,'/public/login.html'));
});

app.use('/api/auth', authRoutes);
app.use('/api/menus', menuRoutes);
app.use('/api/inst', instrumentoRoutes);
app.use('/api/emisor', emisorRoutes);
app.use('/api/fondo', fondoRoutes);
app.use('/api/operacion', operacionRoutes);
app.use('/api/nemotecnico', nemotecnicoRoutes);
app.use('/api/precios', precioRoutes);

// Rutas privadas
/* app.use('/', privateRoutes); */

// Logout
app.get('/logout', (req, res) => {
    res.clearCookie('authToken');
    return res.status(302).redirect('/login');
});


// Configuración del servidor

// Iniciar servidor

app.listen(PORT,()=>{
    // Llamada a función que registra en log e imprime en consola
    logfs.saveLog(`Servidor iniciado en puerto ${PORT}`);
});