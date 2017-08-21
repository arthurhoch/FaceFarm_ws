const express = require('express');

const postagemController = require('../controllers/postagemController');

const postagemRouter = express.Router();

postagemRouter.route('/create').post(postagemController.create);
postagemRouter.route('/remove/:id').delete(postagemController.remove);
postagemRouter.route('/update').patch(postagemController.update);
postagemRouter.route('/getById/:id').get(postagemController.getById);
postagemRouter.route('/getList').get(postagemController.getList);

module.exports = { postagemRouter };
