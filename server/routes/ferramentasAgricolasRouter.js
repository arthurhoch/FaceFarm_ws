const express = require('express');

const ferramentasAgricolasController = require('../controllers/ferramentasAgricolasController');

const ferramentasAgricolasRouter = express.Router();

ferramentasAgricolasRouter.route('/').post(ferramentasAgricolasController.create);
ferramentasAgricolasRouter.route('/:id').delete(ferramentasAgricolasController.remove);
ferramentasAgricolasRouter.route('/').patch(ferramentasAgricolasController.update);
ferramentasAgricolasRouter.route('/:id').get(ferramentasAgricolasController.getById);
ferramentasAgricolasRouter.route('/:skip/:limit').get(ferramentasAgricolasController.getList);
ferramentasAgricolasRouter.route('/').get(ferramentasAgricolasController.count);

module.exports = { ferramentasAgricolasRouter };
