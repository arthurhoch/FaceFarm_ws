const validator = require("validator");
const mongoose = require('mongoose');

const Estado = new mongoose.Schema({
    nome: { type: String, required: true, unique: true },
    sigla: { type: String, required: true, unique: true, max: 5, min: 2 },
    listaCidade: [mongoose.Schema.ObjectId]
});

module.exports = { Estado }
