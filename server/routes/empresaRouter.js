const express = require('express');

const empresaController = require('../controllers/empresaController');
const { verifyEmpresa } = require('../middlewares/middleEmpresa');

const empresaRouter = express.Router();

empresaRouter.route('/').post(empresaController.create);
empresaRouter.route('/:id').delete(empresaController.remove);
empresaRouter.route('/').patch(empresaController.update);
empresaRouter.route('/:id').get(empresaController.getById);
empresaRouter.route('/:skip/:limit').get(empresaController.getList);
empresaRouter.route('/').get(empresaController.count);
empresaRouter.route('/me/follow').post(verifyEmpresa, empresaController.follow);
empresaRouter.route('/me/unfollow').post(verifyEmpresa, empresaController.unfollow);
empresaRouter.route('/me/getListFollowing').post(verifyEmpresa, empresaController.getListFollowing);
empresaRouter.route('/me/getListFollowers').post(verifyEmpresa, empresaController.getListFollowers);

module.exports = { empresaRouter };
