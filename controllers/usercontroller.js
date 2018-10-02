const userController = {} ;
const bcrypt = require('bcrypt');
const User = require('./../models/user');

userController.doLogin = function(req,res){
	let id = 0 ;
	if(req.body.username && req.body.password){
		User.findOne({username:req.body.username}).then(doc=>{
			// console.log(doc);
			id=doc._id ;
			return bcrypt.compare(req.body.password,doc.password);
		}).then(r=>{
			if(r){
				req.session.authenticated = true;
				req.session.user = id;
				res.redirect('/')
			}else{
				throw Error("incorrect credentials");
			}
		}).catch(err=>{
			console.log(err);
			res.send('error');
		})
	}
}


userController.login = function(req,res){
	res.render('pages/login.html');
}
module.exports = userController ;