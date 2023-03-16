const errorHandler = (error, req, res, next) => {
    return res.status(415).render('profile', {
        buffer : req.user.avatar,
        username : req.user.name,
        error: error.message 
    });
    // next()
}

module.exports = errorHandler;