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

function handleFile(err, data) {
    if (err) throw err
    const groups = JSON.parse(data);
    console.log(groups);
}

app.get('/importgroups', function(req,res) {
  MongoClient.connect(url, function(err, db) {
    try {
      const file = fs.readFileSync('groups.json')
      const groups = JSON.parse(file);

      groups.map(group => {
        //console.log(group.ssn);
        //console.log(group.Yfirflokkur);
        //console.log(group.Undirflokkur);
        const x = db.collection("companies").find({ ssn: group.ssn })._id;
        console.log(x);

        /*db.collection("companies").update(
         { _id: group.ssn },
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

      res.jsonp({success: true});
   }
   catch(e) {
     console.log(e);
     res.jsonp({status: 'error', error: e});
   }
 });
});

http.createServer(app).listen(3131, function () {
  console.log('Server listening on port 3131');
});
