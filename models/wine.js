var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var WineSchema = new Schema({
  name: String,
  year: String,
  country: String,
  description: String,
  image: String,
  price: Number
});

var Wine = mongoose.model('Wine', WineSchema);

module.exports = Wine;
