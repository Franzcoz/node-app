const pool = require('../config/database.js');

const Emisor = {
    async getAll() {
        const result = await pool.query("SELECT * FROM emisor ORDER BY id_emisor");
        return result.rows;
    },
    async getById(id) {
        const res = await pool.query("SELECT * FROM instrumento WHERE id_instrumento = $1",
        [id],
        )
    },
    async create({ id, razon_social, nombre }) {
        try {
            const res = await pool.query("INSERT INTO emisor (id_emisor, razon_social, nombre) VALUES ($1, $2, $3) RETURNING *",
                [id, razon_social, nombre],
            );
        } catch (err) {
            console.log(err);
        }
    },
    async update( id, { razon_social, nombre }) {
        const res = await pool.query("UPDATE emisor SET razon_social=$1, nombre=$2 WHERE id_emisor=$3 RETURNING *",
            [razon_social, nombre, id],
        );
        return res.rows[0];
    },
    async delete(id) {
        const res = await pool.query("DELETE FROM emisor WHERE id_emisor=$1 RETURNING *",
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

module.exports = Emisor;