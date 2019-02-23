const express = require('express')
var bodyParser = require('body-parser')
const app = express()


app.use(bodyParser.json())        
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', (req, res) => {
    res.send("Hello World!") // Redirect to login page with Github, Google and Facebook Oauth2 logins
    });


app.listen(3000, () => console.log('Server Started on port 3000'))