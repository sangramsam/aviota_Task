var express = require('express');
var addStatusCodes = require('./index');

var expect = require('chai').expect;
var request = require('supertest');

describe('express-json-status-codes', function(done) {
  var app;

  beforeEach(function() {
    var extendExpress = addStatusCodes(express);
    app = extendExpress();
    app.get('/', function(req, res){
      // return res.status(200).json('yolo');
      return res.ok('yolo');
    });
  });

  it('should add new methods to the response prototype that return json', function(done) {
    request(app)
      .get('/')
      .expect('Content-Type', /json/)
      .expect(200, JSON.stringify('yolo'))
      .end(function(err, res) {
        if (err) throw err;
        done();
      });
  });
});
