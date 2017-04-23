var http = require('http');
var request = require('request');
var express = require('express');
var bodyParser = require('body-parser');
var url  = require('url');
var _ = require('lodash');
var moment = require('moment');
var passwordHash = require('password-hash');
var jwt = require('jsonwebtoken');
var fs = require('fs');

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

/*function handleFile(err, data) {
    if (err) throw err
    const groups = JSON.parse(data);
    console.log(groups);
}

async function findCompany(ssn) {
  MongoClient.connect(url, function(err, db) {
    db.collection("companies").findOne({ ssn }, function(err, item) {
      //console.log(item);
      return item;
    })
  });
}*/

app.get('/groups', function(req,res) {
  MongoClient.connect(url, function(err, db) {
    try {
      const file = fs.readFileSync('groupsTest.json')
      const groups = JSON.parse(file);

      const dbGroups = groups.map(group => {
        return group;
        //return findCompany(group.ssn.toString());

        /*db.collection("companies").update(
         { ssn: group.ssn.toString() },
         {
           $set:
           {
             "maingroup": group.Yfirflokkur,
             "subgroup": group.Undirflokkur,
           }
         },
         { upsert:false, multi:true}
       );*/
      })

      res.jsonp(dbGroups);
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
