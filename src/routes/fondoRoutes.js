const express = require("express");
const router = express.Router();
const fondoController = require('../controllers/fondoController.js');
const { verificarToken } = require("../middlewares/authMiddle.js");

router.get("", verificarToken, fondoController.getAll);
router.post("", verificarToken, fondoController.create);
router.put("/:id", verificarToken, fondoController.update);
router.delete('/:id', verificarToken, fondoController.delete);

module.exports = router;