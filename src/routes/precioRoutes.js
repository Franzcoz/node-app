const express = require("express");
const router = express.Router();
const precioController = require('../controllers/precioController.js');
const { verificarToken } = require("../middlewares/authMiddle.js");
const upload = require('../middlewares/upload');

router.post('/upload', verificarToken, upload.single('archivo'), precioController.cargarArchivo);

module.exports = router;