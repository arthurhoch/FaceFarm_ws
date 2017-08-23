const express = require('express');

const motivoController = require('../controllers/motivoController');

const motivoRouter = express.Router();

motivoRouter.route('/').post(motivoController.create);
motivoRouter.route('/:id').delete(motivoController.remove);
motivoRouter.route('/').patch(motivoController.update);
motivoRouter.route('/:id').get(motivoController.getById);
motivoRouter.route('/:skip/:limit').get(motivoController.getList);
motivoRouter.route('/').get(motivoController.count);

module.exports = { motivoRouter };
