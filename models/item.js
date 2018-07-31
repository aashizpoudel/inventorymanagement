

var mongoose = require('mongoose');

var vendorSchema = new mongoose.Schema({
	venderId:String,
	vendorName:String,
	vendorAddress:String
});

var itemSchema = new mongoose.Schema({
	itemName:String,
	desc:String,
	uom:String,
	cost:Number
});


var logSchema = new mongoose.Schema({
	logId :String,
	logDate: Date,
	logType:String,
	logVendor:vendorSchema,
	logItem: itemSchema,
	logQuantity:Number,
	logCost: Number
});

var inventorySchema = new mongoose.Schema({
	inventoryId:String,
	item:itemSchema,
	quantity: Number,
	children: Array
})

module.exports = mongoose.model('Item',itemSchema);

module.exports = mongoose.model('Inventory',inventorySchema);

module.exports = mongoose.model('Logs',logSchema);

module.exports = mongoose.model('Vendors',vendorSchema);

