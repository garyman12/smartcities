const express = require('express')
var bodyParser = require('body-parser')
var jwtFunctions = require('./functions/jwtFunctions.js')
var session = require('express-session')
const app = express()


app.use(bodyParser.json())        
app.use(bodyParser.urlencoded({ extended: false }))


app.post('/login', (req,res) =>{

});

app.post('/createRequest' , (req,res) =>{

});

app.post('/createRequest' , (req,res) =>{

});


app.listen(3001, () => console.log('Server Started on port 3000'))