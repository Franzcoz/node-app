const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize.js');

const Menu = sequelize.define(
    'Menu',
    {
        id_menu: {
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
        ruta: {
            type: DataTypes.STRING(200),
            allowNull: false,
            validate: {
                len: [1, 200],
            },
        },
    },
    {
        tableName: 'menu',
        timestamps: false,
    }
);

const Rol = sequelize.define(
    'Rol',
    {
        id_rol: {
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
    },
    {
        tableName: 'rol',
        timestamps: false,
    }
);

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
        timestamps: false
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

const Emisor = sequelize.define(
    'Emisor',
    {
        id_emisor: {
            type: DataTypes.STRING(15),
            primaryKey: true,
            allowNull: false,
            validate: {
                len: [1, 15],
            },
        },
        razon_social: {
            type: DataTypes.STRING(100),
            allowNull: false,
            validate: {
                len: [1, 100],
            },
        },
        nombre: {
            type: DataTypes.STRING(100),
            allowNull: false,
            validate: {
                len: [1, 100],
            },
        },
    },
    {
        tableName: 'emisor',
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

const UsuarioRol = sequelize.define(
    'UsuarioRol',
    {
        id_usuario: {
            type: DataTypes.STRING(15),
            allowNull: false,
            primaryKey: true,
            validate: {
                len: [1, 15],
            },
        },
        id_rol: {
            type: DataTypes.STRING(15),
            allowNull: false,
            primaryKey: true,
            validate: {
                len: [1, 15],
            },
        },
    },
    {
        tableName: 'usuario_rol',
        timestamps: false,
    }
);

const RolMenu = sequelize.define(
    'RolMenu',
    {
        id_rol: {
            type: DataTypes.STRING(15),
            allowNull: false,
            primaryKey: true,
            validate: {
                len: [1, 15],
            },
        },
        id_menu: {
            type: DataTypes.STRING(15),
            allowNull: false,
            primaryKey: true,
            validate: {
                len: [1, 15],
            },
        },
    },
    {
        tableName: 'rol_menu',
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

const Cartera = sequelize.define(
    'Cartera',
    {
        id_fondo: {
            type: DataTypes.STRING(15),
            primaryKey: true,
            allowNull: false,
            validate: {
                len: [1, 15],
            },
        },
        fecha: {
            type: DataTypes.DATE,
            primaryKey: true,
            allowNull: false,
        },
        id_nemotecnico: {
            type: DataTypes.STRING(50),
            primaryKey: true,
            allowNull: false,
            validate: {
                len: [1, 50],
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
        valor_presente: {
            type: DataTypes.DECIMAL(18,4),
            allowNull: false,
            validate: {
                min: 1,
            },
        },
    },
    {
        tableName: 'cartera',
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
            type: DataTypes.DATE(),
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

const PrecioMercado = sequelize.define(
    'PrecioMercado',
    {
        fecha: {
            type: DataTypes.DATE(),
            defaultValue: DataTypes.NOW,
            primaryKey: true,
            allowNull: false,
        },
        id_nemotecnico: {
            type: DataTypes.STRING(50),
            primaryKey: true,
            allowNull: false,
            validate: {
                len: [1, 50],
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
        tableName: 'precio_mercado',
        timestamps: false,
    }
);

//
// RELACIONES
//

// N:M Usuario -> UsuarioRol <- Rol (Super Many to Many)
Usuario.belongsToMany(Rol, {
    through: UsuarioRol,
    foreignKey: 'id_usuario',
    otherKey: 'id_rol',
    targetKey: 'id_rol',
    sourceKey: 'id_usuario',
});
Rol.belongsToMany(Usuario, {
    through: UsuarioRol,
    foreignKey: 'id_rol',
    otherKey: 'id_usuario',
    targetKey: 'id_usuario',
    sourceKey: 'id_rol',
});
Usuario.hasMany(UsuarioRol, {
    foreignKey: 'id_usuario',
    sourceKey: 'id_usuario'
});
UsuarioRol.belongsTo(Usuario, {
    foreignKey: 'id_usuario',
    targetKey: 'id_usuario'
});
Rol.hasMany(UsuarioRol, {
    foreignKey: 'id_rol',
    sourceKey: 'id_rol'
});
UsuarioRol.belongsTo(Rol, {
    foreignKey: 'id_rol',
    targetKey: 'id_rol'
});

// N:M Menu -> RolMenu <- Rol (Super Many-to-Many)
Menu.belongsToMany(Rol, {
    through: RolMenu,
    foreignKey: 'id_menu',
    otherKey: 'id_rol',
    targetKey: 'id_rol',
    sourceKey: 'id_menu',
});
Rol.belongsToMany(Menu, {
    through: RolMenu,
    foreignKey: 'id_rol',
    otherKey: 'id_menu',
    targetKey: 'id_menu',
    sourceKey: 'id_rol',
});
Menu.hasMany(RolMenu, {
    foreignKey: 'id_menu',
    sourceKey: 'id_menu'
});
RolMenu.belongsTo(Menu, {
    foreignKey: 'id_menu',
    targetKey: 'id_menu'
});
Rol.hasMany(RolMenu, {
    foreignKey: 'id_rol',
    sourceKey: 'id_rol'
});
RolMenu.belongsTo(Rol, {
    foreignKey: 'id_rol',
    targetKey: 'id_rol'
});

// 1:N Instrumento -> Nemotecnico
Instrumento.hasMany(Nemotecnico, {
    foreignKey: 'id_instrumento',
    sourceKey: 'id_instrumento',
});
Nemotecnico.belongsTo(Instrumento, {
    foreignKey: 'id_instrumento',
    targetKey: 'id_instrumento',
});

// 1:N Emisor -> Nemotecnico
Emisor.hasMany(Nemotecnico, {
    foreignKey: 'id_emisor',
    sourceKey: 'id_emisor',
});
Nemotecnico.belongsTo(Emisor, {
    foreignKey: 'id_emisor',
    targetKey: 'id_emisor',
});

Fondo.hasMany(Cartera, {
    foreignKey: 'id_fondo',
    sourceKey: 'id_fondo',
});
Cartera.belongsTo(Fondo, {
    foreignKey: 'id_fondo',
    targetKey: 'id_fondo',
});

Nemotecnico.hasMany(Cartera, {
    foreignKey: 'id_nemotecnico',
    sourceKey: 'id_nemotecnico',
});
Cartera.belongsTo(Nemotecnico, {
    foreignKey: 'id_nemotecnico',
    targetKey: 'id_nemotecnico',
});

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

Nemotecnico.hasMany(PrecioMercado, {
    foreignKey: 'id_nemotecnico',
    sourceKey: 'id_nemotecnico',
});
PrecioMercado.belongsTo(Nemotecnico, {
    foreignKey: 'id_nemotecnico',
    targetKey: 'id_nemotecnico',
});

module.exports = {
    Menu,
    Rol,
    Usuario,
    Instrumento,
    Emisor,
    Fondo,
    UsuarioRol,
    RolMenu,
    Nemotecnico,
    Cartera,
    Operacion,
    OperacionDetalle,
    PrecioMercado,
    sequelize
};