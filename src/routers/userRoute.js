const express = require('express')
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middlewares/auth')
const isLoggedIn = require('../middlewares/isLoggedIn')

router.get('/', isLoggedIn,userController.getHomePage)
router.get('/login', isLoggedIn, userController.getLoginForm)
router.get('/register', isLoggedIn, userController.getRegisterForm)
router.get('/profile', auth, userController.getProfile)

router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.get('/logout', auth, userController.logoutUser);
router.get('*', isLoggedIn, userController.get404Page)


module.exports = router;