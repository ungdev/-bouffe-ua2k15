var express    = require('express');
var Promise    = require('bluebird');
var app        = express();
var server     = Promise.promisifyAll(require('http').Server(app));
var io         = require('socket.io')(server);
var bodyParser = require('body-parser');
var mongoose   = Promise.promisifyAll(require('mongoose'));
var config     = require(__dirname + '/../config');
var models     = require(__dirname + '/models');


/**
 * Express setup
 */
app.use(bodyParser.json());
app.use('/', express.static(__dirname + '/public'));
app.use('/bower_components', express.static(__dirname + '/../bower_components'));

/**
 * socket.io setup
 */
var cookers = io.of('/cookers');
var sellers = io.of('/sellers');

cookers.on('connection', function() {
    console.log('[DEBUG] Cooker connected');
});

sellers.on('connection', function() {
    console.log('[DEBUG] Seller connected');
});


/**
 * Entry point
 */
mongoose
    .connectAsync('mongodb://localhost/myappdatabase')
    .then(function() {
        console.log('[OK] Connected to mongodb');
        return server.listenAsync(config.express.port);
    })
    .then(function() {
        console.log('[OK] Server listening on 0.0.0.0:' + config.express.port);
    })
    .catch(function(err) {
        console.log(err);
        throw new Error(err);
    });
