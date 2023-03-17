const jwt = require('jsonwebtoken');
const User = require('../models/user')

/*
 * Middleware to check if the user is authenticated.
 * If the user is authenticated, the request will be passed to the next middleware.
 * If the user is not authenticated, they will be redirected to the login page.
*/
const authCheck = async (req, res, next) => {
    try {
        const token = req.cookies.authcookie;
        const decoded = jwt.verify(token, process.env.MY_SECRET)
        const user = await User.findOne({_id : decoded._id, 'tokens.token' : token});
        if(!user) {
            throw new Error();
        }

        req.user = user; 
        req.token = token;
        next();
    }
    catch(e){
        res.status(401).redirect('login');
    }
}

module.exports = authCheck