var Promise  = require('bluebird');
var mongoose = Promise.promisifyAll(require('mongoose'));
var models   = require(__dirname + '/models');
var Item     = Promise.promisifyAll(models.Item);

var items = [
    {
        name: 'Coca Cola',
        type: 'drinks',
        normalPrice: 100,
        reducedPrice: 100,
        sendToCook: false
    },
    {
        name: 'Coca Cola Zero',
        type: 'drinks',
        normalPrice: 100,
        reducedPrice: 100,
        sendToCook: false
    },
    {
        name: 'Lipton Ice Tea Citron',
        type: 'drinks',
        normalPrice: 100,
        reducedPrice: 100,
        sendToCook: false
    },
    {
        name: 'Lipton Ice Tea Pêche',
        type: 'drinks',
        normalPrice: 100,
        reducedPrice: 100,
        sendToCook: false
    },
    {
        name: 'Schweppes Agrum',
        type: 'drinks',
        normalPrice: 100,
        reducedPrice: 100,
        sendToCook: false
    },
    {
        name: 'Oasis Tropical',
        type: 'drinks',
        normalPrice: 100,
        reducedPrice: 100,
        sendToCook: false
    },
    {
        name: 'Sprite',
        type: 'drinks',
        normalPrice: 100,
        reducedPrice: 100,
        sendToCook: false
    },
    {
        name: 'Monster Assault',
        type: 'drinks',
        normalPrice: 250,
        reducedPrice: 200,
        sendToCook: false
    },
    {
        name: 'Monster Absolute Zero',
        type: 'drinks',
        normalPrice: 250,
        reducedPrice: 200,
        sendToCook: false
    },
    {
        name: 'Monster Ripper',
        type: 'drinks',
        normalPrice: 250,
        reducedPrice: 200,
        sendToCook: false
    },
    {
        name: 'Café',
        type: 'drinks',
        normalPrice: 50,
        reducedPrice: 50,
        sendToCook: true
    },
    {
        name: 'Thé',
        type: 'drinks',
        normalPrice: 50,
        reducedPrice: 50,
        sendToCook: true
    },
    {
        name: 'Chocolat',
        type: 'drinks',
        normalPrice: 50,
        reducedPrice: 50,
        sendToCook: true
    },
    {
        name: 'Kinder Bueno',
        type: 'bars',
        normalPrice: 100,
        reducedPrice: 100,
        sendToCook: false
    },
    {
        name: 'Kit Kat',
        type: 'bars',
        normalPrice: 100,
        reducedPrice: 100,
        sendToCook: false
    },
    {
        name: 'Snickers',
        type: 'bars',
        normalPrice: 100,
        reducedPrice: 100,
        sendToCook: false
    },
    {
        name: 'Twix',
        type: 'bars',
        normalPrice: 100,
        reducedPrice: 100,
        sendToCook: false
    },
    {
        name: 'Lion',
        type: 'bars',
        normalPrice: 100,
        reducedPrice: 100,
        sendToCook: false
    },
    {
        name: 'Crêpe Jambon Fromage',
        type: 'crepes',
        normalPrice: 200,
        reducedPrice: 150,
        sendToCook: true
    },
    {
        name: 'Crêpe Jambon Fromage',
        type: 'crepes',
        normalPrice: 250,
        reducedPrice: 150,
        sendToCook: true
    },
    {
        name: 'Crêpe Chèvre-Miel',
        type: 'crepes',
        normalPrice: 250,
        reducedPrice: 150,
        sendToCook: true
    },
    {
        name: 'Crêpe sucre',
        type: 'crepes',
        normalPrice: 50,
        reducedPrice: 50,
        sendToCook: true
    },
    {
        name: 'Crêpe Nutella',
        type: 'crepes',
        normalPrice: 100,
        reducedPrice: 50,
        sendToCook: true
    },
    {
        name: 'Crêpe Confiture',
        type: 'crepes',
        normalPrice: 100,
        reducedPrice: 50,
        sendToCook: true
    },
    {
        name: 'Crêpe Caramel',
        type: 'crepes',
        normalPrice: 100,
        reducedPrice: 50,
        sendToCook: true
    },
    {
        name: 'Croque Monsieur Crème Jambon Fromage',
        type: 'croques',
        normalPrice: 150,
        reducedPrice: 50,
        sendToCook: true
    },
    {
        name: 'Croque Monsieur Jambon cru Chèvre-Miel',
        type: 'croques',
        normalPrice: 200,
        reducedPrice: 100,
        sendToCook: true
    },
    {
        name: 'Croque Monsieur Chèvre-Miel',
        type: 'croques',
        normalPrice: 150,
        reducedPrice: 100,
        sendToCook: true
    },
    {
        name: 'Croque Monsieur Nutella',
        type: 'croques',
        normalPrice: 100,
        reducedPrice: 50,
        sendToCook: true
    },
    {
        name: 'Sandwich Jambon Fromage Beurre',
        type: 'sandwiches',
        normalPrice: 250,
        reducedPrice: 200,
        sendToCook: true
    },
    {
        name: 'Sandwich Jambon Salade Tomate Beurre',
        type: 'sandwiches',
        normalPrice: 250,
        reducedPrice: 200,
        sendToCook: true
    },
    {
        name: 'Sandwich Thon Mayo Salade Tomate',
        type: 'sandwiches',
        normalPrice: 250,
        reducedPrice: 200,
        sendToCook: true
    },
    {
        name: 'Sandwich Dinde Salade Tomate',
        type: 'sandwiches',
        normalPrice: 250,
        reducedPrice: 200,
        sendToCook: true
    },
    {
        name: 'Pizza Royale',
        type: 'pizzas',
        normalPrice: 400,
        reducedPrice: 350,
        sendToCook: true
    },
    {
        name: 'Pizza Bolo',
        type: 'pizzas',
        normalPrice: 400,
        reducedPrice: 350,
        sendToCook: true
    },
    {
        name: 'Pizza 4 fromages',
        type: 'pizzas',
        normalPrice: 400,
        reducedPrice: 350,
        sendToCook: true
    },
    {
        name: 'Pizza Chorizo',
        type: 'pizzas',
        normalPrice: 400,
        reducedPrice: 350,
        sendToCook: true
    },
    {
        name: 'Pizza + Canette + Barre',
        type: 'formules',
        normalPrice: 550,
        reducedPrice: 550,
        sendToCook: true
    },
    {
        name: 'Pizza + Canette + Crêpe sucrée',
        type: 'formules',
        normalPrice: 550,
        reducedPrice: 550,
        sendToCook: true
    },
    {
        name: 'Sandwich + Canette + Barre',
        type: 'formules',
        normalPrice: 400,
        reducedPrice: 400,
        sendToCook: true
    },
    {
        name: 'Sandwich + Canette + Crêpe sucrée',
        type: 'formules',
        normalPrice: 400,
        reducedPrice: 400,
        sendToCook: true
    },
    {
        name: '1 Croque Jambon cru + 2 Croques Jambon-Fromage',
        type: 'formules',
        normalPrice: 400,
        reducedPrice: 400,
        sendToCook: true
    },
    {
        name: '1 Croque Jambon cru + 2 Croque Chèvre-Miel',
        type: 'formules',
        normalPrice: 400,
        reducedPrice: 400,
        sendToCook: true
    },
    {
        name: '3 Croques Jambon-Fromage',
        type: 'formules',
        normalPrice: 350,
        reducedPrice: 350,
        sendToCook: true
    },
    {
        name: '3 Croques Chèvre-Miel',
        type: 'formules',
        normalPrice: 350,
        reducedPrice: 350,
        sendToCook: true
    },
    {
        name: '2 Croques Jambon-Fromage + 1 Croque Nutella',
        type: 'formules',
        normalPrice: 300,
        reducedPrice: 300,
        sendToCook: true
    },
    {
        name: '2 Croques Chèvre-Miel + 1 Croque Nutella',
        type: 'formules',
        normalPrice: 300,
        reducedPrice: 300,
        sendToCook: true
    },
    {
        name: 'Barre + Canette',
        type: 'formules',
        normalPrice: 150,
        reducedPrice: 150,
        sendToCook: false
    },
    {
        name: 'Crêpe sucrée + Boisson Chaude (jusqu\'à 10h30)',
        type: 'formules',
        normalPrice: 100,
        reducedPrice: 100,
        sendToCook: true
    },
    {
        name: 'T-shirt joueur',
        type: 'goodies',
        normalPrice: 1000,
        reducedPrice: 1000,
        sendToCook: false
    },
    {
        name: 'T-shirt staff',
        type: 'goodies',
        normalPrice: 500,
        reducedPrice: 500,
        sendToCook: false
    },
    {
        name: 'Câble ethernet',
        type: 'goodies',
        normalPrice: 500,
        reducedPrice: 500,
        sendToCook: false
    },
    {
        name: 'Multiprise',
        type: 'goodies',
        normalPrice: 500,
        reducedPrice: 500,
        sendToCook: false
    }
    
];


function seed() {
    return Item
        .createAsync(items)
        .then(function() {
            console.log('[OK} Database seeded');
        })
        .catch(function(err) {
            throw new Error(err);
        });
}

module.exports = seed;