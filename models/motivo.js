const validator = require("validator");
const mongoose = require('mongoose');

const Motivo = new mongoose.Schema({
    motivo: { type: String, required: true },
    data: {    type: Date, default: Date.now }
});

module.exports = { Motivo }
