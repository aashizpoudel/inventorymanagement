
const productController = require('./../controllers/productscontroller');
const transactionController = require('./../controllers/transactioncontroller');
module.exports = function(router){
    
 router.route('/transaction/create').post(transactionController.create);
    router.route('/transaction/list').get(transactionController.list);


    
}