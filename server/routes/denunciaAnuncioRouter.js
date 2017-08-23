const express = require('express');

const denunciaAnuncioController = require('../controllers/denunciaAnuncioController');

const denunciaAnuncioRouter = express.Router();

denunciaAnuncioRouter.route('/').post(denunciaAnuncioController.create);
denunciaAnuncioRouter.route('/:id').delete(denunciaAnuncioController.remove);
denunciaAnuncioRouter.route('/').patch(denunciaAnuncioController.update);
denunciaAnuncioRouter.route('/:id').get(denunciaAnuncioController.getById);
denunciaAnuncioRouter.route('/:skip/:limit').get(denunciaAnuncioController.getList);
denunciaAnuncioRouter.route('/').get(denunciaAnuncioController.count);

module.exports = { denunciaAnuncioRouter };
