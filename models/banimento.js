const validator = require("validator");
const mongoose = require('mongoose');

const BanimentoSchema = new mongoose.Schema({
    motivoBanimento: { type: String, required: true },
    inicio: { type: Date, default: Date.now },
    fim: { type: Date, default: Date.now, required: true }

});

const Banimento = mongoose.model(('Banimento'), BanimentoSchema);

module.exports = { Banimento }
