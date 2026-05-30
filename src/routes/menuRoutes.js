const express = require("express");
const router = express.Router();

const { getMenus } = require("../controllers/menuController.js")
const { verificarToken } = require("../middlewares/authMiddle.js")

router.get("", verificarToken, getMenus);

module.exports = router