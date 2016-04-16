var http = require('http');
var request = require('request');
var express = require('express');
var bodyParser = require('body-parser');
var url  = require('url');
var _ = require('lodash');

var MongoClient = require('mongodb').MongoClient;

var app = express();

app.use(function(req,res,next){
    next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

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

app.get('/categories', function (req, res) {

    MongoClient.connect(url, function(err, db) {
        var collection = db.collection('categories');

        collection.find({}).toArray(function(err, docs) {
            res.jsonp(docs);
        });
    });
});

app.get('/salesmen', function (req, res) {

    MongoClient.connect(url, function(err, db) {
        var collection = db.collection('salesmen');

        collection.find({}).toArray(function(err, docs) {
            res.jsonp(docs);
        });
    });
});

app.post('/companies', function (req, res) {

    MongoClient.connect(url, function(err, db) {

        var findParams = {};

        if(req.body.name) {
           findParams.name = new RegExp(req.body.name, 'i');
        }

        if(req.body.ssn) {
           findParams.ssn = new RegExp(req.body.ssn, 'i');
        }
      
        if(req.body.categories) {
						findParams.sales = { $elemMatch: { categoryId: {$in: req.body.categories}}};
				}

        var collection = db.collection('companies');

        collection.find(findParams).toArray(function(err, docs) {
            res.jsonp(docs);
        });
    });
});

app.post('/company', function(req, res) {

  MongoClient.connect(url, function(err, db) {

    try{
      db.collection("companies").insertOne({
          "ssn": req.body.ssn,
          "name": req.body.name,
          "address": req.body.address,
          "postalCode": req.body.postalCode,
          "phone": req.body.phone,
          "email": req.body.email,
          "comment": req.body.comment,
          "sales": req.body.sales
      });

      res.jsonp({status: 'success'});
   }
   catch(e) {
     console.log(e);
     res.jsonp({status: 'error', error: e});
   }

  });
});


http.createServer(app).listen(3030, function () {
  console.log('Server listening on port 3030');
});
