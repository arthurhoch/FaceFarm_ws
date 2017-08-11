var DenunciaAnuncio = new Schema({
    quantidade_denuncias: { type: Number },
    resolvido: { type: Boolean, required: true },
    listaMotivos: [Schema.Types.ObjectId],
    _idAnuncio: Schema.Types.ObjectId
});

