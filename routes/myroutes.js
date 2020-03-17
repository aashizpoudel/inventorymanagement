var mongoose = require('mongoose');
var Item = mongoose.model('Item');

module.exports = function(router){
    router.use(function(req, res, next) {
		//  This console logging function can be saved to a file later.  
		//  For now it is for testing.
		console.log('Logger action');
		next(); 	 
    });
    
    router.route('/items/create')
    .get(function(req,res){
        res.render('create_item_form')
    })
    .post(function(req,res){
        console.log(req.body);
        Item.create({
	itemName:req.body.item_name,
	desc:req.body.description,
	uom:req.body.unit_type,
	cost:req.body.unit_cost,
        }).then((s)=>{
            console.log(s);
           // console.log('posted');
            res.render("create_item_form",{content:{type:'success',message:'Successfully created !!'}});
        }).catch((e)=>{
           
        })
        
    });

    router.route('/items/list').get(function(req,res){
        Item.find(function(err, inventoryItems) {
            if (err) {
                res.send(err);
            } 
            
            res.render('list_item',{contents:inventoryItems});
        });
    })
    
    router.route('/stock/add').get(function(req,res){
        res.render('add_stock_form');
    });
    
}