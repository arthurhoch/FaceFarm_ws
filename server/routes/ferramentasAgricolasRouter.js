const express = require('express');

const ferramentasAgricolasController = require('../controllers/ferramentasAgricolasController');
const {verifyAgricultor} = require('../middlewares/middleAgricultor');

const ferramentasAgricolasRouter = express.Router();

ferramentasAgricolasRouter.route('/').post(verifyAgricultor, ferramentasAgricolasController.create);
ferramentasAgricolasRouter.route('/:id').delete(verifyAgricultor, ferramentasAgricolasController.remove);
ferramentasAgricolasRouter.route('/').patch(verifyAgricultor, ferramentasAgricolasController.update);
ferramentasAgricolasRouter.route('/:id').get(verifyAgricultor, ferramentasAgricolasController.getById);
ferramentasAgricolasRouter.route('/:skip/:limit').get(verifyAgricultor, ferramentasAgricolasController.getList);
ferramentasAgricolasRouter.route('/').get(verifyAgricultor, ferramentasAgricolasController.count);

module.exports = { ferramentasAgricolasRouter };
