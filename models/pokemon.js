var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PokemonSchema = new Schema({
  name: String,
  pokedex: String,
  evolves_from: String,
  image: String
});

var Pokemon = mongoose.model('Pokemon', PokemonSchema);

module.exports = Pokemon;
