var User  = require('./../models/user');


var auth = function(req,res,next){
	if(req.path.includes('/dictionary')){
		return next();
	}

	if(req.session.authenticated){
		if(req.path == '/login'){
			res.redirect('/');
		}
		User.findById(req.session.user).then(doc=>{
			res.locals.user = doc.username ;
			next();
		})
	}else{
		if(req.path != '/login')
			res.redirect('/login');

		next() ;
	}
}

module.exports = auth ;