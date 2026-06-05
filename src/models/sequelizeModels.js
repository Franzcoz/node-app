const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize.js');

const Usuario = sequelize.define(
    'Usuario',
    {
        id_usuario: {
            type: DataTypes.STRING(15),
            primaryKey: true,
            allowNull: false,
            validate: {
                len: [1, 15],
            },
        },
        clave: {
            type: DataTypes.STRING(12),
            allowNull: false,
            validate: {
                len: [1, 12],
            },
        },
        nombre: {
            type: DataTypes.STRING(50),
            allowNull: false,
            validate: {
                len: [1, 50],
            },
        },
        apellido1: {
            type: DataTypes.STRING(50),
            allowNull: false,
            validate: {
                len: [1, 50],
            },
        },
        apellido2: {
            type: DataTypes.STRING(50),
            allowNull: false,
            validate: {
                len: [1, 50],
            },
        },
        email: {
            type: DataTypes.STRING(50),
            allowNull: false,
            validate: {
                len: [1, 15],
                isEmail: true,
            },
        },
        estado: {
            type: DataTypes.CHAR(1),
            allowNull: false,
            validate: {
                len: [1],
                isIn: [['V','N','B']],
            },
        }
    },
    {
        tableName: 'usuario',
    }
);

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

const Nemotecnico = sequelize.define(
    'Nemotecnico',
    {
        id_nemotecnico: {
            type: DataTypes.STRING(50),
            primaryKey: true,
            allowNull: false,
            validate: {
                len: [1, 50],
            },
        },
        id_instrumento: {
            type: DataTypes.STRING(15),
            allowNull: false,
            validate: {
                len: [1, 15],                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   
            },
        },
        id_emisor: {
            type: DataTypes.STRING(15),
            allowNull: false,
            validate: {
                len: [1, 15],
            },
        },
        fecha_emision: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        fecha_vencimiento: {
            type: DataTypes.DATE,
            allowNull: false,
        }
    },
    {
        tableName: 'nemotecnico',
        timestamps: false,
    }
);

const Operacion = sequelize.define(
    'Operacion',
    {
        id_operacion: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        id_fondo: {
            type: DataTypes.STRING(15),
            allowNull: false,
            validate: {
                len: [1, 15],
            },
        },
        id_usuario: {
            type: DataTypes.STRING(15),
            allowNull: false,
            validate: {
                len: [1, 15],
            },
        },
        tipo: {
            type: DataTypes.CHAR(1),
            allowNull: false,
        },
        fecha: {
            type: DataTypes.DATEONLY(),
            defaultValue: DataTypes.NOW,
            allowNull: false,
        },
        monto: {
            type: DataTypes.DECIMAL(18,4),
            allowNull: false,
            validate: {
                min: 1,
            },
        },
    },
    {
        tableName: 'operacion',
        timestamps: false,
    }
);

const OperacionDetalle = sequelize.define(
    'OperacionDetalle',
    {
        id_operacion: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
        },
        correlativo: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
        },
        id_nemotecnico: {
            type: DataTypes.STRING(50),
            allowNull: false,
            validate: {
                len: [1,50],
            },
        },
        cantidad: {
            type: DataTypes.DECIMAL(18,4),
            allowNull: false,
            validate: {
                min: 1,
            },
        },
        precio: {
            type: DataTypes.DECIMAL(18,4),
            allowNull: false,
            validate: {
                min: 1,
            },
        },
    },
    {
        tableName: 'operacion_detalle',
        timestamps: false,
    }
);

//
// RELACIONES
//

Fondo.hasMany(Operacion, {
    foreignKey: 'id_fondo',
    sourceKey: 'id_fondo',
});
Operacion.belongsTo(Fondo, {
    foreignKey: 'id_fondo',
    targetKey: 'id_fondo',
});

Usuario.hasMany(Operacion, {
    foreignKey: 'id_usuario',
    sourceKey: 'id_usuario',
});
Operacion.belongsTo(Usuario, {
    foreignKey: 'id_usuario',
    targetKey: 'id_usuario',
});

Operacion.hasMany(OperacionDetalle, {
    foreignKey: 'id_operacion',
    sourceKey: 'id_operacion',
});
OperacionDetalle.belongsTo(Operacion, {
    foreignKey: 'id_operacion',
    targetKey: 'id_operacion',
});

Nemotecnico.hasMany(OperacionDetalle, {
    foreignKey: 'id_nemotecnico',
    sourceKey: 'id_nemotecnico',
});
OperacionDetalle.belongsTo(Nemotecnico, {
    foreignKey: 'id_nemotecnico',
    targetKey: 'id_nemotecnico',
});

module.exports = { Instrumento, Fondo, Nemotecnico, Operacion, OperacionDetalle, sequelize };