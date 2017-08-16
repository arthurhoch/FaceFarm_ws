const validator = require("validator");
const mongoose = require('mongoose');

const Cidade = new mongoose.Schema({
    nome: { type: String, required: true, unique: true },
    geo: {type: [Number], index: '2d'},
});

module.exports = { Cidade }
