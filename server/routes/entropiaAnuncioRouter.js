const express = require('express');

const entropiaAnuncioController = require('../controllers/entropiaAnuncioController');

const entropiaAnuncioRouter = express.Router();

entropiaAnuncioRouter.route('/').post(entropiaAnuncioController.create);
entropiaAnuncioRouter.route('/:id').delete(entropiaAnuncioController.remove);
entropiaAnuncioRouter.route('/').patch(entropiaAnuncioController.update);
entropiaAnuncioRouter.route('/:id').get(entropiaAnuncioController.getById);
entropiaAnuncioRouter.route('/:skip/:limit').get(entropiaAnuncioController.getList);
entropiaAnuncioRouter.route('/').get(entropiaAnuncioController.count);

module.exports = { entropiaAnuncioRouter };
