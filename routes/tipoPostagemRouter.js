const express = require('express');

const tipoPostagemController = require('../controllers/tipoPostagemController');

const tipoPostagemRouter = express.Router();

tipoPostagemRouter.route('/create').post(tipoPostagemController.create);
tipoPostagemRouter.route('/remove/:id').delete(tipoPostagemController.remove);
tipoPostagemRouter.route('/update').patch(tipoPostagemController.update);
tipoPostagemRouter.route('/getById/:id').get(tipoPostagemController.getById);
tipoPostagemRouter.route('/getList').get(tipoPostagemController.getList);

module.exports = { tipoPostagemRouter };
