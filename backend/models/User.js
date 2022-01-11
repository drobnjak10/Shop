const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    username: { type: String, required: [true, "Please enter your name."], trim: true, lowercase: true },
    email: {
        type: String, 
        required: true, 
        unique: [true, "User with this email already exist."], 
        lowercase: true, 
        validate: [validator.isEmail, "Please Enter a valid Email"],
    },
    password: { type: String, required: true, trim: true, min: [8, "Password must contain minimum 8 characters."] },
    role: { type: String, enum: ['admin', 'user'], required: true, default: 'user' }
});

userSchema.methods.getJwtToken = async function () {
    const user = this;
    
    const token = await jwt.sign({ _id: user._id, role: user.role, username: user.username }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE });

    return token;
}

userSchema.pre('save', async function (next) {
    const user = this;

    if (!user.isModified('password')) {
        next()
    }

    user.password = await bcrypt.hash(user.password, 10);
})

const User = mongoose.model('User', userSchema);

module.exports = User;