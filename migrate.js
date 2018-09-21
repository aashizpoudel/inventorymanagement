const db = require('./config/db');


const mongoose = require('mongoose');
mongoose.connect(db.url);

var Product = require('./models/Product');

Product.remove({});
Product.insertMany(require('./db/db.json')).then(s=>{
 console.log('Success!!');   
});