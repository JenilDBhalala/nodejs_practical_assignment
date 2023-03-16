const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        trim: true,
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
    avatar : {
        type : Buffer
    }
});


userSchema.methods.generateAuthToken = async function () {
    const user = this;
    const token = jwt.sign({ _id: user._id.toString() }, process.env.MY_SECRET);
    user.tokens = user.tokens.concat({token});
    await user.save();
    return token;
}

const User = mongoose.model('User', userSchema);
module.exports = User