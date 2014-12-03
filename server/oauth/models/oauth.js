var crypto = require('crypto');
var mongoose = require('../db/mongoose');


//
// Schemas definitions
//
var OAuthAccessTokensSchema = new mongoose.Schema({
    accessToken: { type: String },
    clientId: { type: String },
    userId: { type: String },
    expires: { type: Date }
});

var OAuthRefreshTokensSchema = new mongoose.Schema({
    refreshToken: { type: String },
    clientId: { type: String },
    userId: { type: String },
    expires: { type: Date }
});

var OAuthClientsSchema = new mongoose.Schema({
    clientId: { type: String },
    clientSecret: { type: String },
    redirectUri: { type: String }
});

var OAuthUsersSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    hashedPassword: {
        type: String,
        required: true
    },
    salt: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    }
});

OAuthUsersSchema.methods.encryptPassword = function(password) {
    return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
};

OAuthUsersSchema.methods.checkPassword = function(password) {
    return this.encryptPassword(password) === this.hashedPassword;
};

OAuthUsersSchema.virtual('password')
    .set(function(password) {
        this._plainPassword = password;
        this.salt = Math.random() + '';
        this.hashedPassword = this.encryptPassword(password);
    })
    .get(function() {
        return this._plainPassword;
    });


mongoose.model('OAuthAccessTokens', OAuthAccessTokensSchema);
mongoose.model('OAuthRefreshTokens', OAuthRefreshTokensSchema);
mongoose.model('OAuthClients', OAuthClientsSchema);
mongoose.model('OAuthUsers', OAuthUsersSchema);

var OAuthAccessTokensModel = mongoose.model('OAuthAccessTokens'),
    OAuthRefreshTokensModel = mongoose.model('OAuthRefreshTokens'),
    OAuthClientsModel = mongoose.model('OAuthClients'),
    OAuthUsersModel = mongoose.model('OAuthUsers');

//
// oauth2-server callbacks
//
module.exports.getAccessToken = function (bearerToken, callback) {
    console.log('in getAccessToken (bearerToken: ' + bearerToken + ')');

    return OAuthAccessTokensModel.findOne({ accessToken: bearerToken }, callback).exec();
};

module.exports.getClient = function (clientId, clientSecret, callback) {
    console.log('in getClient (clientId: ' + clientId + ', clientSecret: ' + clientSecret + ')');

    if (clientSecret === null) {
        return OAuthClientsModel.findOne({ clientId: clientId }, callback).exec();
    }
    OAuthClientsModel.findOne({ clientId: clientId, clientSecret: clientSecret }, callback).exec();
};

// This will very much depend on your setup, I wouldn't advise doing anything exactly like this but
// it gives an example of how to use the method to resrict certain grant types
var authorizedClientIds = ['1'];
//var authorizedClientIds = ['s6BhdRkqt3', 'toto'];
module.exports.grantTypeAllowed = function (clientId, grantType, callback) {
    console.log('in grantTypeAllowed (clientId: ' + clientId + ', grantType: ' + grantType + ')');

    if (grantType === 'password') {
        return callback(false, authorizedClientIds.indexOf(clientId) >= 0);
    }

    if (grantType === 'external') {
        return callback(false, authorizedClientIds.indexOf(clientId) >= 0, grantType);
    }

    callback(false, true);
};

module.exports.saveAccessToken = function (token, clientId, expires, userId, callback) {
    console.log('in saveAccessToken (token: ' + token + ', clientId: ' + clientId + ', userId: ' + userId._id + ', expires: ' + expires + ')');

    var accessToken = new OAuthAccessTokensModel({
        accessToken: token,
        clientId: clientId,
        userId: userId,
        expires: expires
    });

    accessToken.save(callback);
};

/*
 * Required to support password grant type
 */
module.exports.getUser = function (username, password, callback) {
    console.log('in getUser (username: ' + username + ', password: ' + password + ')');

    OAuthUsersModel.findOne({username: username}, function(err, user) {
        if(err) return callback(err);

        if(!user) return callback(new AuthError("Пользователя не существует"));

        if (user.checkPassword(password)) {
            callback(null, user._id);
        } else {
            callback(new AuthError("Пароль неверен"));
        }
    });
};

/*
 * Required to support refreshToken grant type
 */
module.exports.saveRefreshToken = function (token, clientId, expires, userId, callback) {
    console.log('in saveRefreshToken (token: ' + token + ', clientId: ' + clientId +', userId: ' + userId + ', expires: ' + expires + ')');

    var refreshToken = new OAuthRefreshTokensModel({
        refreshToken: token,
        clientId: clientId,
        userId: userId,
        expires: expires
    });

    refreshToken.save(callback);
};

module.exports.getRefreshToken = function (refreshToken, callback) {
    console.log('in getRefreshToken (refreshToken: ' + refreshToken + ')');

    return OAuthRefreshTokensModel.findOne({refreshToken: refreshToken}, callback).exec();
};


//-----------------------

module.exports.createUser = function (username, password) {
    console.log('createUser (username: ' + username + ', password: ' + password + ')');

    return OAuthUsersModel.create({username: username, password: password});
};

/*
 * Required to support password grant type
 */
module.exports.extendedGrant = function (err, request, callback) {
    console.log('in extendedGrant (arg ', request.body.username, ')');

    return 'ok';
};