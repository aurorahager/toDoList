//requires
var express = require('express');
var bodyParser = require('body-parser');
//routes required
 var indexRoute = require('./routes/index.js');
var listRoute = require('./routes/list.js');
//Globals
var app = express();
var port = 3000;

//middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
//Routes
app.use('/', indexRoute);
app.use('/list', listRoute);

app.listen(port,function(){
    console.log('server up on', port);   
});//END listen
