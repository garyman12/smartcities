const express = require("express");
var bodyParser = require("body-parser");
var jwtFunctions = require("./functions/jwtFunctions.js");
var firebaseFunction = require("./functions/firebaseFunctions.js");
var session = require("express-session");
const uuidv4 = require("uuid/v4");
const app = express();

var firebaseInteractor = new firebaseFunction();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post("/login", (req, res) => {
  firebaseInteractor
    .authenticateUser(req.body)
    .then(function(result) {
      console.log(result);
      res.send(result);
    })
    .catch(function(error) {
      console.log(error);
      res.send(error);
    });
});

app.post("/createRequest", (req, res) => {
  firebaseInteractor
    .createRequest(req.body)
    .then(function(result) {
      console.log(resultc + "a");
      res.send(result);
    })
    .catch(function(error) {
      res.send(error);
    });
});

app.post("/register", (req, res) => {
  console.log(req.body);
  firebaseInteractor
    .createUser(req.body)
    .then(function(result) {
      res.send(result);
    })
    .catch(function(error) {
      res.send(error);
    });
});
app.post("/getRequested", (req,res) =>{
  firebaseInteractor.getPostedHelp(req.body.jwtToken).then(function(result){
    fulfill(result)
  })
})

app.get("/getRequests", (req, res) => {
  firebaseInteractor
    .getRequests()
    .then(function(result) {
      res.send(result);
    })
    .catch(function(error) {
      console.log(error);
    });
});

app.post("/markComplete", (req, res) => {
  console.log("test");
  firebaseInteractor
    .markComplete(req.body)
    .then(function(result) {
      res.send(result);
    })
    .catch(function(error) {
      res.send(error);
    });
});
app.post("/getRequestInfo", (req, res) => {
  firebaseInteractor
    .getExactRequest(req.body.reqID)
    .then(function(result) {
      res.send(result);
    })
    .catch(function(error) {
      res.send(error);
    });
});
app.post("/getInfo", (req, res) => {
  console.log(req.body.userID);
  firebaseInteractor
    .getInfo(req.body.userID)
    .then(function(result) {
      res.send(result);
    })
    .catch(function(error) {
      res.send(error);
    });
});
app.post("/getInfoByEmail", (req, res) => {
  firebaseInteractor
    .getInfobyEmail(req.body.email)
    .then(function(result) {
      res.send(result);
    })
    .catch(function(error) {
      res.send(error);
    });
});
app.post("/getInfobyJWT", (req, res) => {
  console.log(req.body.jwtToken);
  firebaseInteractor
    .getInfobyJWT(req.body.jwtToken)
    .then(function(result) {
      res.send(result);
    })
    .catch(function(error) {
      res.send(error);
    });
});

app.listen(3001, () => console.log("Server Started on port 3001"));
