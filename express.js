var express = require('express');
var path = require('path');
var app = express();
const hbs = require("hbs");
const db = require('./config/db');
var Item = require('./models/item');
const mongoose = require('mongoose');

mongoose.connect(db.url);

app.set('views', path.join(__dirname, 'views'));

app.engine('html', require('hbs').__express);
app.set('view engine','html');
app.use(express.static(__dirname + "/public"));


hbs.registerPartials(__dirname + '/views/partials');


app.get('/',function(req,res){
    
    res.render('index');
});

var router = express.Router();         
require('./routes/inventory.model.route')(router); // configure routes for the inventory model
app.use('/api', router);



var port = Number(process.env.PORT || 3000);
app.listen(port,function(){
    console.log("Listening on "+port + "...");
})