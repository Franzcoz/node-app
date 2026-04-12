// Conexión a Base de Datos postgres

const { Pool } = require('pg');
require("dotenv").config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    },
    max: 5, // máximo de conexiones simultáneas
    idleTimeoutMillis: 30000
});

// Mensaje en consola al conectar
pool.on("connect", () => {
    console.log("Conectado a PostgreSQL (Neon)")
})

module.exports = pool