const express = require('express');

const culturaController = require('../controllers/culturaController');

const culturaRouter = express.Router();

culturaRouter.route('/').post(culturaController.create);
culturaRouter.route('/:id').delete(culturaController.remove);
culturaRouter.route('/').patch(culturaController.update);
culturaRouter.route('/:id').get(culturaController.getById);
culturaRouter.route('/:skip/:limit').get(culturaController.getList);
culturaRouter.route('/').get(culturaController.count);

module.exports = { culturaRouter };
