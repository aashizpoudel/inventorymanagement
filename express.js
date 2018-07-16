var express = require('express');
var path = require('path');
var app = express();
const hbs = require("hbs");

app.set('views', path.join(__dirname, 'views'));

app.engine('html', require('hbs').__express);
app.set('view engine','html');
app.use(express.static(__dirname + "/public"));


hbs.registerPartials(__dirname + '/views/partials');


app.get('/',function(req,res){
    res.render('index');
})

var port = Number(process.env.PORT || 3000);
app.listen(port,function(){
    console.log("Listening on "+port + "...");
})