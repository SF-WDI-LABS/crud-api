var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var WatcherSchema = new Schema({
  crudAction: { type: String, enum: ['INDEX', 'SHOW', 'CREATE', 'UPDATE', 'DESTROY'] },
  modelType: { type: String, enum: ['Wine', 'Book', 'Pokemon', 'Todo'] },
  timeStamp: { type: Date, default: Date.Now }
});

// Watcher model will find the method/action combo and increment
WatcherSchema.statics.tally = function(action, modelType) {
  this.create({
    crudAction: action,
    modelType: modelType
  }, function(err, foundAction) {
    if (err) { return console.log(err); }
    return foundAction;
  });
};

var Watcher = mongoose.model('Watcher', WatcherSchema);
module.exports = Watcher;
