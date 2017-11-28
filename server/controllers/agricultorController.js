const _ = require('lodash');

const { Agricultor } = require('../models/agricultor');
const { Empresa } = require('../models/empresa');
const { Followers } = require('../models/followers');
const { Following } = require('../models/following');
const { ObjectID } = require('mongodb')

const create = (req, res) => {
    var body = _.pick(req.body, ['login', 'senha', 'nomeCompleto',
        'cpf', 'email', 'telefone', 'whattsapp', 'bloqueado', 'visitas',
        'sexo', 'imagemPerfil', 'dataCriacaoConta', 'dataNascimento',
        'hashConfirmacao'
    ]);

    var agricultor = new Agricultor(body);

    agricultor.save().then((doc) => {
        return res.send(doc)
    }, (e) => {
        return res.status(400).send(e)
    })
};

const remove = (req, res) => {
    var id = req.params.id

    if (!ObjectID.isValid(id)) {
        return res.status(404).send()
    }

    Agricultor.findByIdAndRemove(id).then((agricultor) => {
        if (!agricultor) {
            return res.status(404).send()
        }
        return res.send({ agricultor })
    }).catch((e) => res.status(400).send(e))
};

const update = (req, res) => {
    var body = _.pick(req.body, ['_id', 'login', 'senha', 'nomeCompleto',
        'cpf', 'email', 'telefone', 'whattsapp', 'bloqueado', 'visitas',
        'sexo', 'imagemPerfil', 'dataCriacaoConta', 'dataNascimento',
        'hashConfirmacao'
    ]);

    var agricultor = new Agricultor(body)

    id = agricultor._id;

    if (!ObjectID.isValid(id)) {
        return res.status(404).send()
    }

    Agricultor.findByIdAndUpdate(id, { $set: agricultor }, { new: true })
        .then((agricultorEdited) => {
            if (!agricultorEdited) {
                return res.status(404).send()
            }

            return res.send({ agricultorEdited })
        }).catch((e) => {
            return res.status(400).send(e)
        });
};

const getList = (req, res) => {
    var limit = parseInt(req.params.limit, 10);
    var skip = parseInt(req.params.skip, 10);

    Agricultor.find().skip(skip).limit(limit)
        .then((agricultorList) => {
            return res.send({ agricultorList })
        }), (e) => {
            return res.status(400).send(e)
        }
};

const count = (req, res) => {
    Agricultor.count({})
        .then((counter) => {
            return res.send({ counter })
        }), (e) => {
            return res.status(400).send(e)
        }
};

const getById = (req, res) => {
    var id = req.params.id;
    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    Agricultor.findById(id).then((agricultor) => {
        if (!agricultor) {
            return res.status(404).send();
        }
        return res.send({ agricultor })
    }).catch((e) => res.status(400).send(e));
};

const follow = (req, res) => {
    let agricultorId = req.agricultor._id;
    let body = _.pick(req.body, ['id']);
    let id_seguindo = body.id;

    if (!ObjectID.isValid(id_seguindo)) {
        return res.status(404).send({ cod: "ERROR_ID_INVALIDO" });
    }

    Empresa.where({ _id: id_seguindo }).count().then((count) => {
        if (count > 0) {
            Following.followUser(agricultorId, id_seguindo, 'followingListEmpresa').then((following) => {
                Followers.addFollower(id_seguindo, agricultorId, 'followersListAgricultor').then((follower) => {
                    return res.send({ cod: "SUCCESS_SEGUINDO" });
                }).catch((e) => { return res.status(400).send({ cod: "ERROR_ADICIONAR_SEGUIDORES" }), e });
            }).catch((e) => {
                if (e.codeName === 'DuplicateKey') {
                    return res.status(400).send({ cod: "INFO_JA_ESTA_SEGUINDO" }, e)
                } else {
                    console.log(e)
                    return res.status(400).send({ cod: "ERROR_SEGUIR" }, e)
                }
            });
        }
        Agricultor.where({ _id: id_seguindo }).count().then((count) => {
            if (count > 0) {
                Following.followUser(agricultorId, id_seguindo, 'followingListAgricultor').then((following) => {
                    Followers.addFollower(id_seguindo, agricultorId, 'followersListEmpresa').then((follower) => {
                        return res.send({ cod: "SUCCESS_SEGUINDO" });
                    }).catch((e) => { return res.status(400).send({ cod: "ERROR_ADICIONAR_SEGUIDORES" }), e });
                }).catch((e) => {
                    if (e.codeName === 'DuplicateKey') {
                        return res.status(400).send({ cod: "INFO_JA_ESTA_SEGUINDO" }, e)
                    } else {
                        console.log(e)
                        return res.status(400).send({ cod: "ERROR_SEGUIR" }, e)
                    }
                });
            }
        }).catch((e) => { return res.status(404).send({ cod: 'ERROR_PROCURAR_USUARIO' }), e });
    }).catch((e) => { return res.status(400).send({ cod: 'ERROR_PROCURAR_USUARIO' }), e });
};

