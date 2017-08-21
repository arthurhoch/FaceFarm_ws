const express = require('express');

const gerenteController = require('../controllers/gerenteController');

const gerenteRouter = express.Router();

gerenteRouter.route('/create').post(gerenteController.create);
gerenteRouter.route('/remove/:id').delete(gerenteController.remove);
gerenteRouter.route('/update').patch(gerenteController.update);
gerenteRouter.route('/getById/:id').get(gerenteController.getById);
gerenteRouter.route('/getList').get(gerenteController.getList);

module.exports = { gerenteRouter };
