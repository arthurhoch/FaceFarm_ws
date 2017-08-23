const express = require('express');

const moderadorController = require('../controllers/moderadorController');

const moderadorRouter = express.Router();

moderadorRouter.route('/').post(moderadorController.create);
moderadorRouter.route('/:id').delete(moderadorController.remove);
moderadorRouter.route('/').patch(moderadorController.update);
moderadorRouter.route('/:id').get(moderadorController.getById);
moderadorRouter.route('/:skip/:limit').get(moderadorController.getList);
moderadorRouter.route('/').get(moderadorController.count);

module.exports = { moderadorRouter };
