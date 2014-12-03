var http = require('http');
var config = require('./config');
var mongoose = require('./db/mongoose');
var koa = require('koa');
var formidable = require('koa-formidable');
var cors = require('koa-cors');
var router = require('koa-router');
var request = require('koa-request');

var app = koa();

app.use(formidable());
app.use(cors());
app.use(router(app));

var User = require('./models/user');

app.post('/v1/users', function* (next) {
    var response = yield request.post({
        url: config.oauth.host + '/user',
        form: {username: this.request.body.username, password: this.request.body.password}
    });

    var userId =  JSON.parse(response.body).userId;

    try {
        this.response.body = yield User.create({_id: mongoose.Types.ObjectId(userId), username: this.request.body.username});

    } catch (e) {
        throw new Error(e);
    }

    this.status = 201;
});

app.get('/v1/users/current', function* (next) {
    var response = yield request.get({
        url: config.oauth.host + '/token?access_token=' + this.request.query.access_token
    });

    var userId =  JSON.parse(response.body).userId;

    try {
        this.response.body = yield User.findOne({_id: mongoose.Types.ObjectId(userId)}).exec();

    } catch (e) {
        throw new Error(e);
    }

    this.status = 200;
});

app.get('/v1/users', function* (next) {
    var response = yield request.get({
        url: config.oauth.host + '/token?access_token=' + this.request.query.access_token
    });

    if (response.body) {
        try {
            this.response.body = yield User.find().exec();

        } catch (e) {
            throw new Error(e);
        }
        this.status = 200;

    } else {
        this.status = 403;
    }
});

app.listen(config.port);
console.info('App server listening on port ' + config.port);