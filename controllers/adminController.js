const BlogSetting = require("../models/blogSettingModel");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");


const login = (req,res)=>{
    res.send("Hi login Here")
}


const blogSetup = async(req,res)=>{
   try {
    const blogSetting = await BlogSetting.find({});
    if(blogSetting.length > 0){
        res.redirect("/login")
    }else{
        res.render('blogSetup')
    }
   } catch (error) {
    console.log(error.message);
   }
}

module.exports ={
    login, 
    blogSetup
}