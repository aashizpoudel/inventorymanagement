var mongoose = require('mongoose');

var itemSchema = mongoose.Schema({
    itemId:String,
    costPerUnit:Number,
    quantity:Number,
});
var transactionSchema = mongoose.Schema({
    items:[itemSchema],
    totalCost:Number,
    discount:Number,
    costAfterDiscount:Number,
    receivedAmount:Number,
    change:Number,
    remarks:String
});

module.exports = mongoose.model("Transaction",transactionSchema);