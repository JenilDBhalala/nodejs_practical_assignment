const jwt = require('jsonwebtoken');

//middleware function which checks whether user is logged in or not
//if logged in then navbar will change to home page and 404 page 
const authButtonDisplay = async (req, res, next) => {
    const token = req.cookies.authcookie;

    try{
        jwt.verify(token, process.env.MY_SECRET)
        req.isLoggedIn = true;
    }
    catch(e){
        req.isLoggedIn = false;
    }
   
    next();
}

module.exports = authButtonDisplay