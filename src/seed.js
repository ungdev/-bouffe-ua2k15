var Promise  = require('bluebird');
var mongoose = Promise.promisifyAll(require('mongoose'));
var models   = require(__dirname + '/models');
var Item     = Promise.promisifyAll(models.Item);


var items = [
    {
        name: 'Pizza',
        normalPrice: 400,
        reducedPrice: 300
    },
    {
        name: 'CroqX3',
        normalPrice: 300,
        reducedPrice: 200
    }
];


function seed() {
    return Item
        .createAsync(items)
        .then(function() {
            console.log('Database seeded');
        })
        .catch(function(err) {
            throw new Error(err);
        });
}


module.exports = seed;
