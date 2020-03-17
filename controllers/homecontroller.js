const homeController = {};
var Product = require('./../models/product');
var Transaction = require('./../models/transaction');
var Logger = require('./../models/log');

homeController.home = function(req,res){
	let lowStock = {};
	let lastTransactions = {};
	let allTimeCost = 0;

	Product.find({currentStock:{$lte:80}}).sort({currentStock:1}).then(products=>{
		lowStock = products ;
	}).then(()=>{
		return Transaction.find({}).limit(10) ;
	}).then(tr=>{
		lastTransactions = tr;
		// console.log(lastTransactions);
		return Logger.findOne({});
		// res.render('pages/index.html',{lowStock:lowStock,lastTransactions:tr});
	}).then((daa)=>{
		console.log(daa);
		if(daa){
			allTimeCost = daa.allTimeSales ;
		}

	}).then(()=>{
		
		// console.log('bfore rendering',lastTransactions,lowStock,allTimeCost);
		return res.render('pages/index.html',{lowStock:lowStock,lastTransactions:lastTransactions,allTimeCost:allTimeCost});

	}).catch(ex=>{
		console.log(ex);
	})
}


homeController.logout =  function(req,res){
	req.session.authenticated = false ;
	res.redirect('/');
}
module.exports = homeController;