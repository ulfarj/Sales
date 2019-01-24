var http = require('http');
var request = require('request');
var express = require('express');
var bodyParser = require('body-parser');
var url  = require('url');
var _ = require('lodash');
var moment = require('moment');
var passwordHash = require('password-hash');
var jwt = require('jsonwebtoken');
var Promise = require('promise');

var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID


var app = express();

app.use(function(req,res,next){
    next();
});

app.use( bodyParser.json({limit: '50mb'}) );
app.use(bodyParser.urlencoded({
  limit: '50mb',
  extended: true,
  parameterLimit:50000
}));

app.use(function(req, res, next) {
    if (req.headers.origin) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type,Authorization');
        res.header('Access-Control-Allow-Methods', 'GET,PUT,PATCH,POST,DELETE');
        if (req.method === 'OPTIONS'){
          return res.send(200);
        }
    }
    next();
});

var url = 'mongodb://localhost:27017/ssdb';

app.get('/groups', function (req, res) {
    MongoClient.connect(url, function(err, db) {
        var collection = db.collection('groups');
        var findParams = {};
        findParams.deleted = { $exists: false };
        collection.find(findParams).toArray(function(err, docs) {
            res.jsonp(docs);
        });
    });
});

http.createServer(app).listen(4040, function () {
    console.log('Server listening on port 4040');
});
