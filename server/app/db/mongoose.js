var mongoose = require('mongoose');
var config = require('../config');

var db = new mongoose.Mongoose();

db.connect(config.mongoose.uri, config.mongoose.options);

module.exports = db;


// framework code
function co(gen) {
    var generator = gen();

    function next(err, result) {
        if (err) generator.throw(err);
        var res = generator.next(result);
        if (res.done) return;
        //res.value - значение в очередном yield. Co определяет его тип "collback", "promise" и проч.
        res.value(next);
    }

    next();
}

// library code
function delay(time) {
    return function(callback){
        setTimeout(function() {
            var err = null;
            var result = 'delayed ' + time + ' ms';
            callback(err, result);
        }, time);
    }
}

// application code
co(function* (){
    var result1 = yield delay(1000);
    console.log(result1);

    var result2 = yield delay(2000);
    console.log(result2);
});


// framework code
function sync(gen) {
    var generator = gen(next);

    function next(err, result) {
        if (err) generator.throw(err);
        generator.next(result);
    }

    generator.next();
}

// library code
function delay(time, callback) {
    setTimeout(function() {
        var err = null;
        var result = 'delayed ' + time + ' ms';
        callback(err, result);
    }, time);
}

// application code
sync(function* (next) {
    console.log('foo');

    var result1 = yield delay(1000, next);
    console.log(result1);

    var result2 = yield delay(2000, next);
    console.log(result2);
});

console.log('bar'); // not part of our generator function’s body

function delay(time) {
    return function(callback){
        setTimeout(callback, time);
    }
}

function* gen() {
    console.log('start');
    var result = yield delay(1000);
    console.log('<-', result);
}

var generator = gen();

console.log('->', generator.next());

setTimeout(function() {
    generator.next('passed');
}, 1000);