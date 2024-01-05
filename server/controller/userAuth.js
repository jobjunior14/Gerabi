const {promisify} = require('util');
const catchAssynch = require ('../utils/catchAssynch');
const AppError = require('../utils/AppError');
const User = require ('../models/userModel');
const jwt = require('jsonwebtoken');

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

exports.proctect = catchAssynch(async (req, res, next) => {

    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    };

    if (!token) {
        return next (new AppError ("Please logged in to get access", 401));
    };

    const decoder = await promisify(jwt.verify)(token, process.env.JWT_S);

    console.log (decoder);
    next();
});