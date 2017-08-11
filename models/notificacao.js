var Notificacao = new Schema({
    texto: { type: String, required: true },
    data: {    type: Date, default: Date.now },
    preco: { type: Number },
    visualizada: { type: Boolean },
    link: { type: String },
    dataGeracao: { type: Date, default: Date.now }
});
