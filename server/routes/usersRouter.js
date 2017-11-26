const express = require('express');

const usersController = require('../controllers/usersController');
const { verifyUser } = require('../middlewares/middleUser');

const usersRouter = express.Router();

usersRouter.route('/:id').get(verifyUser, usersController.getUserById);
usersRouter.route('/:searchParam/:skip?/:limit?').get(verifyUser, usersController.searchUserByName);
usersRouter.route('/').get(verifyUser, usersController.count);

module.exports = { usersRouter };