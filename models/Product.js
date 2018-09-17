var mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

var itemSchema = new mongoose.Schema({
	productName:{type: String, index:true ,unique:true},
	desc:String,
	uom:String,
	cost:Number,
	currentStock:Number,
	// productId:{type:Number,default:1,unique:true}
});

// itemSchema.index({
// 	'productName':1,
// },{unique:true})

itemSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Product',itemSchema);