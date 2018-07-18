

var mongoose = require('mongoose');

var itemSchema = new mongoose.Schema({
    itemNumber:String,
    itemName: String,
	desc: String,
	quantity: Number,
	uom: String,
	cost: Number,
	children: Array
})

module.exports = mongoose.model('Item',itemSchema);