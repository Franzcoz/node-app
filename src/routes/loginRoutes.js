const express = require("express");
const router = express.Router();

const { getUsuario } = require("../controllers/loginController.js")

router.post("/", getUsuario);

module.exports = router;