const express = require("express");
const router = express.Router();
const fondoController = require('../controllers/fondoController.js');

router.get("", fondoController.getAll);
router.post("", fondoController.create);
router.put("/:id", fondoController.update);
router.delete('/:id', fondoController.delete);

module.exports = router;