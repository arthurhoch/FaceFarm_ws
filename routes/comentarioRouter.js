const express = require('express');

const comentarioController = require('../controllers/comentarioController');

const comentarioRouter = express.Router();

comentarioRouter.route('/create').post(comentarioController.create);
comentarioRouter.route('/remove/:id').delete(comentarioController.remove);
comentarioRouter.route('/update').patch(comentarioController.update);
comentarioRouter.route('/getById/:id').get(comentarioController.getById);
comentarioRouter.route('/getList').get(comentarioController.getList);

module.exports = { comentarioRouter };
