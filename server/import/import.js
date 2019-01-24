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


app.get('/find', function (req, res) {

  const companies = require('./companies.json');

  MongoClient.connect(url, function(err, db) {
    const findParams = {};
    findParams.deleted = { $exists: false };
    const result = [];
      var collection = db.collection('companies');
        collection.find(findParams).toArray(function(err, docs) {
          _(companies).forEach((company) => {
            const index = _.findIndex(docs, { ssn: String(company.ssn) });
            if(index === -1) {
              const newCompany = {
                ssn: String(company.ssn),
                name: company.name,
                address: company.address,
                postalCode: String(company.postalCode),
                contact: company.contact,
                maingroup: company.maingroup,
                subgroup: company.subgroup,
              };
              result.push(newCompany);
            }
          });
          res.jsonp(result);
      });
   });
});


http.createServer(app).listen(4040, function () {
  console.log('Server listening on port 4040');
});
