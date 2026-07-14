const express = require("express")
const router = express.Router()
const registroController = require("../controllers/registroController")

router.get("/:user", registroController.check);
router.post("/", registroController.create);
module.exports = router