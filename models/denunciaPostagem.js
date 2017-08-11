var DenunciaPostagem = new Schema({
    quantidade_denuncias: { type: Number },
    resolvido: { type: Boolean, required: true },
    _idPostagem: Schema.Types.ObjectId
});
