var expect = require('chai').expect;
var request = require('supertest');
var app = require('../server');

var testHelpers = require('./testHelpers');
var context = testHelpers.context;

var db = require('../models');

describe('Books Controller', function() {
  describe('#index', function() {
    describe(context('success'), function(done) {
      it('responds with status code 200', function(done) {
        request(app)
        .get('/books')
        .expect(function(res) {
          expect(res.status).to.equal(200);
        })
        .end(done);
      });
      it('responds with JSON', function(done) {
        request(app)
        .get('/books')
        .expect(function(res) {
          expect(res.type).to.equal('application/json');
        })
        .end(done);
      });
      it('responds with an object that includes an array under the key "books"', function(done) {
        request(app)
        .get('/books')
        .expect(function(res) {
          expect(res.body).to.have.own.property('books');
          expect(res.body.books).to.be.an('array');
        })
        .end(done);
      });
      it('updates the Watcher tally for book INDEX requests', function(done) {
        db.Watcher.count({crudAction: 'INDEX', modelType: 'Book'}, function(err, startCount) {
          request(app)
          .get('/books')
          .expect(function(res) {
            db.Watcher.count({crudAction: 'INDEX', modelType: 'Book'}, function(err, count) {
              expect(count).to.equal(startCount + 1);
            });
          })
          .end(done);
        });
      });
      it('finds all books from the database');
    });
    describe(context('error'), function() {
      it('responds with status code 500');
      it('responds with an object that has key "error" with the error message as the value');
    });
  });
  describe('#create', function() {
    describe(context('success'), function() {
      it('responds with status code 201', function(done) {
        request(app)
        .post('/books')
        .send({ title: 'yeah' })
        .expect(function(res) {
          expect(res.status).to.equal(201);
        })
        .end(done);
      });
      it('responds with JSON', function(done) {
        request(app)
        .post('/books')
        .send({ title: 'yeah'})
        .expect(function(res) {
          expect(res.type).to.equal('application/json');
        })
        .end(done);
      });
      it('creates a book in the database', function(done) {
        db.Book.count(function(err, startCount) {
          request(app)
          .post('/books')
          .send({ title: 'yeah'})
          .expect(function(res) {
            db.Book.count(function(err, count) {
              expect(count).to.equal(startCount + 1);
            });
          })
          .end(done);
        });
      });
      it('responds with an object that matches a saved book', function(done) {
        request(app)
        .post('/books')
        .send({
          title: 'yeah',
          author: 'okay',
          image: 'kittens.png',
          releaseDate: '2015'
        })
        .expect(function(res) {
          expect(res.body).to.have.all.keys('title', 'author', 'image', 'releaseDate', '_id', '__v');
          expect(res.body.title).to.be.a('string');
          expect(res.body.title).to.equal('yeah');
          expect(res.body.author).to.be.a('string');
          expect(res.body.author).to.equal('okay');
          expect(res.body.image).to.be.a('string');
          expect(res.body.image).to.equal('kittens.png');
          expect(res.body.releaseDate).to.be.a('string');
          expect(res.body.releaseDate).to.equal('2015');
          expect(res.body.__v).to.equal(0);
        })
        .end(done);
      });
      it('updates the Watcher tally for book CREATE requests', function(done) {
        db.Watcher.count({crudAction: 'CREATE', modelType: 'Book'}, function(err, startCount) {
          request(app)
          .post('/books')
          .send({
            title: 'yeah'
          })
          .expect(function(res) {
            db.Watcher.count({crudAction: 'CREATE', modelType: 'Book'}, function(err, count) {
              expect(count).to.equal(startCount + 1);
            });
          })
          .end(done);
        });
      });
    });
    describe(context('error'), function() {
      it('responds with status code 500');
      it('responds with an object that has a string value for the key "error"');
      // it('responds with status code 500', function(done){
      //   request(app)
      //   .post('/books')
      //  .send({})  // assumes some validation for a field not missing
      //   .expect(function(res) {
      //     expect(res.status).to.equal(500);
      //   })
      //   .end(done);
      // });
      // it('responds with an object that has a string value for the key "error"', function(done){
      //   request(app)
      //   .post('/books')
      //  .send({})  // assumes some validation for a field not missing
      //   .expect(function(res){
      //     expect(res.body).to.have.own.property('error');
      //     expect(res.body.error).to.be.a('string');
      //   })
      //   .end(done);
      // });
      it('responds with an object that has key "error" with the error message as the value');
    });
  });
  describe('#nuke', function() {
    describe(context('book remove error'), function() {
      it('responds with status code 500');
      it('responds with an object that has key "error" with the error message as the value');
    });
    describe(context('book create error'), function() {
      it('responds with status code 500');
      it('responds with an object that has key "error" with the error message as the value');
    });
    describe(context('success'), function() {
      it('removes all books from the database');
      // @TODO update nuke to accept seed data as a parameter, for easier testing
      it('creates new books in the database based on data from seed file ');
      it('redirects to "/books"');
    });
  });
  describe('#show', function() {
    it('looks up a book based on parameter from the request path');
    // @TODO - actually primarily testing controllers/utils.js with these first 3 contexts
    describe(context('book find error'), function() {
      it('responds with status code 500', function(done) {
        request(app)
        .get('/books/not-an-object-id')
        .expect(function(res) {
          expect(res.status).to.equal(500);
        })
        .end(done);
      });
      it('responds with an object that has key "error" with the error message as the value', function(done) {
        request(app)
        .get('/books/not-an-object-id')
        .expect(function(res) {
          expect(res.type).to.equal('application/json');
          expect(res.body).to.have.own.property('error');
          expect(res.body.error).to.be.a('string');
        })
        .end(done);
      });
    });
    describe(context('found book is null'), function() {
      it('responds with status code 404', function(done) {
        var fakeId = '593cb53d0b376629bb4d7738';
        request(app)
        .get('/books/' + fakeId)
        .expect(function(res) {
          expect(res.status).to.equal(404);
        })
        .end(done);
      });
      it('responds with a JSON object that has key "error" with the error message "Nothing found by this ID." as the value', function(done) {
        var fakeId = '593cb53d0b376629bb4d7738';
        request(app)
        .get('/books/' + fakeId)
        .expect(function(res) {
          expect(res.type).to.equal('application/json');
          expect(res.body).to.have.own.property('error');
          expect(res.body.error).to.be.a('string');
        })
        .end(done);
      });
    });
    describe(context('success'), function() {
      it('responds with status code 200');
      it('responds with JSON');
      it('responds with an object - the book found');
      it('updates the Watcher tally for book SHOW requests');
    });
  });
  describe('#destroy', function() {
    it('looks up a book based on parameter from the request path');
    // @TODO - actually primarily testing controllers/utils.js with these first 3 contexts
    describe(context('book destroy error'), function() {
      it('responds with status code 500');
      it('responds with an object that has key "error" with the error message as the value');
    });
    describe(context('found book is null'), function() {
      it('responds with status code 404');
      it('responds with an object that has key "error" with the error message "Nothing found by this ID." as the value');
    });
    describe(context('success'), function() {
      it('responds with status code 200');
      it('responds with an object - the book found');
      it('removes the book found from the database');
      it('updates the Watcher tally for book DESTROY requests');
    });
  });
  describe('#update', function() {
    it('looks up a book based on parameter from the request path');
    // @TODO - actually primarily testing controllers/utils.js with these first 3 contexts
    describe(context('book update error'), function(done) {
      it('responds with status code 500');
      it('responds with an object that has key "error" with the error message as the value');
    });
    describe(context('found book is null'), function(done) {
      it('responds with status code 404');
      it('responds with an object that has key "error" with the error message "Nothing found by this ID." as the value');
    });
    describe(context('success'), function() {
      it('responds with status code 200');
      it('updates the book in the database based on request body');
      it('responds with an object - the updated version of the book found');
      it('updates the Watcher tally for book UPDATE requests');
    });
  });
});
