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
agricultorRouter.route('/seguir').post(verifyAgricultor, agricultorController.seguir);
// agricultorRouter.route('/seguidores').get(verifyAgricultor, agricultorController.getListSeguidores);
// agricultorRouter.route('/seguindo').get(verifyAgricultor, agricultorController.count);
// agricultorRouter.route('/unfollow/:id').post(verifyAgricultor, agricultorController.count);

module.exports = { agricultorRouter };