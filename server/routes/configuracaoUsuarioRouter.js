const express = require('express');

const configuracaoUsuarioController = require('../controllers/configuracaoUsuarioController');

const configuracaoUsuarioRouter = express.Router();

configuracaoUsuarioRouter.route('/').post(configuracaoUsuarioController.create);
configuracaoUsuarioRouter.route('/:id').delete(configuracaoUsuarioController.remove);
configuracaoUsuarioRouter.route('/').patch(configuracaoUsuarioController.update);
configuracaoUsuarioRouter.route('/:id').get(configuracaoUsuarioController.getById);
configuracaoUsuarioRouter.route('/:skip/:limit').get(configuracaoUsuarioController.getList);
configuracaoUsuarioRouter.route('/').get(configuracaoUsuarioController.count);

module.exports = { configuracaoUsuarioRouter };
