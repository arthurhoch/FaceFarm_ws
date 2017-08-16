var express = require('express');

var agricultorController = require('../controllers/agricultor');

var agricultorRouter = express.Router();

agricultorRouter.route('/create').post(agricultorController.create);

module.exports = { agricultorRouter };