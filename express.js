const express = require('express');
const path = require('path');
const app = express();
const homeController = require('./controllers/homecontroller.js');
const db = require('./config/db');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const session = require('express-session');

var FileStore = require('session-file-store')(session);
var axios= require('axios');

// const exphbs = require("express-handlebars");




mongoose.connect(db.url);
  
app.set('views', path.join(__dirname, 'views'));

app.engine('.html', require('ejs').__express);
app.set('view engine', '.html');

// app.use(logger('dev'));
app.use(express.static(__dirname + "/public"));
// app.use(cookieParser());
app.use(session({secret:"this is secret",

    store: new FileStore(),
}));

app.use(bodyParser.urlencoded({
    extended: false
 }));
app.use(bodyParser.json());


app.use(require('./middlewares/auth'));

//Setup Routes

var router = express.Router();         
require('./routes/product.model.route')(router);
require('./routes/transaction.model.route')(router);
require('./routes/record.model.route')(router);
require('./routes/user.model.route')(router);
app.use('/', router);
app.get('/',homeController.home);
app.get('/logout',homeController.logout);

app.get('/dictionary/:word',function(req,res){
	word = req.params.word;
	const url =`https://www.vocabulary.com/dictionary/definition.ajax?search=${word}&lang=en`;
	axios.get(url).then(r=>{
		res.send(r.data);
	}).catch(e=>{
		res.send("noresults"+e.message);
	})
})



//Start actual server
var port = Number(process.env.PORT || 4000);
app.listen(port,function(){
    console.log("Listening on "+port + "...");
})



