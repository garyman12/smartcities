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
        res.send(result)
    }).catch(function(error){
        res.send(error)
    })
});

app.post('/createRequest' , (req,res) =>{
firebaseInteractor.createRequest(req.body).then(function(result){
    res.send(result)
}).catch(function(error){
    res.send(error)
})
});

app.post('/signup' , (req,res) =>{
    console.log(req)
    firebaseInteractor.createUser(req.body).then(function(result){
        res.send(result)
    }).catch(function(error){
        res.send(error)
    })
});

app.get('/getRequests', (req,res) =>{
    firebaseInteractor.getRequests().then(function(result){
        console.log(result)
        res.send(result)
    }).catch(function(error){
        console.log(error);
    })
})


app.listen(3001, () => console.log('Server Started on port 3001'))