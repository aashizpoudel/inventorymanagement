var mongoose = require('mongoose');

var logSchema = new mongoose.Schema({
	type:{type: String},
	productId:String,
	quantity:Number,
	remarks:String
},
{
  timestamps: true
}
);

// itemSchema.index({
// 	'productName':1,
// },{unique:true})

module.exports = mongoose.model('Record',logSchema);