

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

var Item =  mongoose.model('Item',itemSchema);

var Inventory = mongoose.model('Inventory',inventorySchema);

var Logs = mongoose.model('Logs',logSchema);

var Vendors = mongoose.model('Vendors',vendorSchema);

