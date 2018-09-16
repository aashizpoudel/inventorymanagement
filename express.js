var express = require('express');
var path = require('path');
var app = express();
// const exphbs = require("express-handlebars");

const db = require('./config/db');

var bodyParser = require('body-parser')

const mongoose = require('mongoose');

mongoose.connect(db.url);

app.set('views', path.join(__dirname, 'views'));

app.engine('.html', require('ejs').__express);
app.set('view engine', '.html');


app.use(express.static(__dirname + "/public"));

app.use(bodyParser.urlencoded({
    extended: false
 }));
app.use(bodyParser.json());




app.get('/',function(req,res){
    
    res.render('pages/index');
});

var router = express.Router();         
require('./routes/Product')(router); // configure routes for the inventory model
require('./routes/Record')(router); // configure routes for the inventory model

app.use('/', router);



var port = Number(process.env.PORT || 3000);
app.listen(port,function(){
    console.log("Listening on "+port + "...");
})

