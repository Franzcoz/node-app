const express = require("express");
const router = express.Router();
const instrumentoController = require('../controllers/instrumentoController.js');

router.get("", instrumentoController.getAll);
//router.get(":id",getById);
router.post("", instrumentoController.create);
router.put("/:id", instrumentoController.update);
router.delete("/:id", instrumentoController.delete);

module.exports = router;