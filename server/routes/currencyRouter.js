const express = require('express');

const currencyController = require('../controllers/currencyController');
const { verifyAgricultor } = require('../middlewares/middleAgricultor');

const currencyRouter = express.Router();

currencyRouter.route('/').post(verifyAgricultor, currencyController.getInfoCurrency);

module.exports = { currencyRouter };