var Promise  = require('bluebird');
var mongoose = Promise.promisifyAll(require('mongoose'));
var models   = require(__dirname + '/models');
var Item     = Promise.promisifyAll(models.Item);

var items = [
    {
        name: 'Coca Cola',
        type: 'drinks',
        normalPrice: 100,
        reducedPrice: 100
    },
    {
        name: 'Coca Cola Zero',
        type: 'drinks',
        normalPrice: 100,
        reducedPrice: 100
    },
    {
        name: 'Lipton Ice Tea Citron',
        type: 'drinks',
        normalPrice: 100,
        reducedPrice: 100
    },
    {
        name: 'Lipton Ice Tea Pêche',
        type: 'drinks',
        normalPrice: 100,
        reducedPrice: 100
    },
    {
        name: 'Schweppes Agrum',
        type: 'drinks',
        normalPrice: 100,
        reducedPrice: 100
    },
    {
        name: 'Oasis Tropical',
        type: 'drinks',
        normalPrice: 100,
        reducedPrice: 100
    },
    {
        name: 'Sprite',
        type: 'drinks',
        normalPrice: 100,
        reducedPrice: 100
    },
    {
        name: 'Monster Assault',
        type: 'drinks',
        normalPrice: 250,
        reducedPrice: 200
    },
    {
        name: 'Monster Absolute Zero',
        type: 'drinks',
        normalPrice: 250,
        reducedPrice: 200
    },
    {
        name: 'Monster Ripper',
        type: 'drinks',
        normalPrice: 250,
        reducedPrice: 200
    },
    {
        name: 'Café',
        type: 'drinks',
        normalPrice: 050,
        reducedPrice: 050
    },
    {
        name: 'Thé',
        type: 'drinks',
        normalPrice: 050,
        reducedPrice: 050
    },
    {
        name: 'Chocolat',
        type: 'drinks',
        normalPrice: 050,
        reducedPrice: 050
    },
    {
        name: 'Kinder Bueno',
        type: 'bars',
        normalPrice: 100,
        reducedPrice: 100
    },
    {
        name: 'Crêpe Jambon Fromage',
        type: 'crepes',
        normalPrice: 200,
        reducedPrice: 150
    },
    {
        name: 'Crêpe Jambon Fromage',
        type: 'crepes',
        normalPrice: 250,
        reducedPrice: 150
    },
    {
        name: 'Crêpe Chèvre-Miel',
        type: 'crepes',
        normalPrice: 250,
        reducedPrice: 150
    },
    {
        name: 'Crêpe sucre',
        type: 'crepes',
        normalPrice: 050,
        reducedPrice: 050
    },
    {
        name: 'Crêpe Nutella',
        type: 'crepes',
        normalPrice: 100,
        reducedPrice: 050
    },
    {
        name: 'Crêpe Confiture',
        type: 'crepes',
        normalPrice: 100,
        reducedPrice: 50
    },
    {
        name: 'Crêpe Caramel',
        type: 'crepes',
        normalPrice: 100,
        reducedPrice: 050
    },
    {
        name: 'Croque Monsieur Crème Jambon Fromage',
        type: 'croques',
        normalPrice: 150,
        reducedPrice: 050
    },
    {
        name: 'Croque Monsieur Tomate Jambon cru Fromage',
        type: 'croques',
        normalPrice: 200,
        reducedPrice: 100
    },
    {
        name: 'Croque Monsieur Chèvre-Miel',
        type: 'croques',
        normalPrice: 150,
        reducedPrice: 100
    },
    {
        name: 'Croque Monsieur Nutella',
        type: 'croques',
        normalPrice: 100,
        reducedPrice: 050
    },
    {
        name: 'Sandwich Jambon Fromage Beurre',
        type: 'sandwiches',
        normalPrice: 250,
        reducedPrice: 200
    },
    {
        name: 'Sandwich Jambon Salade Tomate Beurre',
        type: 'sandwiches',
        normalPrice: 250,
        reducedPrice: 200
    },
    {
        name: 'Sandwich Thon Mayo Salade Tomate',
        type: 'sandwiches',
        normalPrice: 250,
        reducedPrice: 200
    },
    {
        name: 'Sandwich Dinde Salade Tomate',
        type: 'sandwiches',
        normalPrice: 250,
        reducedPrice: 200
    },
    {
        name: 'Pizza Royale',
        type: 'pizzas',
        normalPrice: 400,
        reducedPrice: 350
    },
    {
        name: 'Pizza Bolo',
        type: 'pizzas',
        normalPrice: 400,
        reducedPrice: 350
    },
    {
        name: 'Pizza 4 fromages',
        type: 'pizzas',
        normalPrice: 400,
        reducedPrice: 350
    },
    {
        name: 'Pizza Chorizo',
        type: 'pizzas',
        normalPrice: 400,
        reducedPrice: 350
    },
    {
        name: 'Pizza + Canette + Barre',
        type: 'formules',
        normalPrice: 550,
        reducedPrice: 550
    },
    {
        name: 'Pizza + Canette + Crêpe sucrée',
        type: 'formules',
        normalPrice: 550,
        reducedPrice: 550
    },
    {
        name: 'Sandwich + Canette + Barre',
        type: 'formules',
        normalPrice: 400,
        reducedPrice: 400
    },
    {
        name: 'Sandwich + Canette + Crêpe sucrée',
        type: 'formules',
        normalPrice: 400,
        reducedPrice: 400
    },
    {
        name: '1 Croque Jambon cru + 2 Croques Jambon-Fromage',
        type: 'formules',
        normalPrice: 400,
        reducedPrice: 400
    },
    {
        name: '1 Croque Jambon cru + 2 Croque Chèvre-Miel',
        type: 'formules',
        normalPrice: 400,
        reducedPrice: 400
    },
    {
        name: '3 Croques Jambon-Fromage',
        type: 'formules',
        normalPrice: 350,
        reducedPrice: 350
    },
    {
        name: '3 Croques Chèvre-Miel',
        type: 'formules',
        normalPrice: 350,
        reducedPrice: 350
    },
    {
        name: '2 Croques Jambon-Fromage + 1 Croque Nutella',
        type: 'formules',
        normalPrice: 300,
        reducedPrice: 300
    },
    {
        name: '2 Croques Chèvre-Miel + 1 Croque Nutella',
        type: 'formules',
        normalPrice: 300,
        reducedPrice: 300
    },
    {
        name: 'Barre + Canette',
        type: 'formules',
        normalPrice: 150,
        reducedPrice: 150
    },
    {
        name: 'Crêpe sucrée + Café (jusqu\'à 10h30)',
        type: 'formules',
        normalPrice: 100,
        reducedPrice: 100
    },
    {
        name: 'Crêpe sucrée + Thé (jusqu\'à 10h30)',
        type: 'formules',
        normalPrice: 100,
        reducedPrice: 100
    },
    {
        name: 'Crêpe sucrée + Chocolat (jusqu\'à 10h30)',
        type: 'formules',
        normalPrice: 100,
        reducedPrice: 100
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