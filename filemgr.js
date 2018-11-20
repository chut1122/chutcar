const { MongoClient } = require('mongodb');
const fs = MongoClient;

// const database = 'mongodb://localhost:27017';
// const database = 'mongodb://localhost:27017';
const database =
  'mongodb://chut_95:Asdfghjkl123!@jj1122-shard-00-00-xdtmb.gcp.mongodb.net:27017,jj1122-shard-00-01-xdtmb.gcp.mongodb.net:27017,jj1122-shard-00-02-xdtmb.gcp.mongodb.net:27017/test?ssl=true&replicaSet=jj1122-shard-0&authSource=admin&retryWrites=true';

const appname = 'jj1122'; //cloud
// const appname='placesapp';//local
const collectionname = 'placeappcollection';
const saveData = newdata => {
  return new Promise((resolve, reject) => {
    MongoClient.connect(
      database,
      { useNewUrlParser: true },
      (err, client) => {
        if (err) {
          reject('Unable to connect to MongoDB');
        }

        console.log('Connected to MongoDB');
        const db = client.db(appname);

        const length = newdata.length;
        for (var i = 0; i < length; i++) {
          db.collection(collectionname).insertOne(newdata[i], (err, result) => {
            if (err) {
              reject('unable to insert');
            }
          });
        }
        resolve(1);

        client.close();
      }
    );
  });
};

const getAllData = () => {
  return new Promise((resolve, reject) => {
    MongoClient.connect(
      database,
      { useNewUrlParser: true },
      (err, client) => {
        if (err) {
          reject('Unable to connect to MongoDB');
        }

        console.log('Connected to MongoDB');
        const db = client.db(appname);

        db.collection(collectionname)
          .find()
          .toArray()
          .then(
            docs => {
              resolve(docs);
            },
            err => {
              reject('Unable to fetch docs');
            }
          );

        client.close();
      }
    );
  });
};

const deleteAll = () => {
  return new Promise((resolve, reject) => {
    MongoClient.connect(
      database,
      { useNewUrlParser: true },
      (err, client) => {
        if (err) {
          reject('Unable to connect to MongoDB');
        }

        console.log('Connected to MongoDB');
        const db = client.db(appname);

        db.collection(collectionname)
          .remove({})
          .then(
            result => {
              resolve(result);
            },
            err => {
              reject('Unable to delete');
            }
          );

        client.close();
      }
    );
  });
};

module.exports = {
  saveData,
  getAllData,
  deleteAll
};
