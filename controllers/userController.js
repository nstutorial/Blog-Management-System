const User =require('../models/userModel');
const bcrypt = require('bcrypt');

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

module.exports ={
    loadLogin,
    verifyLogin,
    profile,
    logout
}