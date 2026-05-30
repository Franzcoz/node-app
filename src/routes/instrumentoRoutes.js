const express = require("express");
const router = express.Router();
const instrumentoController = require('../controllers/instrumentoController.js');
const { verificarToken } = require("../middlewares/authMiddle.js")

router.get("", verificarToken, instrumentoController.getAll);
//router.get(":id",getById);
router.post("", verificarToken, instrumentoController.create);
router.put("/:id", verificarToken, instrumentoController.update);
router.delete('/:id', verificarToken, instrumentoController.delete);

module.exports = router;