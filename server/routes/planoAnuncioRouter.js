const express = require('express');

const planoAnuncioController = require('../controllers/planoAnuncioController');

const planoAnuncioRouter = express.Router();

planoAnuncioRouter.route('/').post(planoAnuncioController.create);
planoAnuncioRouter.route('/:id').delete(planoAnuncioController.remove);
planoAnuncioRouter.route('/').patch(planoAnuncioController.update);
planoAnuncioRouter.route('/:id').get(planoAnuncioController.getById);
planoAnuncioRouter.route('/:skip/:limit').get(planoAnuncioController.getList);
planoAnuncioRouter.route('/').get(planoAnuncioController.count);

module.exports = { planoAnuncioRouter };
