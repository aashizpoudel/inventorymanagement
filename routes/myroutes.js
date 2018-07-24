var Item = require('./../models/item');

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

    });
}