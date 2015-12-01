var express    = require('express');
var Promise    = require('bluebird');
var app        = express();
var server     = Promise.promisifyAll(require('http').Server(app));
var io         = require('socket.io')(server);
var bodyParser = require('body-parser');
var mongoose   = Promise.promisifyAll(require('mongoose'));
var config     = require(__dirname + '/../config');
var models     = require(__dirname + '/models');
var Item       = Promise.promisifyAll(models.Item);
var Purchase   = Promise.promisify(models.Purchase);
var seed       = require(__dirname + '/seed');

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

cookers.on('connection', function(socket) {
    console.log('[DEBUG] Cooker connected');

    // TODO: send pending purchases
    socket.on('commandDone', function(command) {
        console.log('[DEBUG] Command done: ');
        console.log(command);
    })
});

sellers.on('connection', function(socket) {
    console.log('[DEBUG] Seller connected');
    // TODO: send item list

    socket.on('newCommand', function(command) {
        console.log('[DEBUG] Command received');
        console.log(command);

        command.itemList.forEach(function(item) {
            console.log(item);
        });

        cookers.emit('newCommand', command);
    });
});


/**
 * Entry point
 */
mongoose
    .connectAsync('mongodb://localhost/myappdatabase')
    .then(function() {
        console.log('[OK] Connected to mongodb');

        return Item.findAsync();
    })
    .then(function(items) {
        // Seed if empty database
        if (items.length === 0) {
            return seed();
        }
    })
    .then(function() {
        return server.listenAsync(config.express.port);
    })
    .then(function() {
        console.log('[OK] Server listening on 0.0.0.0:' + config.express.port);
    })
    .catch(function(err) {
        console.log(err);
        throw new Error(err);
    });
