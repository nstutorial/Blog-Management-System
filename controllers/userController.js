
const loadLogin =(req,res)=>{
    try {
        res.render('login');
    } catch (error) {
        console.log(error.message);
    }
}


module.exports ={
    loadLogin
}