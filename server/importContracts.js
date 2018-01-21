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

const cp = (collection, search) => {
  // console.log(search)
  return new Promise((resolve, reject) => {
    collection.findOne(search,(err, result) => {
    if(err) {
      reject(err)
    }
    // console.log(result)
    const id = result ? result._id : null;
      resolve(id)
    });
  });
}

app.get('/import', function (req, res) {

    var contracts = require('./contracts.json');

    MongoClient.connect(url, function(err, db) {

    var importPromise = new Promise((resolveImport, rejectImport) => {

      const imports = [];

      var contractsPromises = []
      contracts.map((contract) => {

        var ssn = contract.ssn.replace('-','');

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
              ssn,
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
      return res.jsonp({ response });
    });

  })
})

        // _(contracts).forEach(function(contract) {

        //     // db.collection("contracts").insertOne(
        //     // {
        //     //     companyId: db.companies.findOne({ssn: contract.Kennitala}),
        //     //         // category: this.refs.category.getValue(),
        //     //         // contractmaincategory: this.refs.contractmaincategory.getValue(),
        //     //         // contractsubcategory: this.refs.contractsubcategory.getValue(),
        //     //         // contractnumber: this.refs.contractnumber.getValue(),
        //     //         // file: this.state.file,
        //     //         // salesman: this.refs.salesman.getValue(),
        //     //         // salesday: this.refs.salesday.getValue(),
        //     //         // type: this.refs.type.getValue(),
        //     //         // contractamount: this.refs.contractamount.getValue(),
        //     //         // subscriptionamount: this.refs.subscriptionamount.getValue(),
        //     //         // firstpaydate: this.refs.firstpaydate.getValue(),
        //     //         // firstdisplaydate: this.refs.firstdisplaydate.getValue(),
        //     //         // lastdisplaydate: this.refs.lastdisplaydate.getValue(),
        //     //         // termination: this.refs.termination.getValue(),
        //     //         // lastpaydate: this.refs.lastpaydate.getValue(),
        //     //         // contact: this.refs.contact.getValue(),
        //     //         // contactphone: this.refs.contactphone.getValue(),
        //     //         // contactemail: this.refs.contactemail.getValue(),
        //     //         // article: this.refs.article.getValue(),
        //     //         // advertisement: this.refs.advertisement.getValue(),
        //     //         // coverage: this.refs.coverage.getValue(),
        //     //         // photography: this.refs.photography.getValue(),
        //     //         // articlewriting: this.refs.articlewriting.getValue(),
        //     //         // contentready: this.refs.contentready.getValue(),
        //     //         // email: this.refs.email.getValue(),
        //     //         // contentready: this.refs.contentready.getValue(),
        //     //         // proofs: this.refs.proofs.getValue(),
        //     //         // corrected: this.refs.corrected.getValue(),
        //     //         // approved: this.refs.approved.getValue(),
        //     //         // app: this.refs.app.getValue(),
        //     //         // location: this.refs.location.getValue(),
        //     //         // legalmarked: (this.state.contract['legalmarked'] === true) ? true : false,
        //     //         // contactbilling: (this.state.contract['contactbilling'] === true) ? true : false,
        //     //       });
        //       });

http.createServer(app).listen(4040, function () {
  console.log('Server listening on port 4040');
});
