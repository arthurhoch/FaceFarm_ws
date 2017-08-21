const express = require('express');

const banimentoController = require('../controllers/banimentoController');

const banimentoRouter = express.Router();

banimentoRouter.route('/create').post(banimentoController.create);
banimentoRouter.route('/remove/:id').delete(banimentoController.remove);
banimentoRouter.route('/update').patch(banimentoController.update);
banimentoRouter.route('/getById/:id').get(banimentoController.getById);
banimentoRouter.route('/getList').get(banimentoController.getList);

module.exports = { banimentoRouter };
