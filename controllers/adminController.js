const Blog_Setting=require("../models/blogSettingModel");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");

const securePassword = async(password)=>{
    try {
        const passwordHash = await bcrypt.hash(password,10);
        return passwordHash;
    } catch (error) {
        console.log(error.message);
    }
}


// const login = (req,res)=>{
//     res.send("Hi login Here")
// }


const blogSetup = async(req,res)=>{
   try {
    const blogSetting = await Blog_Setting.find({});
    if(blogSetting.length > 0){
        res.redirect("/login")
    }else{
        res.render('blogSetup')
    }
   } catch (error) {
    console.log(error.message);
   }
}
const blogSetupSave = async(req,res)=>{
    try {
       const blog_title = req.body.blog_title;
       const blog_image = req.file.filename;
       const description = req.body.description;
       const email = req.body.email;
       const name = req.body.name;
       const password = await securePassword(req.body.password);

       const BlogSetting = new Blog_Setting({
        blog_title:blog_title,
        blog_logo:blog_image,
        description:description,
       });
       await BlogSetting.save();

      const user = new User({
        name:name,
        email:email,
        password:password,
        is_Admin:1
       })
       const userData = await user.save();
       if(userData){
        res.redirect('/login');
       }else{
        res.render('blogSetup',{message:'Blog not setup properly!'});
       }
        
    } catch (error) {
        console.log(error.message);
    }

}

module.exports ={
    // login, 
    blogSetup,
    blogSetupSave
}