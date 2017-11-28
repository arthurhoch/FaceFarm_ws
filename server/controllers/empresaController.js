const _ = require('lodash');

const { Agricultor } = require('../models/agricultor');
const { Empresa } = require('../models/empresa');
const { Followers } = require('../models/followers');
const { Following } = require('../models/following');
const { ObjectID } = require('mongodb')

const create = (req, res) => {
    var body = _.pick(req.body, ['login', 'senha', 'nomeCompleto', 'cnpj',
        'email', 'telefone', 'whattsapp', 'bloqueado', 'visitas', 'sexo',
        'imagemPerfil', 'dataCriacaoConta', 'dataAberturaEmpresa', 'hashConfirmacao',
        'configuracao', 'listaDenunciaUsuario', 'listaCultura', 'listaPostage',
        'listaComentarios', 'listaImagen', 'listaCidade', 'listaBanimento',
        'listaNotificacao']);

    var empresa = new Empresa(body)

    empresa.save().then((doc) => {
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

    Empresa.findByIdAndRemove(id).then((empresa) => {
        if (!empresa) {
            return res.status(404).send()
        }
        return res.send({ empresa })
    }).catch((e) => res.status(400).send())
};

const update = (req, res) => {
    var body = _.pick(req.body, ['login', 'senha', 'nomeCompleto', 'cnpj',
        'email', 'telefone', 'whattsapp', 'bloqueado', 'visitas', 'sexo',
        'imagemPerfil', 'dataCriacaoConta', 'dataAberturaEmpresa', 'hashConfirmacao',
        'configuracao', 'listaDenunciaUsuario', 'listaCultura', 'listaPostage',
        'listaComentarios', 'listaImagen', 'listaCidade', 'listaBanimento',
        'listaNotificacao']);

    var empresa = new Empresa(body)

    id = empresa._id;

    if (!ObjectID.isValid(id)) {
        return res.status(404).send()
    }

    Empresa.findByIdAndUpdate(id, { $set: empresa }, { new: true }).then((empresaEdited) => {
        if (!empresaEdited) {
            return res.status(404).send()
        }

        return res.send({ empresaEdited })
    }).catch((e) => {
        return res.status(400).send()
    });
};

const getList = (req, res) => {
    Empresa.find().then((empresaList) => {
        return res.send({ empresaList })
    }), (e) => {
        return res.status(400).send(e)
    }
};

const count = (req, res) => {
    Empresa.count({})
        .then((counter) => {
            return res.send({ counter })
        }), (e) => {
            return res.status(400).send(e)
        }
};

const getById = (req, res) => {
    var id = req.params.id
    if (!ObjectID.isValid(id)) {
        return res.status(404).send()
    }

    Empresa.findById(id).then((empresa) => {
        if (!empresa) {
            return res.status(404).send()
        }
        return res.send({ empresa })
    }).catch((e) => res.status(400).send())
};

const follow = (req, res) => {
    let empresaId = req.empresa._id;
    let body = _.pick(req.body, ['id']);
    let id_seguindo = body.id;

    if (!ObjectID.isValid(id_seguindo)) {
        return res.status(404).send({ cod: "ERROR_ID_INVALIDO" });
    }

    Empresa.where({ _id: id_seguindo }).count().then((count) => {
        if (count > 0) {
            Seguindo.followUser(empresaId, id_seguindo, 'followingListEmpresa').then((seguindo) => {
                Following.addFollower(id_seguindo, empresaId, 'followersListAgricultor').then((seguidor) => {
                    return res.send({ cod: "SUCCESS_SEGUINDO" });
                }).catch((e) => { return res.status(400).send({ cod: "ERROR_ADICIONAR_SEGUIDORES" }) });
            }).catch((e) => {
                if (e.codeName === 'DuplicateKey') {
                    return res.status(400).send({ cod: "INFO_JA_ESTA_SEGUINDO" })
                } else {
                    return res.status(400).send({ cod: "ERROR_SEGUIR" })
                }
            });
        }
        Agricultor.where({ _id: id_seguindo }).count().then((count) => {
            if (count > 0) {
                Following.followUser(empresaId, id_seguindo, 'followingListAgricultor').then((seguindo) => {
                    Followers.addFollower(id_seguindo, empresaId, 'followersListEmpresa').then((seguidor) => {
                        return res.send({ cod: "SUCCESS_SEGUINDO" });
                    }).catch(() => { return res.status(400).send({ cod: "ERROR_ADICIONAR_SEGUIDORES" }) });
                }).catch((e) => {
                    if (e.codeName === 'DuplicateKey') {
                        return res.status(400).send({ cod: "INFO_JA_ESTA_SEGUINDO" })
                    } else {
                        return res.status(400).send({ cod: "ERROR_SEGUIR" })
                    }
                });
            }
        }).catch((e) => { return res.status(404).send({ cod: 'ERROR_PROCURAR_USUARIO' }) });
    }).catch((e) => { return res.status(400).send({ cod: 'ERROR_PROCURAR_USUARIO' }) });
};

const unfollow = (req, res) => {
    let empresaId = req.empresa._id;
    let body = _.pick(req.body, ['id']);
    let id_seguindo = body.id;

    if (!ObjectID.isValid(id_seguindo)) {
        return res.status(404).send({ cod: "ERROR_ID_INVALIDO" });
    }

    Empresa.where({ _id: id_seguindo }).count().then((count) => {
        if (count > 0) {
            Following.unfollowUser(empresaId, id_seguindo, 'followingListEmpresa').then((following) => {
                Followers.removeFollower(id_seguindo, empresaId, 'followersListAgricultor').then((follower) => {
                    if (follower) {
                        return res.send({ cod: "SUCCESS_UNFOLLOW" });
                    }
                    return res.send({ cod: "INFO_USUARIO_NAO_ENCONTRADO" });
                }).catch((e) => { return res.status(400).send({ cod: "ERROR_UNFOLLOW" + e }) });
            }).catch((e) => {
                console.log(e)
                return res.status(400).send({ cod: "ERROR_UNFOLLOW" + e })
            });
        }
        Agricultor.where({ _id: id_seguindo }).count().then((count) => {
            if (count > 0) {
                Following.unfollowUser(empresaId, id_seguindo, 'followingListAgricultor').then((following) => {
                    Followers.removeFollower(id_seguindo, empresaId, 'followersListEmpresa').then((follower) => {
                        if (follower) {
                            return res.send({ cod: "SUCCESS_UNFOLLOW" });
                        }
                        return res.send({ cod: "INFO_USUARIO_NAO_ENCONTRADO" });
                    }).catch((e) => { return res.status(400).send({ cod: "ERROR_UNFOLLOW" + e }) });
                }).catch((e) => {
                    return res.status(400).send({ cod: "ERROR_UNFOLLOW" + e })
                });
            }
        }).catch((e) => { return res.status(404).send({ cod: 'ERROR_PROCURAR_USUARIO' }) });
    }).catch((e) => { return res.status(400).send({ cod: 'ERROR_PROCURAR_USUARIO' }) });
}


const getListFollowing = (req, res) => {
    let empresaId = req.empresa._id;

    Following.findById(empresaId)
        .populate('followingListAgricultor', 'nomeCompleto')
        .populate('followingListEmpresa', 'nomeCompleto')
        .exec().then((listSeguindo) => {
            return res.send(listSeguindo);
        }).catch((e) => res.status(400).send({ cod: 'ERROR_OBTER_LISTA_SEGUINDO' } + e));
};

const getListFollowers = (req, res) => {
    let empresaId = req.empresa._id;

    Followers.findById(empresaId)
        .populate('followersListAgricultor', 'nomeCompleto')
        .populate('followersListEmpresa', 'nomeCompleto')
        .exec().then((listSeguidores) => {
            return res.send(listSeguidores);
        }).catch((e) => res.status(400).send({ cod: 'ERROR_OBTER_LISTA_SEGUINDO' } + e));
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
