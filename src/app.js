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
var Purchase   = Promise.promisifyAll(models.Purchase);
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

    // Send pending and in progress purchases
    Purchase
        .find()
        .where('state').in(['pending', 'inProgress', 'ready'])
        .execAsync()
        .then(function(purchases) {
            if (purchases.length !== 0) {
                console.log('[DEBUG] Send purchase list');

                socket.emit('purchaseList', purchases);
            }
        })
        .catch(function(err) {
            console.log(new Error(err));
        });

    socket.on('updatePurchase', function(data) {
        console.log('[DEBUG] New purchase state: ' + data.state);
        // console.log(data.purchase);

        Purchase
            .findByIdAndUpdateAsync(data.purchase._id, { state: 'inProgress' })
            .then(function(purchase) {
                console.log('[DEBUG] Purchase updated');
                console.log(purchase);
                sellers.emit('updatedPurchase', purchase);
            })
            .catch(function(err) {
                console.log(new Error(err));
            })
    });
});

sellers.on('connection', function(socket) {
    console.log('[DEBUG] Seller connected');

    // Send item list
    Item
        .findAsync()
        .then(function(items) {
            console.log('[DEBUG] Send item list');

            sellers.emit('itemList', items);
        });

    Purchase
        .find()
        .where('state').in(['pending', 'inProgress', 'ready'])
        .execAsync()
        .then(function(purchases) {
            if (purchases.length !== 0) {
                console.log('[DEBUG] Send purchase list');
                socket.emit('purchaseList', purchases);
            }
        })
        .catch(function(err) {
            console.log(new Error(err));
        });

    socket.on('newCommand', function(command) {
        console.log('[DEBUG] Command received');
        console.log(command);

        var purchases = [];
        command.forEach(function(item) {
            purchases.push({
                _item: item._id,
                price: item.price,
                name : item.name,
                state: 'pending'
            });
        });

        // Create new purchases
        Purchase
            .createAsync(purchases)
            .then(function(purchases) {
                console.log('[DEBUG] Purchases created');
                console.log(purchases);

                // Send command to cookers
                cookers.emit('newCommand', purchases);
            })
            .catch(function(err) {
                console.log(new Error(err));
            });
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
        return server.listenAsync(config.express.port, config.express.host);
    })
    .then(function() {
        console.log('[OK] Server listening on 0.0.0.0:' + config.express.port);
    })
    .catch(function(err) {
        throw new Error(err);
    });
