const express = require("express");
const router = express.Router();
const operacionController = require('../controllers/operacionController.js');
const { verificarToken } = require("../middlewares/authMiddle.js");

router.get('/', verificarToken, operacionController.buscar);
router.post('/compra', verificarToken, operacionController.crearCompra);

module.exports = router;