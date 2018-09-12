var Record = require('./../models/Record');
module.exports = function(router){
    router.use(function(req, res, next) {
		//  This console logging function can be saved to a file later.  
		//  For now it is for testing.
// 		console.log('Logger action');
		next(); 	 
    });
    
    router.route('/records/list')
    .get(function(req,res){
        Record.find()
        .then(products=>{
            res.send(products);
        })
        .catch(err=>{
            res.send('error');
        });
    })
}