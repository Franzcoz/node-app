const express = require("express");
const router = express.Router();
const emisorController = require('../controllers/emisorController.js');
const { verificarToken } = require("../middlewares/authMiddle.js")

router.get("", verificarToken, emisorController.getAll);
//router.get(":id",getById);
router.post("", verificarToken, emisorController.create);
router.put("/:id", verificarToken, emisorController.update);
router.delete('/:id', verificarToken, emisorController.delete);

module.exports = router;