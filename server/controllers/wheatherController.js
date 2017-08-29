const { getWeather, geocodeAddress } = require('../utils/weather');

const getInfoWeather = (req, res) => {
	var body = _.pick(req.body, ['endereco']);

	geocodeAddress(body.endereco, (errorMessage, results) => {
	if (errorMessage) {
		return res.status(500).send();
		console.log(errorMessage);
	} else {
		weather.getWeather(results.latitude, results.longitude, (errorMessage, weatherResult) => {
			if (errorMessage) {
				console.log(errorMessage);
			} else {
				console.log(`Its currently ${weatherResult.temperature}. It feels like ${weatherResult.apparentTemperature}`);
			}
		});
	}
};

module.exports = {
    getInfoWeather
};
