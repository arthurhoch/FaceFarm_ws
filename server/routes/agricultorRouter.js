const express = require('express');

const agricultorController = require('../controllers/agricultorController');

const agricultorRouter = express.Router();

agricultorRouter.route('/create').post(agricultorController.create);
agricultorRouter.route('/remove/:id').delete(agricultorController.remove);
agricultorRouter.route('/update').patch(agricultorController.update);
agricultorRouter.route('/getById/:id').get(agricultorController.getById);
agricultorRouter.route('/getList').get(agricultorController.getList);

module.exports = { agricultorRouter };
