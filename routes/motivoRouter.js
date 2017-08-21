const express = require('express');

const motivoController = require('../controllers/motivoController');

const motivoRouter = express.Router();

motivoRouter.route('/create').post(motivoController.create);
motivoRouter.route('/remove/:id').delete(motivoController.remove);
motivoRouter.route('/update').patch(motivoController.update);
motivoRouter.route('/getById/:id').get(motivoController.getById);
motivoRouter.route('/getList').get(motivoController.getList);

module.exports = { motivoRouter };
