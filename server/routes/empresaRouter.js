const express = require('express');

const empresaController = require('../controllers/empresaController');

const empresaRouter = express.Router();

empresaRouter.route('/create').post(empresaController.create);
empresaRouter.route('/remove/:id').delete(empresaController.remove);
empresaRouter.route('/update').patch(empresaController.update);
empresaRouter.route('/getById/:id').get(empresaController.getById);
empresaRouter.route('/getList').get(empresaController.getList);

module.exports = { empresaRouter };
