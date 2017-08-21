const validator = require("validator");
const mongoose = require('mongoose');

const EntropiaAnuncioSchema = new mongoose.Schema({
    views: { type: Number, required: true },
    valorPago: { type: Number, required: true },
    entropia: Number
});

const EntropiaAnuncio = mongoose.model(('EntropiaAnuncio'), EntropiaAnuncioSchema);

module.exports = { EntropiaAnuncio }
