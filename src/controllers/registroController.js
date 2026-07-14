const bcrypt = require("bcrypt");
const { saveLog } = require("../utils/fileLogger.js");
const { success, error } = require('../utils/response.js');
const registroModel = require("../models/registroModel.js")

// IMPLEMENTAR CONSULTA USUARIO EXISTENTE Y BCRYPT PARA REGISTRO DE USUARIO

const registroController = {
    check: async (req, res) => {
        try {
            const { user } = req.params;
            const data = await registroModel.getUsuario(user);
            if (data) {
                return error(res, 'Usuario no disponible', 401);
            };
            return success(res, data, 'Usuario disponible', 200);
        } catch (err) {
            saveLog(`GET /registro | ${err.stack}`);
            return error(res, 'Error al obtener usuario', 500);
        }
        
    },
    create: async (req, res) => {
        // Consultar por usuario disponible nuevamente
        const { id_usuario } = req.body;
        const usuario = await registroModel.getUsuario(id_usuario);
        if (usuario) {
            return error(res, 'Usuario no disponible', 401);
        };
        // Crear usuario
        try {
            const { clave } = req.body;
            // Encriptar password y reemplazarlo en el body
            const hash = await bcrypt.hash(clave, 13);
            req.body.clave = hash;

            const nuevo_usuario = await registroModel.createUsuario(req.body);
            return success(res, nuevo_usuario, 'Usuario creado', 201);
        } catch (err) {
            saveLog(`POST /registro | ${err.stack}`);
            return error(res, 'Error al crear usuario', 500);
        }
    }
}

module.exports = registroController