const pool = require('../config/database.js');

const Instrumento = {
    async getAll() {
        const result = await pool.query("SELECT * FROM instrumento ORDER BY id_instrumento");
        return result.rows;
    },

    async getById(id) {
        const res = await pool.query("SELECT * FROM instrumento WHERE id_instrumento = $1",
        [id],
        )
    },
    
    async create({ id, nombre, mercado }) {
        const res = await pool.query("INSERT INTO instrumento (id_instrumento, nombre, tipo_mercado) VALUES ($1, $2, $3) RETURNING *",
            [id, nombre, mercado],
        );
        return res.rows[0];
    },
    async update( id, { nombre, mercado }) {
        const res = await pool.query("UPDATE instrumento SET nombre=$1, tipo_mercado=$2 WHERE id_instrumento=$3 RETURNING *",
            [nombre, mercado, id],
        );
        return res.rows[0];
    },
    async delete(id) {
        const res = await pool.query("DELETE FROM instrumento WHERE id_instrumento=$1 RETURNING *",
            [id],
        );
        return res.rows[0];
    }
};

/*
    async create() {

    },

    async update() {

    },

    async delete() {

    }*/

module.exports = Instrumento;