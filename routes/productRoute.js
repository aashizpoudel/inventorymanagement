
const productController = require('./../controllers/productscontroller');
const transactionController = require('./../controllers/transactioncontroller');
module.exports = function(router){
    router.route("/product/create").get(productController.create);
    router.route("/product/create").post(productController.doCreate);

    router.route('/product/add/:id').get(productController.addStock);
    router.route('/product/checkout/:id').get(productController.checkoutStock);
    router.route('/product/add/:id').post(productController.doAddStock);
    router.route('/product/checkout/:id').get(productController.doCheckoutStock);

    router.route('/product/all').get(productController.listProducts);
    router.route('/products/search').get(productController.searchProducts);

    router.route('/transaction/create').post(transactionController.create);
    router.route('/transaction/list').get(transactionController.list);

    router.route('/api/product/:id').get(productController.findById);

}