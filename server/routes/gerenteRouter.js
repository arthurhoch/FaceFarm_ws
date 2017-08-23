const express = require('express');

const gerenteController = require('../controllers/gerenteController');

const gerenteRouter = express.Router();

gerenteRouter.route('/').post(gerenteController.create);
gerenteRouter.route('/:id').delete(gerenteController.remove);
gerenteRouter.route('/').patch(gerenteController.update);
gerenteRouter.route('/:id').get(gerenteController.getById);
gerenteRouter.route('/:skip/:limit').get(gerenteController.getList);
gerenteRouter.route('/').get(gerenteController.count);

module.exports = { gerenteRouter };
