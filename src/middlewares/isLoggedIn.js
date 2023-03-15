const jwt = require('jsonwebtoken');

//middleware function which checks whether user is authenticated or not
const isLoggedIn = async (req, res, next) => {
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

module.exports = isLoggedIn