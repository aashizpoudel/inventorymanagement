
const userController = require('./../controllers/usercontroller');
module.exports = function(router){
    router.route("/login").get(userController.login);
    
        router.route("/login").post(userController.doLogin);

}