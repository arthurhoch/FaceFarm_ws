const validator = require('validator');
const mongoose = require('mongoose');
const _ = require('lodash');

const FollowingSchema = new mongoose.Schema({
    id_usuario: mongoose.Schema.ObjectId,
    followingListAgricultor: [{
        type: mongoose.Schema.ObjectId,
        ref: 'Agricultor'
    }],
    followingListEmpresa: [{
        type: mongoose.Schema.ObjectId,
        ref: 'Empresa'
    }]
});

FollowingSchema.statics.followUser = function(id_user, id_following, userType) {
    var Following = this;

    let query = {
        _id: id_user,
        [userType]: { $ne: id_following }
    };

    let update = { '$push' : { [userType]: id_following } };
    
    var options = { upsert: true, new: true };
    return Following.findOneAndUpdate(query, update, options);
};

FollowingSchema.statics.unfollowUser = function(id_user, id_following, userType) {
    var Following = this;

    let query = {
        _id: id_user,
        [userType]: id_following
    };
    let update = { '$pull' : { [userType]: id_following } };
    
    var options = { new: true };
    return Following.findOneAndUpdate(query, update, options);
};

const Following = mongoose.model(('Following'), FollowingSchema);

module.exports = { Following }