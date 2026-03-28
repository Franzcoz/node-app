// Importar módulos necesarios path, express, cors
const path = require('path');
const express = require("express");
//const cors = require("cors");

// Instanciar app express
const app = express();

//app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// Definir rutas
app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'/public/index.html'));
});

app.get('/status',(req,res)=>{
    res.send({status: 'up'});
});


// Función principal que muestra mensaje de inicio
const main = function() {
    console.log("Servidor iniciado");
};

// Iniciar servidor
app.listen(3000,()=>{
    main();
});