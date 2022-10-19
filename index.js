 const mongoose = require("mongoose");
const URL = "mongodb+srv://bmsnimai:BMSNimai123@cluster0.jhpy8nd.mongodb.net/BMS?retryWrites=true&w=majority"
mongoose.connect(URL);

const express = require('express');
const app = express();

//middleware
const isBlog =require("./middlewares/isBlog");
app.use(isBlog.isBlog)

//admin routes
const admin_route = require('./routes/adminRoute');
app.use('/',admin_route)

app.listen(3000, ()=>{
    console.log("server is running");
})