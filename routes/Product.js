// var mongoose = require('mongoose');
var url =require('url');
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
        Product.paginate({},{
            page:req.query.page || 1,
            limit: 10,
            sort: 'productName'
        }).then(products=>{
            return res.render('pages/list_products.html',{...products,url:req});
        }).catch(err=>{
            return res.send('error');
        })
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
        
    })
    .post(function(req,res){
       Product.findById(req.params.id).then(products=>{
        //   console.log(req.body);
        var toAdd = parseInt(req.body.toAdd);
           products.currentStock += toAdd;
           products.save();
           createRecord({type:'add',productId:products._id,quantity:toAdd,remarks:"Added By Api"})
                
           res.render('pages/add_product.html',{contents:products,message:'Successfully Added'});
       }).catch(err =>{
           res.send('error occured!!');
       })
    });
    
    
        router.route('/product/checkout/:id').get(function(req,res){
        Product.findById(req.params.id)
        .then(products =>{res.render('pages/remove_product.html',{contents:products});})
        
    })
    .post(function(req,res){
       Product.findById(req.params.id).then(products=>{
        var toRemove = parseInt(req.body.toRemove);

        //   console.log(req.body);
        if(toRemove >= products.currentStock){
            throw Error("Can't do it");
        }
           products.currentStock -= toRemove;
           products.save();
           createRecord({type:'checkout',productId:products._id,quantity:toRemove,remarks:"Removed By Api"})
                
           res.render('pages/remove_product.html',{contents:products,message:'Successfully Removed'});
       }).catch(err =>{
           res.send('error occured!!');
       })
    });
    
} 
   
function createRecord(payload){
    Record.create(payload);
}