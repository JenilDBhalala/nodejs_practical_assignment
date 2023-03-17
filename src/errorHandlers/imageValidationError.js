
/**
 * Middleware function to handle image validation errors when uploading via Multer.
 * Checks whether the image is in the correct format (JPEG, PNG, JPG, WEBP) and throws an error if not.
 * Also Checks file size limit and throws an error if file size is larger
 */
const imageValidationErrorHandler = (error, req, res, next) => {
    return res.status(415).render('profile', {
        buffer : req.user.avatar,
        username : req.user.name,
        error: error.message 
    });
    // next()
}

module.exports = imageValidationErrorHandler;