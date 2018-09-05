var mongoose = require('mongoose');

var itemSchema = new mongoose.Schema({
	productName:{type: String, index:true ,unique:true},
	desc:String,
	uom:String,
	cost:Number,
	currentStock:Number,
});

// itemSchema.index({
// 	'productName':1,
// },{unique:true})

module.exports = mongoose.model('Product',itemSchema);