const express = require('express');

const comentarioController = require('../controllers/comentarioController');

const comentarioRouter = express.Router();

comentarioRouter.route('/').post(comentarioController.create);
comentarioRouter.route('/:id').delete(comentarioController.remove);
comentarioRouter.route('/').patch(comentarioController.update);
comentarioRouter.route('/:id').get(comentarioController.getById);
comentarioRouter.route('/:skip/:limit').get(comentarioController.getList);
comentarioRouter.route('/').get(comentarioController.count);

module.exports = { comentarioRouter };
