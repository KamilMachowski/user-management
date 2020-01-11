//Initiallising node modules
var express = require('express');
var bodyParser = require('body-parser');
var mongo = require('mongodb');
var app = express();

var mc = mongo.MongoClient;
var url = 'mongodb+srv://wonsz:wonsz_mongo_test@pht-mongodb-52c4w.mongodb.net'; // ?authSource=admin&replicaSet=pht-mongodb-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true';

// Body Parser Middleware
app.use(bodyParser.json());

//CORS Middleware
app.use(function(req, res, next) {
  //Enabling CORS
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Methods',
    'GET,HEAD,OPTIONS,POST,PUT,DELETE'
  );
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, contentType,Content-Type, Accept, Authorization'
  );
  next();
});

//Setting up server
var server = app.listen(process.env.PORT || 3000, function() {
  var port = server.address().port;
  console.log('App now running on port', port);
});

//Initiallising connection string

// db.connect(function(err) {
//   if (err) throw err;
// });
//Function to connect to database and execute query

//GET API
app.get('/read', function(req, res) {
  var query = req.query.query;
  console.log(`query=${query}`);
  query = JSON.parse(query);

  mc.connect(
    url,
    {
      useUnifiedTopology: true,
      useNewUrlParser: true
    },
    function(err, db) {
      if (err) throw err;
      var dbo = db.db('angular');
      //console.log(`query2=${query}`);
      dbo
        .collection('users')
        .find(query)
        .toArray(function(err, record) {
          if (err) throw err;
          console.log(record);
          res.send(record); // (JSON.stringify(record));
          db.close();
        });
    }
  );
});

//POST API
app.post('/create', function(req, res) {
  req.on('data', item => {
    // console.log(`dostałem ${item}`);
    item = JSON.parse(item);
    mc.connect(
      url,
      {
        useUnifiedTopology: true,
        useNewUrlParser: true
      },
      function(err, db) {
        if (err) throw err;
        var dbo = db.db('angular');
        dbo.collection('users').insertOne(item, function(err, res) {
          if (err) throw err;
          db.close();
          // console.log(
          //   `New item successfully added under record no. ${res.insertedId}`
          // );
        });
      }
    );
  });
  res.send(`New item successfully added`);
});

// //PUT API
app.put('/update', function(req, res) {
  req.on('data', item => {
    newVal = `{$set: ${item}}`;
    item = JSON.parse(item);
    id = `{"_id":"${item._id}"}`;
    console.log(newVal);
    mc.connect(
      url,
      {
        useUnifiedTopology: true,
        useNewUrlParser: true
      },
      function(err, db) {
        if (err) throw err;
        var dbo = db.db('angular');
        dbo.collection('users').updateOne(id, newVal,{upsert:true}, function(err, res) {
          if (err) throw err;
          db.close();
        });
      }
    );
  });
});

// // DELETE API
app.delete('/delete/:itemId', function(req, res) {
  var itemId = JSON.parse(`{"_id":"${req.params.itemId}"}`);
  console.log(itemId);
  mc.connect(
    url,
    {
      useUnifiedTopology: true,
      useNewUrlParser: true
    },
    function(err, db) {
      if (err) throw err;
      var dbo = db.db('angular');
      dbo.collection('users').deleteOne(itemId, function(err, record) {
        if (err) throw err;
        db.close();
      });
    }
  );

  //   var sqlQuery = `DELETE FROM chemicals WHERE id=${itemId}`;
  //   var apiResponse = `Item ${itemId} successfully deleted`;
  //   //var sqlQuery = db.query(`DELETE FROM chemicals WHERE id=${itemId}`);

  //   db.query(sqlQuery, function(error) {
  //     if (error) throw error;
  //     res.send(apiResponse);
  //   });
  //   //executeQuery(query, apiResponse);
});
