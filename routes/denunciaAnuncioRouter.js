const express = require('express');

const denunciaAnuncioController = require('../controllers/denunciaAnuncioController');

const denunciaAnuncioRouter = express.Router();

denunciaAnuncioRouter.route('/create').post(denunciaAnuncioController.create);
denunciaAnuncioRouter.route('/remove/:id').delete(denunciaAnuncioController.remove);
denunciaAnuncioRouter.route('/update').patch(denunciaAnuncioController.update);
denunciaAnuncioRouter.route('/getById/:id').get(denunciaAnuncioController.getById);
denunciaAnuncioRouter.route('/getList').get(denunciaAnuncioController.getList);

module.exports = { denunciaAnuncioRouter };
