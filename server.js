// require express and other modules
var express = require('express');
var app = express();
var cors = require('cors');
var bodyParser = require('body-parser');
var path = require('path');

// configure cors (for allowing cross-origin requests)
app.use(cors());

// configure bodyParser (for receiving form data)
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// serve static files from public folder
app.use(express.static(path.join(__dirname, 'public')));

// set view engine to ejs
app.set('view engine', 'ejs');

var ctrl = require('./controllers');

// API ROUTES

/*
 * BOOK API ENDPOINTS
 */

// get all books
app.route('/books').get(ctrl.books.index)
  .post(ctrl.books.create);

app.get('/books/nuke', ctrl.books.nuke);

app.route('/books/:bookId')
  .get(ctrl.books.show)
  .put(ctrl.books.update)
  .delete(ctrl.books.destroy);

app.route('/pokemon')
  .get(ctrl.pokemon.index)
  .post(ctrl.pokemon.create);

app.get('/pokemon/nuke', ctrl.pokemon.nuke);

app.route('/pokemon/:pokemonId')
  .get(ctrl.pokemon.show)
  .put(ctrl.pokemon.update)
  .delete(ctrl.pokemon.destroy);

app.route('/wines')
  .get(ctrl.wines.index)
  .post(ctrl.wines.create);

app.get('/wines/nuke', ctrl.wines.nuke);

app.route('/wines/:wineId')
  .get(ctrl.wines.show)
  .put(ctrl.wines.update)
  .delete(ctrl.wines.destroy);

app.route('/todos')
  .get(ctrl.todos.index)
  .post(ctrl.todos.create);

app.get('/todos/nuke', ctrl.todos.nuke);

app.route('/todos/:todoId')
  .get(ctrl.todos.show)
  .put(ctrl.todos.update)
  .delete(ctrl.todos.destroy);

// HOME & RESET ROUTES

app.get('/', function(req, res) {
  res.render('site/index');
});

app.get('/reset', function(req, res) {
  res.render('site/reset');
});

module.exports = app;

// listen on port (production or localhost)
// only if this was the main file run (vs required elsewhere)
if (module.parent === null) {
  app.listen(process.env.PORT || 3000, function() {
    console.log('server started');
  });
}
