const validator = require("validator");
const mongoose = require('mongoose');

const Banimento = new mongoose.Schema({
    motivoBanimento: { type: String, required: true },
    inicio: { type: Date, default: Date.now },
    fim: { type: Date, default: Date.now, required: true }

});

module.exports = { Banimento }
