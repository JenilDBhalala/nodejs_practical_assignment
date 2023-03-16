const multer = require('multer')

//multer instance
const upload = multer({
    limits : {
        fileSize : 1000000,
    },
    fileFilter(req, file, cb){
        const whitelist = [
            'image/jpg',
            'image/jpeg',
            'image/png',
            'image/webp',
        ]

        if (!whitelist.includes(file.mimetype)) {
            return cb(new Error("Please upload a valid image file!"), undefined);
        }
        cb(undefined, true);
    }
})

module.exports = upload;