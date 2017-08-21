const express = require('express');

const estadoController = require('../controllers/estadoController');

const estadoRouter = express.Router();

estadoRouter.route('/create').post(estadoController.create);
estadoRouter.route('/remove/:id').delete(estadoController.remove);
estadoRouter.route('/update').patch(estadoController.update);
estadoRouter.route('/getById/:id').get(estadoController.getById);
estadoRouter.route('/getList').get(estadoController.getList);

module.exports = { estadoRouter };
