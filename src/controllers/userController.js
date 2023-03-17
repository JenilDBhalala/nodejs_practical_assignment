const bcrypt = require('bcryptjs') 
const User = require('../models/user')
const sharp = require('sharp')


//renders login form
const getLoginForm = (req, res) => {
    res.render('login', {
        errorMessage : undefined,
        oldInput : {
            email : ''
        }
    });
}

//renders registration form
const getRegisterForm = (req, res) => {
    res.render('register',{
        errorMessage : undefined,
        oldInput : {
            email : '',
            username : ''
        }
    });
}


//logout user : delete jwt token stored in cookie
const logoutUser = (req, res) => {
    res.clearCookie('authcookie');
    res.redirect('/login')
}


//renders user profile
const getProfile = (req, res) => {
    res.render('profile', {
        buffer : req.user.avatar,
        username : req.user.name,
        error : undefined
    });
}


//renders to homepage 
const getHomePage = (req, res) => {
    res.render('home',{
        username : req.isLoggedIn ? req.isLoggedIn : undefined
    });
}


//renders 404 page
const get404Page = (req, res) => {
    res.render('404',{
        username : req.isLoggedIn ? req.isLoggedIn : undefined
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
        
        //storing jwt token into cookie
        res.cookie('authcookie', token, {
            maxAge: 24*60*60*1000,
            httpOnly : true
        });
        res.redirect('/profile');
    }
    catch(e){
        res.status(409).render('register', {
            errorMessage : "Email already exists, Please Login!",
            oldInput : {
                email : req.body.email,
                username : req.body.username
            }
        })
    }
}

//logic for perform login
const loginUser = async(req, res) => {
    try{
        const user = await User.findOne({email : req.body.email});

        if(!user){
            return res.status(400).render('login', {
                errorMessage : 'Wrong email or password!',
                oldInput : {
                    email : req.body.email
                }
            })
        }
        
        const match = await bcrypt.compare(req.body.password, user.password);

        if(!match){
            return res.status(400).render('login', {
                errorMessage : 'Wrong email or password!',
                oldInput : {
                    email : req.body.email
                }
            })
        }

        const token = await user.generateAuthToken();
        
        //storing jwt token into cookie
        res.cookie('authcookie', token, {
            maxAge: 24*60*60*1000,
            httpOnly : true
        });
        res.redirect('/profile');
    }
    catch(e){
        console.log(e.message)
    }
}


//uploading profile picture
const uploadProfilePicture = async (req, res) => {
    try{
        const buffer = await sharp(req.file.buffer).resize({width:250, height:250}).png().toBuffer();
        req.user.avatar = buffer;
        await req.user.save();
        res.render('profile', {
            buffer, 
            username : req.user.name,
            error : undefined
        })
    }
    catch(e){
        res.render('profile', {
            buffer : req.user.avatar,
            username : req.user.name,
            error : "Please choose image!"
        })
    }   

}


module.exports = {
    getLoginForm,
    getRegisterForm,
    registerUser,
    loginUser,
    getProfile,
    logoutUser,
    getHomePage,
    get404Page,
    uploadProfilePicture,
}