var mongoose = require('mongoose');

var localDbUrl = process.env.NODE_ENV === 'test'
  ? 'mongodb://localhost/super-crud-api-test'
  : 'mongodb://localhost/super-crud-api';
mongoose.connect(
  process.env.MONGOLAB_URI ||
  process.env.MONGOHQ_URL ||
  localDbUrl
);
var Book = require('./book');
var Wine = require('./wine');
var Pokemon = require('./pokemon');
var Todo = require('./todo');
var Watcher = require('./watcher');

module.exports.Book = Book;
module.exports.Wine = Wine;
module.exports.Pokemon = Pokemon;
module.exports.Todo = Todo;
module.exports.Watcher = Watcher;
