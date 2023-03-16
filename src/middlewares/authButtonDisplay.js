const jwt = require('jsonwebtoken');

/*
 * Middleware to display the appropriate authentication button based on the user's login state.
 * If the user is logged in, the home page and 404 error page will display a logout button on navbar.
 * If the user is not logged in, the home page and 404 error page will display login and register buttons on navbar.
*/

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