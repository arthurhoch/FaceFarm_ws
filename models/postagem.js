var Postagem = new Schema({
    texto: { type: String, required: true },
    curtidas: { type: Number },
    data: {    type: Date, default: Date.now },
    preco: { type: Number },
    quantidadeTotal: { type: Number },
    quantidadeMedida: { type: Number },
    unidadeMedida: { type: Number },
    listaComentario: [Schema.Types.ObjectId],
    listaCultura: [Schema.Types.ObjectId],
    listaImagen: [Schema.Types.ObjectId]
});
