const express = require('express');

const agricultorController = require('../controllers/agricultorController');

const agricultorRouter = express.Router();

agricultorRouter.route('/').post(agricultorController.create);
agricultorRouter.route('/:id').delete(agricultorController.remove);
agricultorRouter.route('/').patch(agricultorController.update);
agricultorRouter.route('/:id').get(agricultorController.getById);
agricultorRouter.route('/:skip/:limit').get(agricultorController.getList);
agricultorRouter.route('/').get(agricultorController.count);

module.exports = { agricultorRouter };
