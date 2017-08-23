const express = require('express');

const imagemController = require('../controllers/imagemController');

const imagemRouter = express.Router();

imagemRouter.route('/').post(imagemController.create);
imagemRouter.route('/:id').delete(imagemController.remove);
imagemRouter.route('/').patch(imagemController.update);
imagemRouter.route('/:id').get(imagemController.getById);
imagemRouter.route('/:skip/:limit').get(imagemController.getList);
imagemRouter.route('/').get(imagemController.count);

module.exports = { imagemRouter };
