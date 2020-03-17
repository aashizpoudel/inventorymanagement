

var Product = require('./../models/product');
var Record = require('./../models/record');

function createRecord(payload) {
    Record.create(payload);
}



// var mongoose = require('mongoose');

var productController = {};

productController.create = function (req, res) {
    res.render('pages/create_product.html');
}

productController.doCreate = function (req, res) {

    // console.log(req.body);
    Product.create({
        productName: req.body.product_name,
        desc: req.body.description,
        uom: req.body.unit_type,
        cost: req.body.unit_cost,
        currentStock: req.body.initial_stock,
    }).then((s) => {
        // console.log(s);
        // console.log('posted');
        res.render("pages/create_product", { content: { type: 'success', message: 'Successfully created !!' } });
    }).catch((e) => {
        res.render("pages/create_product", { content: { type: 'error', message: e } });

    })

}


productController.register = function (req, res) {
    res.render('pages/create_product');
}

productController.doRegister = function (req, res) {
    Product.create({
        productName: req.body.product_name,
        desc: req.body.description,
        uom: req.body.unit_type,
        cost: req.body.unit_cost,
        currentStock: req.body.initial_stock,
    }).then((s) => {
        // console.log(s);
        // console.log('posted');
        res.render("pages/create_product", { content: { type: 'success', message: 'Successfully created !!' } });
    }).catch((e) => {
        res.render("pages/create_product", { content: { type: 'error', message: e } });

    })

}

productController.listProducts = function (req, res) {
    Product.paginate({}, {
        page: req.query.page || 1,
        limit: 10,
        sort: 'productName'
    }).then(products => {
        return res.render('pages/list_products.html', { ...products, url: req });
    }).catch(err => {
        return res.send('error');
    })
}

productController.doAddStock = function (req, res) {
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
};

productController.checkoutStock = function (req, res,next) {
    Product.findById(req.params.id)
        .then(products =>{res.render('pages/remove_product.html',{contents:products});})
        .catch(err=>next(err));
}

productController.addStock = function (req, res) {
    Product.findById(req.params.id)
        .then(products =>{res.render('pages/add_product.html',{contents:products});})
        .catch(err=>next(err));
}

productController.doCheckoutStock = function (req, res) {
    Product.findById(req.params.id).then(products => {
        var toRemove = parseInt(req.body.toRemove);

        //   console.log(req.body);
        if (toRemove >= products.currentStock) {
            throw Error("Can't do it");
        }
        products.currentStock -= toRemove;
        products.save();
        createRecord({ type: 'checkout', productId: products._id, quantity: toRemove, remarks: "Removed By Api" })

        res.render('pages/remove_product.html', { contents: products, message: 'Successfully Removed' });
    }).catch(err => {
        res.send('error occured!!');
    })
}

productController.searchProducts = function (req, res) {
    Product.find({ productName: new RegExp(req.query.q) }).lean().then(products => {
        return res.render('pages/list_products.html', { docs: products, url: req, total: products.length, page: 1, pages: 1, searchResult: { text: req.query.q } });
    }).catch(error => {
        return res.send("ERROR");
    })
}

productController.findById = function(req,res){
    // console.log(req.params.id);
    Product.find({productId:req.params.id}).lean().then(products=>{
        // console.log(products);
        return res.send(products);
    }).catch(error=>{
        return res.send({"error":error});
    })
};

productController.findProductById = function(req,res){
    // console.log(req.params.id);
    Product.find({productId:req.query.q}).lean().then(products=>{
        return res.render('pages/list_products.html', { docs: products, url: req, total: products.length, page: 1, pages: 1, searchResult: { text: req.query.q } });
    }).catch(error=>{
        return res.send({"error":error});
    })
};



module.exports = productController;