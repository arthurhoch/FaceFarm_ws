const express = require('express');

const culturaController = require('../controllers/culturaController');

const culturaRouter = express.Router();

culturaRouter.route('/create').post(culturaController.create);
culturaRouter.route('/remove/:id').delete(culturaController.remove);
culturaRouter.route('/update').patch(culturaController.update);
culturaRouter.route('/getById/:id').get(culturaController.getById);
culturaRouter.route('/getList').get(culturaController.getList);

module.exports = { culturaRouter };
