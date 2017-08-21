const express = require('express');

const cidadeController = require('../controllers/cidadeController');

const cidadeRouter = express.Router();

cidadeRouter.route('/create').post(cidadeController.create);
cidadeRouter.route('/remove/:id').delete(cidadeController.remove);
cidadeRouter.route('/update').patch(cidadeController.update);
cidadeRouter.route('/getById/:id').get(cidadeController.getById);
cidadeRouter.route('/getList').get(cidadeController.getList);

module.exports = { cidadeRouter };
