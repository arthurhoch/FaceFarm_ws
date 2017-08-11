var Banimento = new Schema({
    motivoBanimento: { type: String, required: true },
    inicio: { type: Date, default: Date.now },
    fim: { type: Date, default: Date.now, required: true }

});
