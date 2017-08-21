const validator = require("validator");
const mongoose = require('mongoose');

const EstadoSchema = new mongoose.Schema({
    nome: { type: String, required: true, unique: true },
    sigla: { type: String, required: true, unique: true, max: 5, min: 2 },
    listaCidade: [mongoose.Schema.ObjectId]
});

const Estado = mongoose.model(('Estado'), EstadoSchema);

module.exports = { Estado }
