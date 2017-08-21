const express = require('express');

const moderadorController = require('../controllers/moderadorController');

const moderadorRouter = express.Router();

moderadorRouter.route('/create').post(moderadorController.create);
moderadorRouter.route('/remove/:id').delete(moderadorController.remove);
moderadorRouter.route('/update').patch(moderadorController.update);
moderadorRouter.route('/getById/:id').get(moderadorController.getById);
moderadorRouter.route('/getList').get(moderadorController.getList);

module.exports = { moderadorRouter };
