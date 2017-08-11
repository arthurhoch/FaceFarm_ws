var FerramentasAgricolas = new Schema({
    nome: { type: String, required: true },
    descricao: { type: String, required: false, },
    dataCadastro: {    type: Date, default: Date.now },
    exibirPublico: { type: Boolean, default: false },
    listaImagen: [Schema.Types.ObjectId]
});
