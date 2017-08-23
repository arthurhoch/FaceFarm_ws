const express = require('express');

const cidadeController = require('../controllers/cidadeController');

const cidadeRouter = express.Router();

cidadeRouter.route('/').post(cidadeController.create);
cidadeRouter.route('/:id').delete(cidadeController.remove);
cidadeRouter.route('/').patch(cidadeController.update);
cidadeRouter.route('/:id').get(cidadeController.getById);
cidadeRouter.route('/:skip/:limit').get(cidadeController.getList);
cidadeRouter.route('/').get(cidadeController.count);

module.exports = { cidadeRouter };
