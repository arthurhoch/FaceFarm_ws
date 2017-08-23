const express = require('express');

const banimentoController = require('../controllers/banimentoController');

const banimentoRouter = express.Router();

banimentoRouter.route('/').post(banimentoController.create);
banimentoRouter.route('/:id').delete(banimentoController.remove);
banimentoRouter.route('/').patch(banimentoController.update);
banimentoRouter.route('/:id').get(banimentoController.getById);
banimentoRouter.route('/:skip/:limit').get(banimentoController.getList);
banimentoRouter.route('/').get(banimentoController.count);

module.exports = { banimentoRouter };
