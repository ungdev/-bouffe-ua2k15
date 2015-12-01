var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var itemSchema = new Schema({
  name: String,
  normalPrice: Number,
  reducedPrice: Number
});

var Item = mongoose.model('Item', itemSchema);

module.exports = Item;
