var db = require('../models');
var Wine = db.Wine;
var util = require('./utils');
var seedWines = require('../seeds/wines')



module.exports = {
  index: function index(req,res) {
    Wine.find(function (err, allWines) {
      err ? res.status(500).json({ error: err.message }) :
        res.json({ wines: allWines });
    });
  },

  create: function (req,res) {
      var newWine = req.body;
      Wine.create(newWine, function (err, savedWine) {
        err ? res.status(500).json({ error: err.message }) :
          res.status(201).json(savedWine);
      });
  },

  nuke: function (req, res) {
    Wine.remove({}, function (err, removedWines) {
      err ? res.status(500).json({ error: err.message }) :
        Wine.create(seedWines, function (err, createdWines) {
          err ? res.status(500).json({ error: err.message }) :
            res.redirect('/wines');
        });
      });
  },

  show: function (req,res) {
      var wineId = req.params.wineId;
      Wine.findOne({ _id: wineId }, util.getSingularResponse.bind(res));
  },

  destroy: function (req, res){
    var wineId = req.params.wineId;
    Wine.findOneAndRemove({ _id: wineId }, util.getSingularResponse.bind(res));
  } ,

  update: function (req,res) {
    var wineId = req.params.wineId;
    var updateWine = req.body;
    Wine.findOneAndUpdate({ _id: wineId }, req.body, { new: true }, util.getSingularResponse.bind(res));
  }
};
