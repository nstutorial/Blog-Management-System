const mongoose = require("mongoose");

const blogSettingSchema =mongoose.Schema({
    blog_title:{
        type:String,
        require:true
    },
    blog_logo:{
        type:String,
        require:true
    },
    blogdescription:{
        type:String,
        require:true
    },
    
});
module.exports =mongoose.model("BlogSetting",blogSettingSchema);