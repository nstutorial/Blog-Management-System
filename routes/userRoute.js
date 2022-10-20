const bodyParser = require('body-parser');
const express = require('express');
const user_route = express();

user_route.use(bodyParser.json());
user_route.use(bodyParser.urlencoded({extended:true}));

user_route.set('view engine','ejs');
user_route.set('views','./views');

user_route.use(express.static('public'));

user_route.get("/",(req,res)=>{
    res.send("USER ROUTE")
})

module.exports =user_route;