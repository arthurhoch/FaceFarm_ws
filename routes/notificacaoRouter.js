const express = require('express');

const notificacaoController = require('../controllers/notificacaoController');

const notificacaoRouter = express.Router();

notificacaoRouter.route('/create').post(notificacaoController.create);
notificacaoRouter.route('/remove/:id').delete(notificacaoController.remove);
notificacaoRouter.route('/update').patch(notificacaoController.update);
notificacaoRouter.route('/getById/:id').get(notificacaoController.getById);
notificacaoRouter.route('/getList').get(notificacaoController.getList);

module.exports = { notificacaoRouter };
