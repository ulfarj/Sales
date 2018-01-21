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

app.get('/importContracts', function (req, res) {

    var contracts = require('./contracts.json');

    MongoClient.connect(url, function(err, db) {

    var importPromise = new Promise((resolveImport, rejectImport) => {

      const imports = [];

      var contractsPromises = []
      contracts.map((contract) => {

        var ssn = contract.ssn.replace('-','');
        var company = cp(db.collection('companies'), { ssn })

        var category = cp(db.collection('categories'), { name: contract.category });
        var contractmaincategory = cp(db.collection('groups'), { name: contracts.contractmaincategory, type: 'Yfirflokkur' })
        var contractsubcategory = cp(db.collection('groups'), { name: contracts.contractsubcategory, type: 'Undirflokkur' })
        var salesman = cp(db.collection('salesmen'), { name: contract.salesman });

        var salesday = contract.salesday;
        var contractnumber = contract.contractnumber;
        var type = contract.type;
        var contractamount = contract.contractamount ? contract.contractamount.toString() : "";
        var subscriptionamount = contract.subscriptionamount ? contract.subscriptionamount.toString() : "";
        var firstdisplaydatepublish = contract.firstdisplaydatepublish ? contract.firstdisplaydatepublish.toString() : "";
        var firstdisplaydateyear = contract.firstdisplaydateyear;
        var termination = contract.termination;
        var lastdisplaydatepublish = contract.lastdisplaydatepublish ? contract.lastdisplaydatepublish.toString() : "";
        var lastdisplaydateyear = contract.lastdisplaydateyear ? contract.lastdisplaydateyear.toString() : "";
        var firstpaydate = contract.firstpaydate;
        var lastpaydate = contract.lastpaydate;
        var contact = contract.contact;
        var contactphone = contract.contactphone;
        var contactemail = contract.contactemail;
        var article = contract.article;
        var advertisement = contract.advertisement;
        var coverage = contract.coverage;
        var photography = contract.photography;
        var articlewriting = contract.articlewriting;
        var email = contract.email;
        var contentready = contract.contentready;
        var proofs = contract.proofs;
        var corrected = contract.corrected;
        var approved = contract.approved;
        var app = contract.app;
        var location = contract.location;

        contractsPromises.push(
          Promise.all(
            [
              company,
              category,
              contractmaincategory,
              contractsubcategory,
              salesman,
              salesday,
              contractnumber,
              type,
              contractamount,
              subscriptionamount,
              firstdisplaydatepublish,
              firstdisplaydateyear,
              termination,
              lastdisplaydatepublish,
              lastdisplaydateyear,
              firstpaydate,
              lastpaydate,
              contact,
              contactphone,
              contactemail,
              article,
              advertisement,
              coverage,
              photography,
              articlewriting,
              email,
              contentready,
              proofs,
              corrected,
              approved,
              app,
              location,
            ]
          )
        )
       })

       Promise.all(contractsPromises).then((values => {
         resolveImport(values)
       }))
    })

    importPromise.then((response) => {

       const contracts = response.map(c =>(
         {
            companyId: c[0] ? c[0].toString() : "",
            category: c[1] ? c[1].toString() : "",
            contractmaincategory: c[2] ? c[2].toString() : "",
            contractsubcategory: c[3] ? c[3].toString() : "",
            salesman: c[4],
            salesday: c[5],
            contractnumber: c[6],
            type: c[7],
            contractamount: c[8],
            subscriptionamount: c[9],
            firstdisplaydatepublish: c[10],
            firstdisplaydateyear: c[11],
            termination: c[12],
            lastdisplaydatepublish: c[13],
            lastdisplaydateyear: c[14],
            firstpaydate: c[15],
            lastpaydate: c[16],
            contact: c[17],
            contactphone: c[18],
            contactemail: c[19],
            article: c[20],
            advertisement: c[21],
            coverage: c[22],
            photography: c[23],
            articlewriting: c[24],
            email: c[25],
            contentready: c[26],
            proofs: c[27],
            corrected: c[28],
            approved: c[29],
            app: c[30],
            location: c[31],
         }
      ))

      db.collection("contracts").insert(contracts);

      return res.jsonp(contracts);
    });

  })
})

http.createServer(app).listen(3030, function () {
  console.log('Server listening on port 3030');
});
