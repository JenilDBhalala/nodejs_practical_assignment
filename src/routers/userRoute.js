const express = require('express')
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middlewares/auth')

router.get('/login', userController.getLoginForm)
router.get('/register', userController.getRegisterForm)
router.get('/profile', auth, userController.getProfile)

router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.get('/logout', auth, userController.logoutUser);


module.exports = router;