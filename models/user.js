
const mongoose = require('mongoose');
var bcrypt = require('bcrypt');
const userSchema =  new mongoose.Schema({
    username : {type:String},
    password : {type:String},
    role: {type:Number,default:1}
});

var encrypt = str=>{
    return bcrypt.hash(str,1);
}

userSchema.pre('save',function(next){
    encrypt(this.password).then(h=>{
    	this.password = h ;
    	next();
    });
    
});

module.exports = mongoose.model("User",userSchema);