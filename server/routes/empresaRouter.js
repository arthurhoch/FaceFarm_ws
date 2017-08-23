const express = require('express');

const empresaController = require('../controllers/empresaController');

const empresaRouter = express.Router();

empresaRouter.route('/').post(empresaController.create);
empresaRouter.route('/:id').delete(empresaController.remove);
empresaRouter.route('/').patch(empresaController.update);
empresaRouter.route('/:id').get(empresaController.getById);
empresaRouter.route('/:skip/:limit').get(empresaController.getList);
empresaRouter.route('/').get(empresaController.count);

module.exports = { empresaRouter };
