const admin = require("firebase-admin");

let key = require("../key/key.json");
admin.initializeApp({
  credential: admin.credential.cert(key),
  databaseURL: "https://filmticketbooking-cae81.firebaseio.com",
  storageBucket: "filmticketbooking-cae81.appspot.com",
});

const db = admin.firestore();
module.exports = { db, admin };
