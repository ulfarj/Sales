var http = require('http');
var request = require('request');
var express = require('express');
var bodyParser = require('body-parser');
var url  = require('url');
var _ = require('lodash');
var jwt    = require('jsonwebtoken');
var EJSON = require('mongodb-extended-json');
var Promise = require('promise');

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

const cp = (collection, findParams) => {
  findParams.deleted = { $exists: false };
  return new Promise((resolve, reject) => {
    collection.findOne(findParams,(err, result) => {
    if(err) {
      reject(err)
    }
    const id = result ? result._id : null;
      resolve(id)
    });
  });
}


app.get('/testContracts', function (req, res) {

    var contracts = require('./contracts.json');

    MongoClient.connect(url, function(err, db) {

    var importPromise = new Promise((resolveImport, rejectImport) => {

      const imports = [];

      var contractsPromises = []
      contracts.map((contract) => {

        var ssn = contract.ssn.replace('-','');
        var company = cp(db.collection('companies'), { ssn })

        // if(company !== null) {
            contractsPromises.push(
            Promise.all(
                [
                ssn,
                company,
                ]
            )
            )
        // }
       })

       Promise.all(contractsPromises).then((values => {
         resolveImport(values)
       }))
    })

    importPromise.then((response) => {
        const contractsResult = [];
        response.map(c => {
           if(!c[1]) {
            contractsResult.push(c[0]);
           }
       });

    //    } (
    //      {
    //         ssn: c[0],
    //         company: c[1],
    //      }
    //   ))

      // console.log(contractsResult.length)
    //   db.collection("contracts").insert(contractsResult);
      return res.jsonp(_.uniq(contractsResult));
    });

  })
})

http.createServer(app).listen(4040, function () {
  console.log('Server listening on port 4040');
});
