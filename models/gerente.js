var Gerente = new Schema({
    login: { type: String, required: true, unique: true, lowercase: true, trim: true },
    senha: { type: String, required: true, min: 8 },
    nomeCompleto: { type: String, required: true, lowercase: true, trim: true, min: 6 },
    email: {type: String, validate: {
            validator: validator.isEmail,
            message: '{VALUE} não é um email válido.'
        }},
    listaPlanoAnuncio: [Schema.Types.ObjectId],
    listaNotificacao: [Schema.Types.ObjectId]
});
