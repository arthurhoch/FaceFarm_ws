const express = require('express');

const planoAnuncioController = require('../controllers/planoAnuncioController');

const planoAnuncioRouter = express.Router();

planoAnuncioRouter.route('/create').post(planoAnuncioController.create);
planoAnuncioRouter.route('/remove/:id').delete(planoAnuncioController.remove);
planoAnuncioRouter.route('/update').patch(planoAnuncioController.update);
planoAnuncioRouter.route('/getById/:id').get(planoAnuncioController.getById);
planoAnuncioRouter.route('/getList').get(planoAnuncioController.getList);

module.exports = { planoAnuncioRouter };
