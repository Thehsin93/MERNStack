const mongoose = require('mongoose');
const User = require("../models/usermodel")
const jwt = require("jsonwebtoken")
require("dotenv").config()
const createtoken = (_id)=>{
   return jwt.sign({_id},process.env.SECRET_KEY,{expiresIn:'3d'})
}

const login = async(req,res)=>{
    const {email,password} = req.body;
    try{
        const user = await User.login(email,password);
        const token = createtoken(user._id);
        res.status(200).json({email,token})
    }
    catch(e){
        res.status(200).json({error:e.message})
    }
  
}
const signup = async(req,res)=>{
    const {email,password} = req.body;
    try{
    const user =await User.signup(email,password);
    const token = createtoken(user._id);
    res.status(200).json({email,token})
    }
    catch(e){
        res.status(200).json({error:e.message})
    }
   
}

module.exports = {
    login,
    signup
}