const unfollow = (req, res) => {
    let agricultorId = req.agricultor._id;
    let body = _.pick(req.body, ['id']);
    let id_seguindo = body.id;

    if (!ObjectID.isValid(id_seguindo)) {
        return res.status(404).send({ cod: "ERROR_ID_INVALIDO" });
    }

    Empresa.where({ _id: id_seguindo }).count().then((count) => {
        if (count > 0) {
            Following.unfollowUser(agricultorId, id_seguindo, 'followingListEmpresa').then((following) => {
                Followers.removeFollower(id_seguindo, agricultorId, 'followersListAgricultor').then((follower) => {
                    if (follower) {
                        return res.send({ cod: "SUCCESS_UNFOLLOW" });
                    }
                    return res.send({ cod: "INFO_USUARIO_NAO_ENCONTRADO" });
                }).catch((e) => { return res.status(400).send({ cod: "ERROR_UNFOLLOW", e }) });
            }).catch((e) => {
                console.log(e)
                return res.status(400).send({ cod: "ERROR_UNFOLLOW" }, e)
            });
        }
        Agricultor.where({ _id: id_seguindo }).count().then((count) => {
            if (count > 0) {
                Following.unfollowUser(agricultorId, id_seguindo, 'followingListAgricultor').then((following) => {
                    Followers.removeFollower(id_seguindo, agricultorId, 'followersListEmpresa').then((follower) => {
                        if (follower) {
                            return res.send({ cod: "SUCCESS_UNFOLLOW" });
                        }
                        return res.send({ cod: "INFO_USUARIO_NAO_ENCONTRADO" });
                    }).catch((e) => { return res.status(400).send({ cod: "ERROR_UNFOLLOW" + e }), e });
                }).catch((e) => {
                    return res.status(400).send({ cod: "ERROR_UNFOLLOW" }, e)
                });
            }
        }).catch((e) => { return res.status(404).send({ cod: 'ERROR_PROCURAR_USUARIO' }), e });
    }).catch((e) => { return res.status(400).send({ cod: 'ERROR_PROCURAR_USUARIO' }), e });
}

const getListFollowing = (req, res) => {
    let agricultorId = req.agricultor._id;

    Following.findById(agricultorId)
        .populate('followingListAgricultor', 'nomeCompleto')
        .populate('followingListEmpresa', 'nomeCompleto')
        .exec().then((listSeguindo) => {
            return res.send(listSeguindo);
        }).catch((e) => res.status(400).send({ cod: 'ERROR_OBTER_LISTA_SEGUINDO' }, e));
};

const getListFollowers = (req, res) => {
    let agricultorId = req.agricultor._id;

    Followers.findById(agricultorId)
        .populate('followersListAgricultor', 'nomeCompleto')
        .populate('followersListEmpresa', 'nomeCompleto')
        .exec().then((listSeguidores) => {
            return res.send(listSeguidores);
        }).catch((e) => res.status(400).send({ cod: 'ERROR_OBTER_LISTA_SEGUINDO' }, e));
};

module.exports = {
    create,
    remove,
    update,
    getList,
    count,
    getById,
    follow,
    unfollow,
    getListFollowers,
    getListFollowing
};