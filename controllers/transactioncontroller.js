const transactionController = {};
var Transaction = require('./../models/transaction');
var discountPercent = 0;

transactionController.create = function(req,res){
    if(req.body.items && req.body.receivedAmount){
        var totalCost = 0 ;
        for(item in items){
            totalCost += item.quantity* item.costPerUnit;
        }
        var discount = totalCost * discountPercent ;
        var costAfterDiscount = totalCost - discount;
        var receivedAmount = req.body.receivedAmount ;
        if(!costAfterDiscount <= receivedAmount){
            var change = receivedAmount - costAfterDiscount;
            Transaction.create({
                items:req.body.items,
                totalCost:totalCost,
                discount:discount,
                receivedAmount:receivedAmount,
                change:change,
                costAfterDiscount:costAfterDiscount,
            }).then((tr)=>{
                res.send(tr);
            }).catch(err=>{
                return next(err);
            })
        }
        else{
            return next(err);
        }
    }
}


transactionController.list = function(req,res){
    Transaction.find().then(r=>{
        res.send(r);
    })
}

module.exports = transactionController;