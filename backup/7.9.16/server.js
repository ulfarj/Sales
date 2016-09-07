var http = require('http');
var request = require('request');
var express = require('express');
var bodyParser = require('body-parser');
var url  = require('url');
var _ = require('lodash');
//var jwt    = require('jsonwebtoken');

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

/*
app.post('/authenticate', function(req, res) {

  MongoClient.connect(url, function(err, db) {
      var collection = db.collection('users');

      console.log(req.body.username);
      // find the user
      collection.findOne({
        username: req.body.username
      }, function(err, user) {

        if (err) throw err;

        if(err) {
          res.status(500).json({error: "Internal server error"});
        }

        if (!user) {
          res.status(500).json({error: "Authentication failed. User not found."});
          //res.json({ ok: false, message: 'Authentication failed. User not found.' });
        } else if (user) {
          // check if password matches
          if (user.password != req.body.password) {
            res.status(500).json({error: "Authentication failed. Wrong password."});
          } else {
            // if user is found and password is right
            // create a token
            var token = jwt.sign(user, 'weirdoes', {
              expiresIn: "20d"
            });
            // return the information including token as JSON
            res.json({
              ok: true,
              access_token: token,
              userName: user.username
            });
          }

        }
      });
  });
});*/

app.post('/createSalesman', function(req, res) {

  MongoClient.connect(url, function(err, db) {
    try{
      db.collection("salesmen").insertOne(
        {"name": req.body.name}
       );
      res.jsonp({status: 'success'});
   }
   catch(e) {
     console.log(e);
     res.jsonp({status: 'error', error: e});
   }
  });
});

app.post('/createCategory', function(req, res) {

  MongoClient.connect(url, function(err, db) {
    try{
      db.collection("categories").insertOne(
        {"name": req.body.name}
       );
      res.jsonp({status: 'success'});
   }
   catch(e) {
     console.log(e);
     res.jsonp({status: 'error', error: e});
   }
  });
});

app.post('/createStatus', function(req, res) {

  MongoClient.connect(url, function(err, db) {
    try{
      db.collection("statuses").insertOne(
        {"name": req.body.name, "color": req.body.color}
       );
      res.jsonp({status: 'success'});
   }
   catch(e) {
     console.log(e);
     res.jsonp({status: 'error', error: e});
   }
  });
});

app.get('/deleteSalesman/:id', function (req, res) {
  MongoClient.connect(url, function(err, db) {

    try{
      db.collection("salesmen").update(
       { _id: ObjectID(req.params.id) },
       {
         $set:
         {
           "deleted": true
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

app.get('/deleteStatus/:id', function (req, res) {
  MongoClient.connect(url, function(err, db) {

    try{
      db.collection("statuses").update(
       { _id: ObjectID(req.params.id) },
       {
         $set:
         {
           "deleted": true
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

app.get('/deleteCategory/:id', function (req, res) {
  MongoClient.connect(url, function(err, db) {

    try{
      db.collection("categories").update(
       { _id: ObjectID(req.params.id) },
       {
         $set:
         {
           "deleted": true
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

app.get('/categories', function (req, res) {

    MongoClient.connect(url, function(err, db) {
        var collection = db.collection('categories');
        var findParams = {};
        findParams.deleted = { $exists: false };

        collection.find(findParams).toArray(function(err, docs) {
            res.jsonp(docs);
        });
    });
});

app.get('/salesmen', function (req, res) {

    MongoClient.connect(url, function(err, db) {
        var collection = db.collection('salesmen');
        var findParams = {};
        findParams.deleted = { $exists: false };

        collection.find(findParams).toArray(function(err, docs) {
            res.jsonp(docs);
        });
    });
});

app.get('/statuses', function (req, res) {

    MongoClient.connect(url, function(err, db) {
        var collection = db.collection('statuses');
        var findParams = {};
        findParams.deleted = { $exists: false };

        collection.find(findParams).toArray(function(err, docs) {
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

        if(req.body.contact) {
           findParams.contact = new RegExp(req.body.contact, 'i');
        }

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

        //findParams.$and = {deleted: { $exists: false }};
        findParams.deleted = { $exists: false };

        var collection = db.collection('companies');
        collection.find(findParams).toArray(function(err, docs) {
          //console.log(docs);
          var companies = docs.sort(sortByProperty(req.body.sorting.column, req.body.sorting.order));
          res.jsonp(companies);
        });

    });
});

var sortByProperty = function (property, order) {
    if(order === 'asc') {
      return function (a, b) {
          return a[property].localeCompare(b[property], 'is');
      };
    }else {
      return function (a, b) {
          return b[property].localeCompare(a[property], 'is');
      };
    }
};

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


app.post('/importcompanies', function(req, res) {

  MongoClient.connect(url, function(err, db) {
    try{
      db.collection("companies").insert(req.body.companies);
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
             "legal": req.body.legal,
             "dontcontact": req.body.dontcontact,
             "contact": req.body.contact
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


app.get('/deleteCompany/:id', function (req, res) {
  MongoClient.connect(url, function(err, db) {

    try{
      db.collection("companies").update(
       { _id: ObjectID(req.params.id) },
       {
         $set:
         {
           "deleted": true
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
