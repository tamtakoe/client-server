var mongoose = require('mongoose');
var config = require('../config');

var db = new mongoose.Mongoose();

db.connect(config.mongoose.uri, config.mongoose.options);

module.exports = db;