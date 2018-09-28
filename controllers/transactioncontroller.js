const transactionController = {};
var Transaction = require('./../models/transaction');
var discountPercent = 0;

transactionController.create = function(req,res){
   
    if(req.body.products && req.body.receivedAmount && req.body.products.length !== 0){
        var totalCost = 0 ;
        for(item of req.body.products){
           if((item.currentStock - item.quantity) <0)
           {
                       return res.send({success:false,message:'Quantity exceeds current stock of '+item.productName,additional:req.body});
           }
            totalCost += parseInt(item.quantity)* parseInt(item.cost);
        }
        var discount = totalCost * discountPercent ;
        var costAfterDiscount = totalCost - discount;
        var receivedAmount = parseInt(req.body.receivedAmount) ;
        if(costAfterDiscount <= receivedAmount){
            var change = receivedAmount - costAfterDiscount;
            Transaction.create({
                items:req.body.products,
                totalCost:totalCost,
                discount:parseInt(discount) || 0,
                receivedAmount:receivedAmount,
                change:change,
                costAfterDiscount:costAfterDiscount,
            }).then((tr)=>{
                for(x of tr.items){
                    
                }
                // return res.send({success:true,payload:tr});
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