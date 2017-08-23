const express = require('express');

const estadoController = require('../controllers/estadoController');

const estadoRouter = express.Router();

estadoRouter.route('/').post(estadoController.create);
estadoRouter.route('/:id').delete(estadoController.remove);
estadoRouter.route('/').patch(estadoController.update);
estadoRouter.route('/:id').get(estadoController.getById);
estadoRouter.route('/:skip/:limit').get(estadoController.getList);
estadoRouter.route('/').get(estadoController.count);

module.exports = { estadoRouter };
