var http = require('http');
var request = require('request');
var express = require('express');
var bodyParser = require('body-parser');
var url  = require('url');
var _ = require('lodash');
var jwt    = require('jsonwebtoken');
var EJSON = require('mongodb-extended-json');

var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID

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


app.get('/import', function (req, res) {
      MongoClient.connect(url, function(err, db) {
          db.collection('categories').find({}).toArray(function(err, categories) {
            db.collection('statuses').find({}).toArray(function(err, statuses) {
              db.collection('salesmen').find({}).toArray(function(err, salesmen) {
                  importCompanies(statuses, categories, salesmen);
              });
            });
          });
      });

   res.jsonp({status: 'success'});
});

function importCompanies(statuses, categories, salesmen){

     var companies = require('./companies.json');

          MongoClient.connect(url, function(err, db) {

              _(companies).forEach(function(company) {


                //console.log(company.sm);
                //console.log(categories);
                //console.log(statuses);
                console.log(salesmen);
                var SS = EJSON.stringify(salesmen);
                console.log(SS);
                //console.log(salesmen);
                //console.log(salesmen.toJSON());

                if(company.sm === 'Eldri sölumenn')
                {
                  //console.log('xx');
                }
                //var si = _.findIndex(salesmen, { 'name': company.sm });
                var sm = _.find(SS, { 'name': company.sm });
                //console.log(sm);
                //console.log(si);

                var sales = [];
                if(company.DiningOut){
                  sales.push(
                    {
                      "categoryId": "diningId",
                      "statusId": "123",
                      "salesmanId": sm._id
                    }
                  );
                }

                db.collection("companies").insertOne(
                  {
                    "ssn": company.ssn,
                    "name": company.name,
                    "address": company.address,
                    "postalCode": company.postalCode,
                    "phone": company.phone,
                    "email": company.email,
                    "sales": []
                  });
              });
          });
}



function getCategories(){
    MongoClient.connect(url, function(err, db) {
        var collection = db.collection('categories');

        collection.find({}).toArray(function(err, docs) {
            return docs;
        });
    });
}

function getSalesmen(){
    MongoClient.connect(url, function(err, db) {
        var collection = db.collection('salesmen');

        collection.find({}).toArray(function(err, docs) {
            return docs;
        });
    });
}

function getStatuses(){
    MongoClient.connect(url, function(err, db) {
        var collection = db.collection('statuses');

        collection.find({}).toArray(function(err, docs) {
            return docs;
        });
    });
}


http.createServer(app).listen(3030, function () {
  console.log('Server listening on port 3030');
});
