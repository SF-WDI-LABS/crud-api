
// export public methods here
module.exports = {
  getSingularResponse: function(err, foundObject) {
    if (err) {
      this.status(500).json({ error: err.message });
    } else if (foundObject === null) {
      this.status(404).json({ error: 'Nothing found by this ID.' });
    } else {
      this.status(200).json(foundObject);
    }
  }
};
