var express = require('express');

var agricultorController = require('../controllers/agricultor');

var router = express.Router();

router.route('/create').post(agricultorController.create)

module.exports = router;
