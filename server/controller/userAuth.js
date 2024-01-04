const catchAssynch = require ('../utils/catchAssynch');
const AppError = require('../utils/AppError');
const User = require ('../models/userModel');
const jwt = require('jsonwebtoken');

exports.signup = catchAssynch ( async (req, res) => {

    const user = await User.find ();

    if (user.length === 0) {
        const newUser = await User.create({name: req.body.name, email: req.body.email, password: req.body.password, confirmPassword: req.body.confirmPassword});

        const token = jwt.sign({id: newUser._id}, process.env.JWT_S, {expiresIn: process.env.EXPIRE_IN});   
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
        return next(new AppError('Please Provide an Email or Password', 404));
    };

    const user = await User.findOne({email});

    const token = '';
    res.status(200).json({
        status: 'success',
        token,
        user
    })
})
exports.updateUser = catchAssynch(async (req, res, next) => {

    const user =  await User.find();
    /////upcoming
    
});