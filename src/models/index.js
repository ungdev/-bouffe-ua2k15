var fs     = require('fs'),
    path   = require('path'),
    models = {};

fs
    .readdirSync(__dirname)
    .filter(function(fileName) {
        return (fileName.indexOf('.') !== 0) && (fileName !== 'index.js');
    })
    .forEach(function(fileName) {
        var modelName = fileName.split('.js')[0];
        models[modelName] = require(__dirname + '/' + fileName);
    });


module.exports = models;
