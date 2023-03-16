const jwt = require('jsonwebtoken');

/*
 * Middleware to prevent users from accessing the login or register page if they are already authenticated.
 * If the user is already logged in, they will be redirected to their dashboard.
 * If the user is not logged in, they will be able to access the login or register page.
*/
const preventAuthRedirect = async (req, res, next) => {
    const token = req.cookies.authcookie;

    try{
        jwt.verify(token, process.env.MY_SECRET)
        res.redirect('/profile');
    }
    catch(e){
        req.isLoggedIn = false;
        next();
    }
}

module.exports = preventAuthRedirect