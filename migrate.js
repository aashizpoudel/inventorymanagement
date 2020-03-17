const db = require('./config/db');


const mongoose = require('mongoose');
mongoose.connect(db.url);

var Product = require('./models/product');
var User = require('./models/user');
var Transaction = require('./models/transaction');

Product.remove({}).then(()=>{
	console.log('successfully removed products');
	return Product.create(require('./db/db.json'));
}).then(s=>{
	return User.remove({});
}).then(s=>{
	console.log('successfully added products');
	return User.create({username:'admin',password:'admin',role:0})
}).then(s=>{
	console.log('successfully added users',s);

	return Transaction.remove({});
}).then(()=>{
	console.log('successfully remove transaction');
}).catch(e=>{
	console.log('error occurred...',e);
});;






var Logger = require('./models/log');

Logger.remove({}).then(()=>{
	console.log('successfully remove logs');
});;