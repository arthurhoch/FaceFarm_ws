const express = require('express');

const postagemController = require('../controllers/postagemController');

const postagemRouter = express.Router();

postagemRouter.route('/').post(postagemController.create);
postagemRouter.route('/:id').delete(postagemController.remove);
postagemRouter.route('/').patch(postagemController.update);
postagemRouter.route('/:id').get(postagemController.getById);
postagemRouter.route('/:skip/:limit').get(postagemController.getList);
postagemRouter.route('/').get(postagemController.count);

module.exports = { postagemRouter };
