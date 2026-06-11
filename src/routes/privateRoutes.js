const express = require('express');
const router = express.Router();
const path = require('path');
const { verificarToken } = require('../middlewares/authMiddle.js');

router.use('/priv-js', verificarToken, express.static(path.join(__dirname,'../../private/js')));

router.use('/menu', verificarToken, (req, res) => {
    res.sendFile(path.join(__dirname,'../../private/menu.html'));
});
router.use('/default', verificarToken, (req, res) => {
    res.sendFile(path.join(__dirname,'../../private/default.html'));
});
router.use('/emisor', verificarToken, (req, res) => {
    res.sendFile(path.join(__dirname,'../../private/emisor.html'));
});
router.use('/compra', verificarToken, (req, res) => {
    res.sendFile(path.join(__dirname,'../../private/compra.html'));
});
router.use('/fondo', verificarToken, (req, res) => {
    res.sendFile(path.join(__dirname,'../../private/fondo.html'));
});
router.use('/instrumento', verificarToken, (req, res) => {
    res.sendFile(path.join(__dirname,'../../private/instrumento.html'));
});
router.use('/operaciones', verificarToken, (req, res) => {
    res.sendFile(path.join(__dirname,'../../private/operaciones.html'));
});
router.use('/precios', verificarToken, (req, res) => {
    res.sendFile(path.join(__dirname,'../../private/precios.html'));
});

module.exports = router;