const _ = require('lodash');

const { getCurrency } = require('../utils/currency');

const getInfoCurrency = (req, res) => {
	var body = _.pick(req.body, ['base']);

	getCurrency(body.base, (errorCode, results) => {
		if (errorCode) {
			return res.status(500).send({cod: errorCode});
		} else {
			return res.send(results);
		}
	})
};

module.exports = {
    getInfoCurrency
};