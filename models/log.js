var mongoose = require('mongoose');
var logSchema = new mongoose.Schema({
	allTimeSales:{type:Number,default:0},
});

// itemSchema.index({
// 	'productName':1,
// },{unique:true})

module.exports = mongoose.model('Logs',logSchema);
