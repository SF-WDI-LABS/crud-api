var db = require('../models');
var Todo = db.Todo;
var util = require('./utils');
var seedTodos = require('../seeds/todos');

module.exports = {
  index: (req, res) => {
    Todo.find(function(err, allTodos) {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.json({ todos: allTodos });
      }
    });
  },

  create: (req, res) => {
    var newTodo = req.body;
    Todo.create(newTodo, function(err, savedTodo) {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.status(201).json(savedTodo);
      }
    });
  },

  show: (req, res) => {
    var todoId = req.params.todoId;
    Todo.findOne({ _id: todoId }, util.getSingularResponse.bind(res));
  },

  nuke: (req, res) => {
    Todo.remove({}, function(err, removedTodos) {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        Todo.create(seedTodos, function(err, createdTodos) {
          if (err) {
            res.status(500).json({ error: err.message });
          } else {
            res.redirect('/todos');
          }
        });
      }
    });
  },

  destroy: (req, res) => {
    var todoId = req.params.todoId;
    Todo.findOneAndRemove({ _id: todoId }, util.getSingularResponse.bind(res));
  },

  update: (req, res) => {
    var todoId = req.params.todoId;
    var updateTodo = req.body;
    Todo.findOneAndUpdate({ _id: todoId }, updateTodo, {new: true}, util.getSingularResponse.bind(res));
  }
};
