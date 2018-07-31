var express = require('express');
var path = require('path');
var app = express();
const hbs = require("hbs");
const db = require('./config/db');
var Item = require('./models/item');
var bodyParser = require('body-parser')

const mongoose = require('mongoose');

mongoose.connect(db.url);

app.set('views', path.join(__dirname, 'views'));

app.engine('html', require('hbs').__express);
app.set('view engine','html');
app.use(express.static(__dirname + "/public"));

app.use(bodyParser.urlencoded({
    extended: false
 }));
app.use(bodyParser.json());

hbs.registerPartials(__dirname + '/views/partials');


app.get('/',function(req,res){
    
    res.render('index');
});

var router = express.Router();         
require('./routes/myroutes')(router); // configure routes for the inventory model
app.use('/', router);



var port = Number(process.env.PORT || 3000);
app.listen(port,function(){
    console.log("Listening on "+port + "...");
})