var path = require('path')
var express = require('express')
var api = require('./api')
var cors = require('cors');
var bodyParser = require('body-parser')
var port = 3001

var app = express()

app.use(bodyParser.json())
app.use(cors({
  origin: 'http://localhost:3000'
}));
app.use('/api', api)



app.listen(port, 'localhost', function(err) {
  if (err) {
    console.log(err)
    return
  }

  console.log('Listening at http://localhost:' + port)
})
