// var mongoose = require('mongoose');

var Product = require('./../models/Product');
var Record = require('./../models/Record');
module.exports = function(router){
    router.use(function(req, res, next) {
		//  This console logging function can be saved to a file later.  
		//  For now it is for testing.
// 		console.log('Logger action');
		next(); 	 
    });
    
    router.route('/product/create')
    .get(function(req,res){
        res.render('pages/create_product')
    })
    .post(function(req,res){
        // console.log(req.body);
        Product.create({
	productName:req.body.product_name,
	desc:req.body.description,
	uom:req.body.unit_type,
	cost:req.body.unit_cost,
	currentStock:req.body.initial_stock,
        }).then((s)=>{
            // console.log(s);
           // console.log('posted');
            res.render("pages/create_product",{content:{type:'success',message:'Successfully created !!'}});
        }).catch((e)=>{
        res.render("pages/create_product",{content:{type:'error',message:e}});

        })
        
    });

    router.route('/product/all').get(function(req,res){
        Product.find(function(err, inventoryItems) {
            if (err) {
                res.send(err);
            } 
            
            res.render('pages/list_products.html',{contents:inventoryItems});
        });
    })
    
    
    router.route('/products/clear').get(function(req,res){
        Product.remove({}).then(a=>{
           res.send('done deleton'); 
        }).catch(co=>{
            console.log(co);
        });
    });
    
    
    router.route('/product/add/:id').get(function(req,res){
        Product.findById(req.params.id)
        .then(products =>{res.render('pages/add_product.html',{contents:products});})
        
    });
    
    router.route('/api/products/search/:searchtext').get(function(req,res){
        Product.find({
            'productName': new RegExp(req.params.searchtext, 'i') } ,'productName')
  .then(products => {console.log(products);
  res.send(products);}
  )
  .catch(e => console.error(e));
    })
    
    
    router.route('/api/product/:id').get(function(req,res){
        Product.findById(req.params.id)
  .then(products => {console.log(products);
  res.send(products);}
  )
  .catch(e => console.error(e));
    })
    .post(function(req,res){
        
    })
    .put(function(req,res){
        Product.findById(req.params.id).then(product=>{
        //    if(req.body.action=='add'){
                var toAdd = parseInt(req.body.payload) ;
                
                if(req.body.action =='add')      
                product.currentStock += toAdd;
                else if(req.body.action=='subtract')
                product.currentStock -=toAdd;
                
                createRecord({type:'addStock',productId:product._id,quantity:toAdd,remarks:"Added By Api"})
                product.save();
                res.send({message:"Successfully added",content:product});
           
            
        })
        
        
    }).delete(function(req,res){
            Product.findByIdAndRemove(req.params.id).then(product=>{
                res.send({message:'Successfully Deleted!!',content:product});
            })
        })
    
}


function createRecord(payload){
    Record.create(payload);
}