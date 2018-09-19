
const productController = require('./../controllers/productscontroller');
module.exports = function(router){
    router.route("/product/create").get(productController.create);
    router.route("/product/create").post(productController.doCreate);

    router.route('/product/add/:id').get(productController.addStock);
    router.route('/product/checkout/:id').get(productController.checkoutStock);
    router.route('/product/add/:id').post(productController.doAddStock);
    router.route('/product/checkout/:id').get(productController.doCheckoutStock);

    router.route('/product/all').get(productController.listProducts);
    router.route('/products/search').get(productController.searchProducts);


}