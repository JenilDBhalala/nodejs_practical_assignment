const { Upload } = require('antd');
const express = require('express')
const router = express.Router();
const userController = require('../controllers/userController');
const authCheck = require('../middlewares/authCheck')
const authButtonDisplay = require('../middlewares/authButtonDisplay')
const preventAuthRedirect = require('../middlewares/preventAuthRedirect')
const upload = require('../middlewares/upload')
const errorHandler = require('../errorHandling/errorHandler')

router.get('/', authButtonDisplay,userController.getHomePage)
router.get('/login', preventAuthRedirect, userController.getLoginForm)
router.get('/register', preventAuthRedirect, userController.getRegisterForm)
router.get('/profile', authCheck, userController.getProfile)
router.post('/profile', authCheck, upload.single('avatar'), userController.uploadProfilePicture, errorHandler)

router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.get('/logout', authCheck, userController.logoutUser);
router.get('/avatar', authCheck, userController.getProfileImage)
router.get('*', authButtonDisplay, userController.get404Page)



module.exports = router;