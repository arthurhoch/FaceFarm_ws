const validator = require("validator");
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const _ = require('lodash');
var fs = require('fs');

const EmpresaSchema = new mongoose.Schema({
    login: { type: String, required: true, unique: true, lowercase: true, trim: true },
    senha: { type: String, required: true, min: 8 },
    nomeCompleto: { type: String, required: true, lowercase: true, trim: true, min: 6 },
    cnpj: { type: String, required: true, unique: true, min: 14, max: 14 },
    email: {
        required: true,
        type: String,
        validate: {
            validator: validator.isEmail,
            message: '{VALUE} não é um email válido.'
        }
    },
    telefone: { type: String },
    whattsapp: { type: String },
    bloqueado: { type: Boolean, required: true },
    visitas: { type: Number, default: 0 },
    sexo: { type: String },
    imagemPerfil: { type: String },
    dataCriacaoConta: { type: Date, default: Date.now },
    dataAberturaEmpresa: { type: Date, default: Date.now },
    hashConfirmacao: { type: String },
    configuracao: mongoose.Schema.ObjectId,
    listaDenunciaUsuario: [mongoose.Schema.ObjectId],
    listaCultura: [mongoose.Schema.ObjectId],
    listaPostagem: [mongoose.Schema.ObjectId],
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

EmpresaSchema.methods.generateAuthToken = function() {
    var Empresa = this;

    var cert = fs.readFileSync('server/keys/empresa.private_key.pem');
    var access = 'auth';
    var token = jwt.sign({ _id: Empresa._id.toHexString(), access },
        cert, { algorithm: 'RS256' });

    let tokenAuth = Empresa.tokens.filter((t) => {
        if (t.access === 'auth') {
            t.token = token;
            return true;
        }

        return false;
    });

    if (tokenAuth.length === 0) {
        Empresa.tokens.push({ access, token });
    }

    return Empresa.save().then(() => {
        return token;
    });
};

EmpresaSchema.statics.findByToken = function(token) {
    var Empresa = this;
    var decoded;

    var cert = fs.readFileSync('server/keys/empresa.public_key.pem');

    try {
        decoded = jwt.verify(token, cert, { algorithms: ['RS256'] });
    } catch (e) {
        return Promise.reject();
    }

    return Empresa.findOne({
        '_id': decoded._id,
        'tokens.token': token,
        'tokens.access': 'auth'
    });
};

EmpresaSchema.statics.findByCredentials = function(email, login, senha) {
    let Empresa = this;

    let data;
    if (login) {
        data = {login};
    }else{
        data = {email};
    }


    return Empresa.findOne(data).then((empresa) => {
        if (!empresa) {
            return Promise.reject();
        }

        return new Promise((resolve, reject) => {
            bcrypt.compare(senha, empresa.senha, (err, res) => {
                if (res) {
                    resolve(empresa);
                } else {
                    reject();
                }
            });
        });
    });
};

EmpresaSchema.pre('save', function(next) {
    var Empresa = this;

    if (Empresa.isModified('senha')) {
        var senha = Empresa.senha
        bcrypt.genSalt(1, (err, salt) => {
            bcrypt.hash(senha, salt, (err, hash) => {
                Empresa.senha = hash;
                next();
            })
        })

    } else {
        next();
    }
});

const Empresa = mongoose.model(('Empresa'), EmpresaSchema);

module.exports = { Empresa }