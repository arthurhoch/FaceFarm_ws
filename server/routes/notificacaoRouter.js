const express = require('express');

const notificacaoController = require('../controllers/notificacaoController');

const notificacaoRouter = express.Router();

notificacaoRouter.route('/').post(notificacaoController.create);
notificacaoRouter.route('/:id').delete(notificacaoController.remove);
notificacaoRouter.route('/').patch(notificacaoController.update);
notificacaoRouter.route('/:id').get(notificacaoController.getById);
notificacaoRouter.route('/:skip/:limit').get(notificacaoController.getList);
notificacaoRouter.route('/').get(notificacaoController.count);

module.exports = { notificacaoRouter };
