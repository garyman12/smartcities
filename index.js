const express = require('express')
var bodyParser = require('body-parser')
var jwtFunctions = require('./functions/jwtFunctions.js')
var firebaseFunction = require('./functions/firebaseFunctions.js')
var session = require('express-session')
const uuidv4 = require('uuid/v4')
const app = express()


var firebaseInteractor = new firebaseFunction()
var jwtInteractor = new jwtFunctions()

app.use(bodyParser.json())        
app.use(bodyParser.urlencoded({ extended: false }))
app.use(session({ secret: uuidv4(), cookie: { maxAge: 60000 }}))


app.post('/login', (req,res) =>{
    firebaseInteractor.authenticateUser(req.body).then(function(result){
        console.log(result)
        res.send(result)
    }).catch(function(error){
        console.log(error)
        res.send(error)
    })
});

app.post('/createRequest' , (req,res) =>{

});

app.post('/register' , (req,res) =>{

});


app.listen(3001, () => console.log('Server Started on port 3001'))