const express = require('express');

const weatherController = require('../controllers/weatherController');
const { verifyAgricultor } = require('../middlewares/middleAgricultor');

const weatherRouter = express.Router();

weatherRouter.route('/').post(verifyAgricultor, weatherController.getInfoWeather);

module.exports = { weatherRouter };