var Cidade = new Schema({
    nome: { type: String, required: true, unique: true },
    geo: {type: [Number], index: '2d'},
});
