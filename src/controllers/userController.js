const bcrypt = require('bcryptjs') 
const User = require('../models/user')

//renders login form
const getLoginForm = (req, res) => {
    res.render('login', {
        errorMessage : undefined
    });
}

//renders registration form
const getRegisterForm = (req, res) => {
    res.render('register');
}

//logout user : delete jwt token stored in cookie
const logoutUser = (req, res) => {
    res.clearCookie('authcookie');
    res.redirect('/login')
}

//renders user profile
const getProfile = (req, res) => {
    res.render('profile', {
        username : req.user.name
    });
}

//logic for perform registration
const registerUser = async(req, res) => {
    try{
        const user = await User.create({
            name : req.body.username,
            password : await bcrypt.hash(req.body.password,8),
            email : req.body.email
        })

        const token = await user.generateAuthToken();
        
        res.cookie('authcookie', token, 24*60*60);
        res.redirect('/profile');
    }
    catch(e){
        res.send(e)
    }
}

//logic for perform login
const loginUser = async(req, res) => {
    try{
        const user = await User.findOne({email : req.body.email});

        if(!user){
            return res.status(400).render('login', {
                error : 'Wrong email or password!'
            })
        }
        
        const match = await bcrypt.compare(req.body.password, user.password);

        if(!match){
            return res.status(400).render('login', {
                errorMessage : 'Wrong email or password!'
            })
        }

        const token = await user.generateAuthToken();
        
        res.cookie('authcookie', token, 24*60*60);
        res.redirect('/profile');
    }
    catch(e){
        console.log(e.message)
    }
}

module.exports = {
    getLoginForm,
    getRegisterForm,
    registerUser,
    loginUser,
    getProfile,
    logoutUser
}