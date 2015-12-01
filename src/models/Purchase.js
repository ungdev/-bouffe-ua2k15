var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var purchaseSchema = new Schema({
    _item: { type: Number, ref: 'Item' },
    state: String
});

var Purchase = mongoose.model('Purchase', purchaseSchema);

module.exports = Purchase;
