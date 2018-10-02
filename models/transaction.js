var mongoose = require('mongoose');
var Logger = require('./../models/log');

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


transactionSchema.post('save',function(doc){
    // console.log("Function called with ",doc);
    Logger.findOneAndUpdate({},{$inc:{'allTimeSales':doc.costAfterDiscount}},{upsert:true}).then(doc=>{
        console.log('updated...',doc);
    })
})


module.exports = mongoose.model("Transaction",transactionSchema);