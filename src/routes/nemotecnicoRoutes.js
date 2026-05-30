const express = require('express');
const router = express.Router();
const nemoController = require('../controllers/nemotecnicoController.js');

router.get('/:id', nemoController.validar);

module.exports = router;