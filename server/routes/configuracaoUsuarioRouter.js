const express = require('express');

const configuracaoUsuarioController = require('../controllers/configuracaoUsuarioController');

const configuracaoUsuarioRouter = express.Router();

configuracaoUsuarioRouter.route('/create').post(configuracaoUsuarioController.create);
configuracaoUsuarioRouter.route('/remove/:id').delete(configuracaoUsuarioController.remove);
configuracaoUsuarioRouter.route('/update').patch(configuracaoUsuarioController.update);
configuracaoUsuarioRouter.route('/getById/:id').get(configuracaoUsuarioController.getById);
configuracaoUsuarioRouter.route('/getList').get(configuracaoUsuarioController.getList);

module.exports = { configuracaoUsuarioRouter };
