const request = require('request');

const getCurrency = (base, callback) => {
	request({
		url: `http://api.fixer.io/latest?base=${base}`,
		json: true
	}, (error, reponse, body) => {
		if (!error && reponse.statusCode === 200) {
			callback(undefined, {body});
		} else {
			callback('ERROR_CONNECT_FIXER');
		}
	});	
};

module.exports = {
	getCurrency
};
