const transactionController = {};
var Transaction = require('./../models/transaction');
var discountPercent = 0;
var Product = require('./../models/product');
var async = require('async');

transactionController.create = function(req,res){
   
    if(req.body.products && req.body.receivedAmount && req.body.products.length !== 0){
        var totalCost = 0 ;
        var items = [];
        for(item of req.body.products){
           if((item.currentStock - item.quantity) <0)
           {
                       return res.send({success:false,message:'Quantity exceeds current stock of '+item.productName,additional:req.body});
           }
           items.push({itemId:item.productId,quantity:item.quantity,costPerUnit:item.cost});
            totalCost += parseInt(item.quantity)* parseInt(item.cost);
        }
        var discount = totalCost * discountPercent ;
        var costAfterDiscount = totalCost - discount;
        var receivedAmount = parseInt(req.body.receivedAmount) ;
        if(costAfterDiscount <= receivedAmount){
            var change = receivedAmount - costAfterDiscount;
            Transaction.create({
                items:items,
                totalCost:totalCost,
                discount:parseInt(discount) || 0,
                receivedAmount:receivedAmount,
                change:change,
                costAfterDiscount:costAfterDiscount,
            }).then((tr)=>{
                async.each(tr.items,function(item,callback){
                    Product.findOneAndUpdate({'productId':item.itemId},{$inc:{'currentStock':-1*parseInt(item.quantity)}},function(err,doc){
                        if(err){
                            console.log(err);
                            return callback(err);
                        }else{
                            // console.log(doc);
                            return callback();
                        }
                    })
                },function(err){
                    if(err)
                        console.log(err);
                    else
                        {
                            res.send({success:true});
                        }
                })
            }).catch(err=>{
                return res.send({success:false,message:err.message});
            })
        }
        else{
            return res.send({success:false,message:"Total cost exceeds received amount",additional:req.body});
        }
    }else{
        return res.send({success:false,message:"malformed object",additional:req.body});
    }
}


transactionController.list = function(req,res){
    Transaction.find({}).then(r=>{
        res.send(r);
    })
}


module.exports = transactionController;