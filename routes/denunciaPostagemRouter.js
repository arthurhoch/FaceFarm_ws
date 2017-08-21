const express = require('express');

const denunciaPostagemController = require('../controllers/denunciaPostagemController');

const denunciaPostagemRouter = express.Router();

denunciaPostagemRouter.route('/create').post(denunciaPostagemController.create);
denunciaPostagemRouter.route('/remove/:id').delete(denunciaPostagemController.remove);
denunciaPostagemRouter.route('/update').patch(denunciaPostagemController.update);
denunciaPostagemRouter.route('/getById/:id').get(denunciaPostagemController.getById);
denunciaPostagemRouter.route('/getList').get(denunciaPostagemController.getList);

module.exports = { denunciaPostagemRouter };
