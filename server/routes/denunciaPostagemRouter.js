const express = require('express');

const denunciaPostagemController = require('../controllers/denunciaPostagemController');

const denunciaPostagemRouter = express.Router();

denunciaPostagemRouter.route('/').post(denunciaPostagemController.create);
denunciaPostagemRouter.route('/:id').delete(denunciaPostagemController.remove);
denunciaPostagemRouter.route('/').patch(denunciaPostagemController.update);
denunciaPostagemRouter.route('/:id').get(denunciaPostagemController.getById);
denunciaPostagemRouter.route('/:skip/:limit').get(denunciaPostagemController.getList);
denunciaPostagemRouter.route('/').get(denunciaPostagemController.count);

module.exports = { denunciaPostagemRouter };
