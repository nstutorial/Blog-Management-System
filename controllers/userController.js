const User =require('../models/userModel');
const bcrypt = require('bcrypt');

const nodemailer = require("nodemailer");
const randomstring = require("randomstring");
const config = require("../config/config");

const sendResetPasswordMail = async(re,res)=>{
    try {
     const transport =  nodemailer.createTransport({
        host:'smtp.gmail.com',
        port:587,
        secure:false,
        requireTLS:true,
        auth:{
            user:config.emailUser,
            pass:config.emailPassword
        }
       }); 

       const mailOption ={
        from:config.emailUser,
        to:email,
        subject:'Reset Password',
        html:'<p>Hi '+name+',Plesa Check here to <a href="http://localhost:3000/reset-password?token='+token+'">Reset</a>your password'
        
       }
       transport.sendMail(mailOption,function(error,info){
        if(error){
            console.log(error);
        }else{
            console.log("Email sent successfully:-", info.response);
        }
       })
    } catch (error) {
        console.log(error.message);
    }
}

const loadLogin =async(req,res)=>{
    try {
       // const userData = await User.findOne({email:req.body.email});
      //  if(userData){
      //      console.log(userData);
       //     res.send("Ok")
      //  }
        res.render('login');
    } catch (error) {
        console.log(error.message);
    }
}

const verifyLogin =async(req,res)=>{
    try {
        const email = req.body.email;
        const password = req.body.password;
        const userData = await User.findOne({email:email});
        if(userData){
          // console.log(userData);
           const passwordMatch = await bcrypt.compare(password,userData.password);
           if(passwordMatch){            
            req.session.user_id = userData._id;
            req.session.is_admin = userData.is_Admin;
            
            if(userData.is_Admin == 1){
                res.redirect('/dashboard');
            }else{
                res.redirect('/profile');
            }
           }else{
            res.render('login',{message:"Email & Password is incorrect"});
           }

        }else{
            res.render('login',{message:"Email & Password is incorrect"});
        }
        
    } catch (error) {
      console.log(error.message);  
    }

}
const profile =()=>{
    try {
        res.send('Hi this is Profile')
    } catch (error) {
        console.log(error.message);
    }
}
const logout =async(req,res)=>{
    try {
        await req.session.destroy();
        res.redirect('/login');
    } catch (error) {
        console.log(error.message);
    }
}

const forgetLoad =async(req,res)=>{
    try {
        res.render('forget-passwrd');
    } catch (error) {
        console.log(error.message);
    }
}
const forgetPasswordVerified =async(req,res)=>{
    try {
       const email = req.body.email;
      const userData = User.findOne({email:email})
      if(userData){
       const randomstring = randomstring.generate();
      await User.updateOne({email:email},{$set:{ token:randomstring}});
      sendResetPasswordMail(userData.name,userData.email,randomstring);
      res.render('forget',{message:"Plesae Check Your mail to reset your password"})
      }else{
        res.render('forget',{message:"User Email is incorrect"});
      }
    } catch (error) {
        console.log(error.message);
    }
}
module.exports ={
    loadLogin,
    verifyLogin,
    profile,
    logout,
    forgetLoad,
    forgetPasswordVerified
}