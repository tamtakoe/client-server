var http = require('http');
var config = require('./config');
var mongoose = require('./db/mongoose');
var koa = require('koa');
var cors = require('koa-cors');
var formidable = require('koa-formidable');
var router = require('koa-router');
var oauthserver = require('koa-oauth-server');

var app = koa();

app.use(cors());
app.use(formidable());
app.use(router(app));

app.oauth = oauthserver({
    model: require('./models/oauth'),
    grants: ['password', 'http://external'],
    debug: true,
    clientIdRegex: /^[\S ]*$/i
});

app.post('/token', app.oauth.grant());

app.get('/token', function* (next) {
    this.response.body = yield app.oauth.server.model.getAccessToken(this.request.query.access_token);
});

app.post('/user', function* (next) {
    try {
        var user = yield app.oauth.server.model.createUser(this.request.body.username, this.request.body.password);
        this.response.body = {userId: user._id};
    } catch (e)  {
        throw new Error(e);
    }
});

app.listen(config.port);
console.info('OAuth server listening on port ' + config.port);