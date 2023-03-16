const multer = require('multer')

//multer instance
const upload = multer({
    limits : {
        fileSize : 1000000,
    },
    fileFilter(req, file, cb){
        if (!file.originalname.match(/\.(png|jpg|jpeg|webp)$/)) {
            return cb(new Error("Please upload a valid image file!"));
        }
        cb(undefined, true);
    }
})

module.exports = upload;