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


app.get('/import', function (req, res) {

    var contracts = require('./contracts.json');

    var importPromise = new Promise((resolve, reject) => {      
        
        MongoClient.connect(url, function(err, db) {
            const imports = [];
            
            var contractsPromise = Promise.all(_(contracts).forEach(function(contract) {                  
                
                var companyPromise = new Promise((resolve, reject) => {
                    db.collection('companies').findOne({ssn: contract.kennitala.replace('-','') },(err, result) => {                
                        if(err) {
                            reject(err)
                        }
                        resolve(result) 
                    });
                })
            }));

            contractsPromise.then((values) => {
                resolve(values);                
            })

            // if (company._id) {
            //     // db.collection("contracts").insertOne({
            //     //     companyId: company._id,
            //     // });                    
            // }            

            // _(contracts).forEach(function(contract) {                
            //     //var company = db.collection("companies").findOne({ssn: contract.kennitala.replace('-','')});                
            // });
                
        });
    });

    importPromise.then((response) => {
        return res.jsonp({ response });
    });
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
        
http.createServer(app).listen(3030, function () {
  console.log('Server listening on port 3030');
});
