var Estado = new Schema({
    nome: { type: String, required: true, unique: true },
    sigla: { type: String, required: true, unique: true, max: 5, min: 2 },
    listaCidade: [Schema.Types.ObjectId]
});
