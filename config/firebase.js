const firebase = require("firebase");
var config = {

  };

firebase.initializeApp(config);
const db = firebase.firestore();

module.exports = db;
