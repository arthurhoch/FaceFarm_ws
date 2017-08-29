const _ = require('lodash');

const { getWeather, geocodeAddress } = require('../utils/weather');

const getInfoWeather = (req, res) => {
	var body = _.pick(req.body, ['endereco']);

	geocodeAddress(body.endereco, (errorCode, results) => {
		if (errorCode) {
			return res.status(500).send({cod: errorCode});
			console.log(errorCode);
		} else {
			getWeather(results.latitude, results.longitude, (errorCode, weatherResult) => {
				if (errorCode) {
					return res.status(500).send({cod: errorCode});
					console.log(errorCode);
				} else {
					return res.send(weatherResult);
				}
			});
		}
	});
};

module.exports = {
    getInfoWeather
};
