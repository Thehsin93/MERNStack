const mongoose = require("mongoose");
const schema = mongoose.Schema;
const bcrypt = require ('bcrypt')
const validator = require('validator');
const userschema = new schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
},{timestamps:true})
userschema.statics.login = async function(email,pass){
    if(!email || !pass)
        throw Error("All fields must be filled");
    const user = await this.findOne({email});
    if(!user)
        throw Error("User does not exist");
    const match = await bcrypt.compare(pass,user.password);
    if(!match)
        throw error("Incorrect password")
    return user;
}
userschema.statics.signup = async function(email,pass){
    if(!email || !pass)
        throw Error("All fields must be filled");
    if(!validator.isEmail(email))
        throw Error("Email is not valid");
    if(!validator.isStrongPassword(pass))
        throw Error("Please enter a strong password");
    const exists = await this.findOne({email});
    if(exists)
        throw Error("Email already in use");
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(pass,salt);
    const user = await this.create({email,password:hash});
    return user;
}

module.exports = mongoose.model('user',userschema)