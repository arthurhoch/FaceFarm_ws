const express = require('express');

const anuncioController = require('../controllers/anuncioController');

const anuncioRouter = express.Router();

anuncioRouter.route('/').post(anuncioController.create);
anuncioRouter.route('/:id').delete(anuncioController.remove);
anuncioRouter.route('/').patch(anuncioController.update);
anuncioRouter.route('/:id').get(anuncioController.getById);
anuncioRouter.route('/:skip/:limit').get(anuncioController.getList);
anuncioRouter.route('/').get(anuncioController.count);

module.exports = { anuncioRouter };
