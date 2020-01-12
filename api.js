//Initiallising node modules
const express = require('express');
const bodyParser = require('body-parser');
const mongo = require('mongodb');

const app = express();

const mc = mongo.MongoClient;
const url =
  'mongodb+srv://wonsz:wonsz_mongo_test@pht-mongodb-52c4w.mongodb.net';

// Body Parser Middleware
app.use(bodyParser.json());

//CORS Middleware

app.use((req, res, next) => {
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
const server = app.listen(process.env.PORT || 3000, () => {
  const port = server.address().port;
  console.log('App now running on port', port);
});

//GET API
app.get('/read', (req, res) => {
  let query = req.query.query;
  query = JSON.parse(query);
  mc.connect(
    url,
    {
      useUnifiedTopology: true,
      useNewUrlParser: true
    },
    (err, db) => {
      if (err) throw err;
      db.db('angular')
        .collection('users')
        .find(query)
        .toArray((err, record) => {
          if (err) throw err;
          res.send(record);
          db.close();
        });
    }
  );
});

//POST API
app.post('/create', (req, res) => {
  req.on('data', item => {
    item = JSON.parse(item);
    mc.connect(
      url,
      {
        useUnifiedTopology: true,
        useNewUrlParser: true
      },
      (err, db) => {
        if (err) throw err;
        db.db('angular')
          .collection('users')
          .insertOne(item, (err, res) => {
            if (err) throw err;
            db.close();
          });
      }
    );
  });
});

// //PUT API
app.put('/update', (req, res) => {
  console.log('sdgh');
  req.on('data', item => {
    item = JSON.parse(item);
    mc.connect(
      url,
      {
        useUnifiedTopology: true,
        useNewUrlParser: true
      },
      (err, db) => {
        if (err) throw err;
        db.db('angular')
          .collection('users')
          .findOneAndUpdate(
            { email: item.email },
            {
              $set: {
                city: item.city,
                country: item.country,
                token: item.token
              }
            },
            (err, res) => {
              if (err) throw err;
              db.close();
            }
          );
      }
    );
  });
});

// // DELETE API
app.delete('/delete/:itemEmail', (req, res) => {
  const itemEmail = req.params.itemEmail;
  console.log(itemEmail);
  mc.connect(
    url,
    {
      useUnifiedTopology: true,
      useNewUrlParser: true
    },
    (err, db) => {
      if (err) throw err;
      db.db('angular')
        .collection('users')
        .findOneAndDelete({ email: itemEmail }, (err, record) => {
          if (err) throw err;
          db.close();
        });
    }
  );
});
