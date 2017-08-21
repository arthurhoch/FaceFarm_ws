const express = require('express');

const imagemController = require('../controllers/imagemController');

const imagemRouter = express.Router();

imagemRouter.route('/create').post(imagemController.create);
imagemRouter.route('/remove/:id').delete(imagemController.remove);
imagemRouter.route('/update').patch(imagemController.update);
imagemRouter.route('/getById/:id').get(imagemController.getById);
imagemRouter.route('/getList').get(imagemController.getList);

module.exports = { imagemRouter };
