//Requires npm install firebase-admin
const admin = require("firebase-admin");

const serviceAccount = require("./config.json");
const database = require("./database.json");
const async = require("async");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://n-shop-b6c92-default-rtdb.europe-west1.firebasedatabase.app",
});
const db = admin.firestore();

const collectionName = "gameProductList";
const allEntityNames = Object.keys(database);
const asyncTasks = [];

for (const i in allEntityNames) {
  const entityName = allEntityNames[i];
  const entity = database[entityName];

  console.log("began migrating " + entityName);
  asyncTasks.push(function (callback) {
    db.collection(collectionName)
      .doc(entityName)
      .set(entity)
      .then(function () {
        callback();
      })
      .catch(function (error) {
        console.log(error);
        callback();
      });
  });

  async.parallel(asyncTasks, function () {
    console.log("Finished migrating " + entityName);
  });
}
