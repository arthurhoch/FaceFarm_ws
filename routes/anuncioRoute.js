var express = require('express');

var anuncioController = require('../controllers/anuncioController');

var anuncioRouter = express.Router();

anuncioRouter.route('/create').post(anuncioController.create);
anuncioRouter.route('/remove/:id').delete(anuncioController.remove);
anuncioRouter.route('/update').patch(anuncioController.update);
anuncioRouter.route('/getById/:id').get(anuncioController.getById);
anuncioRouter.route('/getList').get(anuncioController.getList);

module.exports = { anuncioRouter };