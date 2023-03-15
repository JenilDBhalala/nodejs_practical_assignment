const jwt = require('jsonwebtoken');
const User = require('../models/user')

//middleware function which checks whether user is authenticated or not
const auth = async (req, res, next) => {
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
        res.render('login', {
            errorMessage : "Session Expired!, Please Authenticate!"
        });
    }
}

module.exports = auth