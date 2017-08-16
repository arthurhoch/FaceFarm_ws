const validator = require("validator");
const mongoose = require('mongoose');

const EntropiaAnuncio = new mongoose.Schema({
    views: { type: Number, required: true },
    valorPago: { type: Number, required: true },
    entropia: Number
});

module.exports = { EntropiaAnuncio }
