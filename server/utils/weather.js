const request = require('request');

const getWeather = (lat, lng, callback) => {
	request({
		url: `https://api.forecast.io/forecast/api/${lat},${lng}`,
		json: true
	}, (error, reponse, body) => {
		if (!error && reponse.statusCode === 200) {
			callback(undefined, {
				temperature: body.currenttly.temperature,
				apparentTemperature: body.currenttly.apparentTemperature
			});
		} else {
			callback('ERRO_CONNECT_FORECAST');
		}
	});	
};

const geocodeAddress = (address, callback) => {
	var econdeAddress = encodeURIComponent(address);

	request( {
		url: `http://maps.googleapis.com/maps/api/geocode/json?address=${econdeAddress}`,
		json:  true
	}, (error, reponse, body)  => {
		if (error) {
			callback('ERRO_CONNECT_GOOGLE');
		} else if (body.status === 'ZERO_RESULTS') {
			callback('ERRO_ENDERECO_INVALIDO');
		} else if (body.status === 'OK') {
			callback(undefined, {
				address: body.results[0].formatted_address,
				latitude: body.results[0].geometry.location.lat,
				longitude: body.results[0].geometry.location.lng
			});
		}
	});
};

module.exports = {
	getWeather,
	geocodeAddress
};