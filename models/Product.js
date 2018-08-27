var mongoose = require('mongoose');

var itemSchema = new mongoose.Schema({
	productName:String,
	desc:String,
	uom:String,
	cost:Number,
	currentStock:Number,
});

itemSchema.index({
	productName:'text',
})

module.exports = mongoose.model('Product',itemSchema);