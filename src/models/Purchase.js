var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var purchaseSchema = new Schema({
    _item: { type: String, ref: 'Item' },
    price: Number,
    state: String
});

var Purchase = mongoose.model('Purchase', purchaseSchema);

module.exports = Purchase;
