const bodyParser = require('body-parser');
const express = require('express');
const user_route = express();

user_route.use(bodyParser.json());
user_route.use(bodyParser.urlencoded({extended:true}));

const session = require('express-session');
const config = require('../config/config')
user_route.use(session({secret:config.sessionSecret}));

user_route.set('view engine','ejs');
user_route.set('views','./views');

user_route.use(express.static('public'));

const userController = require("../controllers/userController");

user_route.get("/login",userController.loadLogin);

module.exports =user_route;