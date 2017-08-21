const express = require('express');

const ferramentasAgricolasController = require('../controllers/ferramentasAgricolasController');

const ferramentasAgricolasRouter = express.Router();

ferramentasAgricolasRouter.route('/create').post(ferramentasAgricolasController.create);
ferramentasAgricolasRouter.route('/remove/:id').delete(ferramentasAgricolasController.remove);
ferramentasAgricolasRouter.route('/update').patch(ferramentasAgricolasController.update);
ferramentasAgricolasRouter.route('/getById/:id').get(ferramentasAgricolasController.getById);
ferramentasAgricolasRouter.route('/getList').get(ferramentasAgricolasController.getList);

module.exports = { ferramentasAgricolasRouter };
