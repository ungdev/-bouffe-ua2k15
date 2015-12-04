var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var purchaseSchema = new Schema({
    _item: { type: String, ref: 'Item' },
    price: Number,
    state: String,
    name : String,
    created_at: { type: Date }
});

var Purchase = mongoose.model('Purchase', purchaseSchema);

purchaseSchema.pre('save', function(next) {
  now = new Date();
  if (!this.created_at) {
    this.created_at = now;
  }
  next();
});

module.exports = Purchase;