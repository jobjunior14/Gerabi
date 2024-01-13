const {promisify} = require('util');
const catchAssynch = require ('../utils/catchAssynch');
const AppError = require('../utils/AppError');
const User = require ('../models/userModel');
const jwt = require('jsonwebtoken');
const { response } = require('express');

const signToken = id => {
    return jwt.sign({id}, process.env.JWT_S, {expiresIn: process.env.EXPIRE_IN});   
}
exports.signup = catchAssynch ( async (req, res) => {

    const user = await User.find ();

    if (user.length === 0) {
        const newUser = await User.create({name: req.body.name, email: req.body.email, password: req.body.password, confirmPassword: req.body.confirmPassword});

        const token = signToken(newUser._id);
        res.status(200).json({
            status: 'success',
            token: token,
            data: newUser
        });

    } else {
        res.status(500).json({
            status: 'error',
            data: "Cette Application ne peut avoir plus d'un seul compte"
        });
    };
});

exports.login = catchAssynch (async (req, res, next) => {

    const {email, password} = req.body;

    if (!email || !password) {
        return next(new AppError('Please Provide an Email or Password', 400));
    };

    const user = await User.findOne({email}).select('+password');

    const correctPassword = await user?.confirmTapedPassword(password, user.password);

    if (!user || !correctPassword) {
        return next (new AppError('Email ou mot de passe ivalide', 401));
    };

    const token = signToken(user._id);
    res.status(200).json({
        status: 'success',
        token,
    })
})
exports.updateUser = catchAssynch(async (req, res, next) => {

    const user =  await User.find();
    /////upcoming
    
});

exports.protect = catchAssynch(async (req, res, next) => {

    let token;

    //Check if the toke exists in the headers
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    };

    //if not return an error (the token)
    if (!token) {
        return next (new AppError ("Please logged in to get access", 401));
    };

    //check if the token has a valid signature ( if not it returns a false value)
    const decoder = await promisify(jwt.verify)(token, process.env.JWT_S);

    //check if the user still exxist in the database
    const existsUser = await User.findById(decoder.id);
     
    if (!existsUser) {
        return next (new AppError("This user does not belong to this token, please login and try again."));
    };

    //check if the user has already changed it password
    if (existsUser.changePasswordAfterIsued(decoder.iat)) {
        return next (new AppError("This user has already changed their password, please try again.", 401 ));
    }; 

    //put the user information in the request object
    req.user = existsUser;

    next();
});

exports.forgetPassword = catchAssynch (async (req, res, next) => {

    const user = await User.findOne({email: req.body.email});

    if (!user) {
        return next(new AppError("There is no user with that mail", 404));
    };

    const resetToken = user.createPasswordResetToken();

    await user.save({validateBeforeSave: false});

    res.status(200).json({
        resetToken
    });
     
});

exports.resetPassword = catchAssynch ( async (req, res, next) => {


});