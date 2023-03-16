const jwt = require('jsonwebtoken');
const User = require('../models/user')

//middleware function which checks whether user is authenticated or not
//and concate user and token with request object to use it into next middleware function
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
        res.status(400).redirect('login');
    }
}

module.exports = authCheck