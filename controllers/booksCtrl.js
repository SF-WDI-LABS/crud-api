var db = require('../models');
var Book = db.Book;
var Watcher = db.Watcher;
var util = require('./utils');
var seedBooks = require('../seeds/books');

module.exports = {
  index: function index(req,res) {
    Book.find(function (err, allBooks) {
      err ? res.status(500).json({ error: err.message }) :
        (Watcher.tally('INDEX','Book'),
        res.json({ books: allBooks }));
    });
  },

  create: function (req,res) {
      var newBook = req.body;
      Book.create(newBook, function (err, savedBook) {
        err ? res.status(500).json({ error: err.message }) :
          (Watcher.tally('CREATE','Book'),
          res.status(201).json(savedBook));
      });
  },

  nuke: function (req, res) {
    Book.remove({}, function (err, removedBooks) {
      err ? res.status(500).json({ error: err.message }) :
        Book.create(seedBooks, function (err, createdBooks) {
          err ? res.status(500).json({ error: err.message }) :
            res.redirect('/books');
        });
      });
  },

  show: function (req,res) {
    var bookId = req.params.bookId;
    Watcher.tally('SHOW','Book');
    Book.findOne({ _id: bookId }, util.getSingularResponse.bind(res));
  },

  destroy: function (req, res){
    var bookId = req.params.bookId;
    Watcher.tally('DESTROY','Book');
    Book.findOneAndRemove({ _id: bookId }, util.getSingularResponse.bind(res));
  } ,

  update: function (req,res) {
    var bookId = req.params.bookId;
    var updateBook = req.body;
    Watcher.tally('UPDATE','Book');
    Book.findOneAndUpdate({ _id: bookId }, req.body, { new: true }, util.getSingularResponse.bind(res));
  }

};
