const express = require('express');

const usersController = require('../controllers/usersController');
const { verifyUser } = require('../middlewares/middleUser');

const usersRouter = express.Router();

usersRouter.route('/:id').get(verifyUser, usersController.getUserById);
usersRouter.route('/:searchParam/:skip?/:limit?').get(verifyUser, usersController.searchUserByName);
usersRouter.route('/').get(verifyUser, usersController.count);
usersRouter.route('/me/follow').post(verifyUser, usersController.follow);
usersRouter.route('/me/unfollow').post(verifyUser, usersController.unfollow);
usersRouter.route('/me/getListFollowing').post(verifyUser, usersController.getListFollowing);
usersRouter.route('/me/getListFollowers').post(verifyUser, usersController.getListFollowers);

usersRouter.route('/me/changeProfilePicture').post(verifyUser, usersController.changeProfilePicture);

module.exports = { usersRouter };