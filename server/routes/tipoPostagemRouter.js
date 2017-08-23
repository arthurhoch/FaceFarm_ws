const express = require('express');

const tipoPostagemController = require('../controllers/tipoPostagemController');

const tipoPostagemRouter = express.Router();

tipoPostagemRouter.route('/').post(tipoPostagemController.create);
tipoPostagemRouter.route('/:id').delete(tipoPostagemController.remove);
tipoPostagemRouter.route('/').patch(tipoPostagemController.update);
tipoPostagemRouter.route('/:id').get(tipoPostagemController.getById);
tipoPostagemRouter.route('/:skip/:limit').get(tipoPostagemController.getList);
tipoPostagemRouter.route('/').get(tipoPostagemController.count);

module.exports = { tipoPostagemRouter };
