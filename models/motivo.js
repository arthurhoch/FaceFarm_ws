const validator = require("validator");
const mongoose = require('mongoose');

const MotivoSchema = new mongoose.Schema({
    motivo: { type: String, required: true },
    data: {    type: Date, default: Date.now }
});

const Motivo = mongoose.model(('Motivo'), MotivoSchema);

module.exports = { Motivo }
