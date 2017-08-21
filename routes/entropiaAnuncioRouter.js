const express = require('express');

const entropiaAnuncioController = require('../controllers/entropiaAnuncioController');

const entropiaAnuncioRouter = express.Router();

entropiaAnuncioRouter.route('/create').post(entropiaAnuncioController.create);
entropiaAnuncioRouter.route('/remove/:id').delete(entropiaAnuncioController.remove);
entropiaAnuncioRouter.route('/update').patch(entropiaAnuncioController.update);
entropiaAnuncioRouter.route('/getById/:id').get(entropiaAnuncioController.getById);
entropiaAnuncioRouter.route('/getList').get(entropiaAnuncioController.getList);

module.exports = { entropiaAnuncioRouter };
