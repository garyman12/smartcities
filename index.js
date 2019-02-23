const express = require('express')
var bodyParser = require('body-parser')
var jwtFunctions = require('./functions/jwtFunctions.js')
const app = express()


app.use(bodyParser.json())        
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', (req, res) => {
    res.send("Hello World!") // Redirect to login page with Github, Google and Facebook Oauth2 logins
});

app.get('/login', (req,res) =>{

})


app.listen(3001, () => console.log('Server Started on port 3000'))