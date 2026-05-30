const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize.js');

const Instrumento = sequelize.define(
    'Instrumento',
    {
        id_instrumento: {
            type: DataTypes.STRING(15), // 👈 equivalente a tu DOMAIN
            primaryKey: true,
            allowNull: false,
            validate: {
                len: [1, 15], // 👈 refuerza la regla
            },
        },
        nombre: {
            type: DataTypes.STRING(50),
            allowNull: false,
            validate: {
                len: [1, 50],
            },
        },
        tipo_mercado: {
            type: DataTypes.CHAR(1),
            allowNull: true,
            validate: {
                isIn: [['F', 'V']],
            },
        },
    },
    {
        tableName: 'instrumento',
        timestamps: false,
    }
);

const Fondo = sequelize.define(
    'Fondo',
    {
        id_fondo: {
            type: DataTypes.STRING(15),
            primaryKey: true,
            allowNull: false,
            validate: {
                len: [1, 15],
            },
        },
        nombre: {
            type: DataTypes.STRING(50),
            allowNull: false,
            validate: {
                len: [1, 50],
            },
        },
        vigente: {
            type: DataTypes.CHAR(1),
            allowNull: true,
            validate: {
                isIn: [['N', 'V', 'B']],
            },
        },
    },
    {
        tableName: 'fondo',
        timestamps: false,
    }
);

module.exports = { Instrumento, Fondo };