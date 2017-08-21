const validator = require("validator");
const mongoose = require('mongoose');

const CulturaSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    quantidadeUsuarios: { type: Number },
});

const Cultura = mongoose.model(('Cultura'), CulturaSchema);


module.exports = { Cultura }
