const {promisify} = require('util');
const catchAssynch = require ('../utils/catchAssynch');
const User = require ('../models/userModel');
const jwt = require('jsonwebtoken');
const AppError = require('../utils/AppError');
const sendEmail = require('../utils/email');
const { sign } = require('crypto');

const signToken = id => {
    return jwt.sign({id}, process.env.JWT_S, {expiresIn: process.env.EXPIRE_IN});   
};

const tokenSender = (statusCode, user, res ) => {
    const token = signToken(user._id);

    res.status(statusCode).json({
        status: 'success',
        token: token,
        data: user
    });
    
}
exports.signup = catchAssynch ( async (req, res) => {

    const user = await User.find ();

    if (user.length === 0) {
        const newUser = await User.create({name: req.body.name, email: req.body.email, password: req.body.password, confirmPassword: req.body.confirmPassword});

        tokenSender(200, newUser, res);

    } else {
        return next (new AppError("Cette Application ne peut avoir plus d'un seul compte", 404))
    };
});

exports.login = catchAssynch (async (req, res, next) => {

    const {email, password} = req.body;

    if (!email || !password) {
        return next(new AppError('Please Provide an Email or Password', 400));
    };

    const user = await User.findOne({email}).select('+password');

    const correctPassword = await user?.confirmTapedPassword(password, user.password);
    console.log(correctPassword)
    if (!user || !correctPassword) {
        return next (new AppError('Email ou mot de passe invalide', 401));
    };

    //put some information in the request object
    req.loggedIn = true;
    tokenSender(200, user, res);

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

    //get the user based on the POSTED email
    const user = await User.findOne({email: req.body.email});

    if (!user) {
        return next(new AppError("There is no user with that mail", 404));
    };

    //generate the random reset token 
    const resetToken = user.createPasswordResetToken();
    await user.save({validateBeforeSave: false});

    //send the reset url and the token to the user's email
    const resetURL = `${req.protocol}://${req.get('host')}/api/v1/resetPassword/${resetToken}`

    const message = `Forget password?  Please provide your new password to: ${resetURL}.\n Thanks to do not share the link and your new password 
    and if you did't forget your password ignore this email.`
    
    try { 
        await sendEmail({
            email: user.email,
            subject: 'Your password reset link (VALID FOR 10 MIN) ',
            message
        });
    
        res.status(200).json({
            statusbar: 'success',
            message: 'Token Sent to  email',
        });
    } catch (error) {
        user.passwrdResetToken = undefined;
        user.passwordResetExpires = undefined;
        await user.save({validateBeforeSave: false});

        return next (new AppError('There was an error sending the Email. Try Again Later!', 500));
    };
});

exports.resetPassword = catchAssynch ( async (req, res, next) => {


});

exports.updatePassword = catchAssynch ( async (req, res, next) => {


    //get the user from the collection 
    const user = await User.findById(req.user.id).select("+password");

    //check if the posted password is correct
    if (!req.body.oldPassword || !req.body.newPassword || !req.body.newConfirmPassword) {
        return next ( new AppError('Please Provide all field',404));
    }
    const confirmPassword = await user?.confirmTapedPassword(req.body.oldPassword, user.password);

    if (!confirmPassword) {
        return next ( new AppError('Please Provide a valid ancient Password to set a new One', 400));
    };

    user.password = req.body.newPassword, 
    user.confirmPassword = req.body.newConfirmPassword
    
    await user.save();
    
    tokenSender(200, user, res);


});