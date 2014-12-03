var mongoose = require('mongoose');
var expressSession = require('express-session');
var MongoStore = require('connect-mongo')(expressSession);

var sessionStore = new MongoStore({mongoose_connection: mongoose.connection});

module.exports = sessionStore;