const express = require('express');

const agricultorController = require('../controllers/agricultorController');
const { verifyAgricultor } = require('../middlewares/middleAgricultor');

const agricultorRouter = express.Router();

agricultorRouter.route('/').post(agricultorController.create);
agricultorRouter.route('/:id').delete(agricultorController.remove);
agricultorRouter.route('/').patch(agricultorController.update);
agricultorRouter.route('/:id').get(verifyAgricultor, agricultorController.getById);
agricultorRouter.route('/:skip/:limit').get(agricultorController.getList);
agricultorRouter.route('/').get(agricultorController.count);
agricultorRouter.route('/me/follow').post(verifyAgricultor, agricultorController.follow);
agricultorRouter.route('/me/unfollow').post(verifyAgricultor, agricultorController.unfollow);
agricultorRouter.route('/me/getListFollowing').post(verifyAgricultor, agricultorController.getListFollowing);
agricultorRouter.route('/me/getListFollowers').post(verifyAgricultor, agricultorController.getListFollowers);
// agricultorRouter.route('/unfollow/:id').post(verifyAgricultor, agricultorController.count);

module.exports = { agricultorRouter };