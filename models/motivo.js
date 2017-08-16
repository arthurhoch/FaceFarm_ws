var mongoose = require('mongoose');

var Motivo = new Schema({
    motivo: { type: String, required: true },
    data: {    type: Date, default: Date.now }
});

module.exports = { Motivo }
