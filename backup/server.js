var http = require('http');
var request = require('request');
var express = require('express');
var bodyParser = require('body-parser');
var url  = require('url');
var _ = require('lodash');

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

app.get('/statuses', function (req, res) {

    MongoClient.connect(url, function(err, db) {
        var collection = db.collection('statuses');

        collection.find({}).toArray(function(err, docs) {
            res.jsonp(docs);
        });
    });
});

app.get('/comments/:id', function (req, res) {

    MongoClient.connect(url, function(err, db) {
        var collection = db.collection('comments');

        var findParams = {};

        findParams.companyId = new RegExp(req.params.id, 'i');

        collection.find(findParams).toArray(function(err, docs) {
            res.jsonp(docs);
        });
    });
});

app.get('/sales/:id', function (req, res) {

    MongoClient.connect(url, function(err, db) {
        var collection = db.collection('companies');
        collection.find({_id: ObjectID(req.params.id)}).toArray(function(err, docs) {
            res.jsonp(docs[0].sales);
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

        if(req.body.phone) {
           findParams.phone = new RegExp(req.body.phone, 'i');
        }

        if(req.body.address) {
           findParams.address = new RegExp(req.body.address, 'i');
        }

        if(req.body.postalCode) {
           findParams.postalCode = new RegExp(req.body.postalCode, 'i');
        }

        if(req.body.phone) {
           findParams.phone = new RegExp(req.body.phone, 'i');
        }

        if(req.body.email) {
           findParams.email = new RegExp(req.body.email, 'i');
        }

        if(req.body.comment) {
           findParams.comment = new RegExp(req.body.comment, 'i');
        }

/*
        if(req.body.nosale)
        {
          findParams.$and =
          [{
            $or: [
              {
                sales: { $eq: [] }
              },
              {
                sales: {
                  $elemMatch: {
                    categoryId: {$in: req.body.categories},
                    statusId: {$in: req.body.statuses},
                    salesmanId: {$in: req.body.salesmen}
                  }
                }
              }
            ]
          }];
        }
        else {
            findParams.sales = {
              $elemMatch: {
                categoryId: {$in: req.body.categories},
                statusId: {$in: req.body.statuses},
                salesmanId: {$in: req.body.salesmen}
              }
            };
        }
*/
        var sortColumn = req.body.sorting.column;
        var sortOrder = req.body.sorting.order === "asc" ? 1 : -1;

        var sort = {'_id': sortOrder};
        if(sortColumn === "name"){
          sort = {'name': sortOrder};
        }
        if(sortColumn === "ssn"){
          sort = {'ssn': sortOrder};
        }
        if(sortColumn === "phone"){
          sort = {'phone': sortOrder};
        }
        if(sortColumn === "address"){
          sort = {'address': sortOrder};
        }
        if(sortColumn === "postalCode"){
          sort = {'postalCode': sortOrder};
        }
        if(sortColumn === "email"){
          sort = {'email': sortOrder};
        }
        if(sortColumn === "comment"){
          sort = {'comment': sortOrder};
        }

        var collection = db.collection('companies');
        collection.find(findParams).sort(sort).toArray(function(err, docs) {
          console.log(docs);
          res.jsonp(docs);
        });

    });
});

app.post('/company', function(req, res) {

  MongoClient.connect(url, function(err, db) {

    var id = req.params.id;

    try{
      db.collection("companies").insertOne(
        {
          "ssn": req.body.ssn,
          "name": req.body.name,
          "address": req.body.address,
          "postalCode": req.body.postalCode,
          "phone": req.body.phone,
          "email": req.body.email,
          "comment": req.body.comment,
          "sales": req.body.sales
        },
        function (err, result){

          for (var i = 0; i < req.body.sales.length; i++) {
              insertSale(
                result.insertedId,
                req.body.sales[i].categoryId,
                req.body.sales[i].salesmanId,
                req.body.sales[i].statusId
              );
          }
       });

      res.jsonp({status: 'success'});
   }
   catch(e) {
     console.log(e);
     res.jsonp({status: 'error', error: e});
   }

  });
});

app.post('/updateCompany', function (req, res) {

    MongoClient.connect(url, function(err, db) {

      try{
        db.collection("companies").update(
         { _id: ObjectID(req.body.id) },
         {
           $set:
           {
             "ssn": req.body.ssn,
             "name": req.body.name,
             "address": req.body.address,
             "postalCode": req.body.postalCode,
             "phone": req.body.phone,
             "email": req.body.email,
           }
         });

        res.jsonp({status: 'success'});
     }
     catch(e) {
       console.log(e);
       res.jsonp({status: 'error', error: e});
     }

    });
});

app.post('/addComment', function (req, res) {

    MongoClient.connect(url, function(err, db) {

      try{

        db.collection("companies").update(
         { _id: ObjectID(req.body.id) },
         {
           $set:
           {
             "comment": req.body.comment
           }
         });

        db.collection("comments").insert({
          "companyId": req.body.id,
          "created": new Date(),
          "comment": req.body.comment
        });

        res.jsonp({status: 'success'});
     }
     catch(e) {
       console.log(e);
       res.jsonp({status: 'error', error: e});
     }

    });
});

app.post('/addSale', function (req, res) {

    MongoClient.connect(url, function(err, db) {

      try{
        db.collection("companies").update(
         { _id: ObjectID(req.body.id) },
         { "$push":
             {"sales": req.body.sale}
         });

         insertSale(
           ObjectID(req.body.id),
           req.body.sale.categoryId,
           req.body.sale.salesmanId,
           req.body.sale.statusId
         );

         res.jsonp({status: 'success'});
     }
     catch(e) {
       console.log(e);
       res.jsonp({status: 'error', error: e});
     }

    });
});

app.post('/deleteSale', function (req, res) {

    MongoClient.connect(url, function(err, db) {

      try{
        db.collection("companies").update(
         { _id: ObjectID(req.body.id) },
         { "$pull":
             {"sales": {'categoryId': req.body.categoryId}}
         });

         insertSale(
           ObjectID(req.body.id),
           req.body.categoryId,
           '',
           ''
         );

         res.jsonp({status: 'success'});
     }
     catch(e) {
       console.log(e);
       res.jsonp({status: 'error', error: e});
     }

    });
});

app.post('/updateSale', function (req, res) {

  MongoClient.connect(url, function(err, db) {

    try{
      db.collection("companies").update(
       {
         "_id": ObjectID(req.body.id),
         "sales.categoryId": req.body.categoryId
       },
       { "$set":
           {"sales.$": req.body.sale}
       });

       insertSale(
         ObjectID(req.body.id),
         req.body.sale.categoryId,
         req.body.sale.salesmanId,
         req.body.sale.statusId
       );

       res.jsonp({status: 'success'});
   }
   catch(e) {
     console.log(e);
     res.jsonp({status: 'error', error: e});
   }

  });

});

function insertSale(companyId, categoryId, salesmanId, statusId) {

  MongoClient.connect(url, function(err, db) {
    db.collection("sales").insertOne({
        "companyId": companyId,
        "categoryId": categoryId,
        "salesmanId": salesmanId,
        "statusId": statusId,
        "created": new Date()
     });
   });
}


http.createServer(app).listen(3030, function () {
  console.log('Server listening on port 3030');
});
