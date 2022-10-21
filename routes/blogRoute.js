const express = require('express');
const blog_route = express();

blog_route.set('view engine','ejs');
blog_route.set('views','./views');

blog_route.use(express.json());
blog_route.use(express.static('public'));

const blogController = require('../controllers/blogController');
blog_route.get('/',blogController.loadBlog);

module.exports = blog_route;