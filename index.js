const express = require('express')
var bodyParser = require('body-parser')
var jwtFunctions = require('./functions/jwtFunctions.js')
var session = require('express-session')
const uuidv4 = require('uuid/v4')
const app = express()


app.use(bodyParser.json())        
app.use(bodyParser.urlencoded({ extended: false }))
app.use(session({ secret: uuidv4(), cookie: { maxAge: 60000 }}))


app.post('/login', (req,res) =>{
    console.log("POST")
});

app.post('/createRequest' , (req,res) =>{

});

app.post('/register' , (req,res) =>{

});


app.listen(3001, () => console.log('Server Started on port 3000'))