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
        res.header('Access-Control-Allow-Origin', '*')
        res.header('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type,Authorization')
        res.header('Access-Control-Allow-Methods', 'GET,PUT,PATCH,POST,DELETE')
        if (req.method === 'OPTIONS') return res.send(200)
    }
    next()
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

app.get('/companies', function (req, res) {  

    MongoClient.connect(url, function(err, db) {
        var collection = db.collection('companies');
        
        collection.find({}).toArray(function(err, docs) {                    
            res.jsonp(docs);
        });
    }); 
});


http.createServer(app).listen(3030, function () {
  console.log('Server listening on port 3030');
});