const validator = require("validator");
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const _ = require('lodash');
var fs = require('fs');

const AgricultorSchema = new mongoose.Schema({
    login: { type: String, required: true, unique: true, lowercase: true, trim: true },
    senha: { type: String, required: true, min: 8 },
    nomeCompleto: { type: String, required: true, lowercase: true, trim: true, min: 6 },
    cpf: { type: String, required: true, unique: true, min: 11, max: 11 },
    email: {
        type: String,
        required: true,
        validate: {
            validator: validator.isEmail,
            message: '{VALUE} não é um email válido.'
        }
    },
    telefone: { type: String },
    whattsapp: { type: String },
    bloqueado: { type: Boolean, default: false },
    visitas: { type: Number, default: 0 },
    sexo: { type: String },
    imagemPerfil: { type: String },
    dataCriacaoConta: { type: Date, default: Date.now },
    dataNascimento: { type: Date, default: Date.now },
    hashConfirmacao: { type: String },
    configuracao: mongoose.Schema.ObjectId,
    listaDenunciaUsuario: [mongoose.Schema.ObjectId],
    listaDenunciaAnuncio: [mongoose.Schema.ObjectId],
    listaCultura: [mongoose.Schema.ObjectId],
    listaPostage: [mongoose.Schema.ObjectId],
    listaComentarios: [mongoose.Schema.ObjectId],
    listaImagen: [mongoose.Schema.ObjectId],
    listaCidade: [mongoose.Schema.ObjectId],
    listaBanimento: [mongoose.Schema.ObjectId],
    listaNotificacao: [mongoose.Schema.ObjectId],
    tokens: [{
        access: {
            type: String,
            required: true
        },
        token: {
            type: String,
            required: true
        }
    }]
});

AgricultorSchema.methods.generateAuthToken = function() {
    var Agricultor = this;

    var cert = fs.readFileSync('server/keys/agricultor.private_key.pem');
    var access = 'auth';
    var token = jwt.sign({ _id: Agricultor._id.toHexString(), access },
        cert, { algorithm: 'RS256' });

    let tokenAuth = Agricultor.tokens.filter((t) => {
        if (t.access === 'auth') {
            t.token = token;
            return true;
        }

        return false;
    });

    if (tokenAuth.length === 0) {
        Agricultor.tokens.push({ access, token });
    }

    return Agricultor.save().then(() => {
        return token;
    });
};

AgricultorSchema.statics.findByToken = function(token) {
    var Agricultor = this;
    var decoded;

    var cert = fs.readFileSync('server/keys/agricultor.public_key.pem');

    try {
        decoded = jwt.verify(token, cert, { algorithms: ['RS256'] });
    } catch (e) {
        return Promise.reject();
    }

    return Agricultor.findOne({
        '_id': decoded._id,
        'tokens.token': token,
        'tokens.access': 'auth'
    });
};

AgricultorSchema.statics.findByCredentials = function(email, login, senha) {
    var Agricultor = this;

    let data;
    if (login) {
        data = {login};
    }else{
        data = {email};
    }

    return Agricultor.findOne(data).then((agricultor) => {
        
        if (!agricultor) {
            return Promise.reject();
        }

        return new Promise((resolve, reject) => {
            bcrypt.compare(senha, agricultor.senha, (err, res) => {
                if (res) {
                    resolve(agricultor);
                } else {
                    reject();
                }
            });
        });
    });
};

AgricultorSchema.pre('save', function(next) {
    var Agricultor = this;

    if (Agricultor.isModified('senha')) {
        var senha = Agricultor.senha
        bcrypt.genSalt(1, (err, salt) => {
            bcrypt.hash(senha, salt, (err, hash) => {
                Agricultor.senha = hash;
                next();
            })
        })

    } else {
        next();
    }
});

const Agricultor = mongoose.model('Agricultor', AgricultorSchema);

module.exports = { Agricultor };