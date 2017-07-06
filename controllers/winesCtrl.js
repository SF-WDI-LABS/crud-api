var db = require('../models');
var Wine = db.Wine;
var util = require('./utils');
var seedWines = require('../seeds/wines');

module.exports = {
  index: function index(req, res) {
    Wine.find(function(err, allWines) {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.json({ wines: allWines });
      }
    });
  },

  create: function(req, res) {
    var newWine = req.body;
    newWine.create(newWine, function(err, savedWine) {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.status(201).json(savedWine);
      }
    });
  },

  nuke: function(req, res) {
    Wine.remove({}, function(err, removedWines) {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        Wine.create(seedWines, function(err, createdWines) {
          if (err) {
            res.status(500).json({ error: err.message });
          } else {
            res.redirect('/wines');
          }
        });
      }
    });
  },

  show: function(req, res) {
    var wineId = req.params.wineId;
    Wine.findOne({ _id: wineId }, util.getSingularResponse.bind(res));
  },

  destroy: function(req, res) {
    var wineId = req.params.wineId;
    Wine.findOneAndRemove({ _id: wineId }, util.getSingularResponse.bind(res));
  },

  update: function(req, res) {
    var wineId = req.params.wineId;
    var updateWine = req.body;
    Wine.findOneAndUpdate({ _id: wineId }, updateWine, { new: true }, util.getSingularResponse.bind(res));
  }
};
