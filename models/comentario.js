var Comentario = new Schema({
    texto: { type: String, required: true },
    curtidas: { type: Number },
    data: {    type: Date, default: Date.now },
    listaComentario: [Schema.Types.ObjectId]
});
