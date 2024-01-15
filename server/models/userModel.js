const mongoose = require ('mongoose');
const crypto = require ('crypto');
const validator = require ('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema ({

    name: {

        type: String,
        require: true
    },

    email: {
        
        type: String,
        unique: true,
        require: true,
        lowercase: true,
        validate: [validator.isEmail, "Veillez fournir une adresse mail Valide"]
    },

    password: {
        type: String,
        require: [true, "vous devrez mettre un Mot de pass"],
        select: false,
    },

    confirmPassword: {

        type: String,
        require: [true, 'Les mots de passe ne se ressemble pas'],
        //THIS WILL WORK ONLY ON SAVE
        validate: {
            validator : function (el) {
                return el === this.password;
            }
        }
    },

    passwordChangedAt: Date,
    passwrdResetToken: String,
    passwordResetExpires: Date
});

userSchema.pre ('save', async function (next){
    if (!this.isModified('password')) return next();

    //hash the password with the cost of twelve
    this.password = await bcrypt.hash(this.password, 12);

    //delete the confirm password and set it to undefined
    this.confirmPassword = undefined;

    //then pass to the next milddleware 
    next();

});

//compare the taper password and the saved (hashed) password
userSchema.methods.confirmTapedPassword = function (tapedPassword, userPassword) {

    return bcrypt.compare(tapedPassword, userPassword);
};

userSchema.methods.changePasswordAfterIsued = function (JWTTimestamp) {

    if (this.passwordChangedAt) {
        const changedTimestamp = parseInt (this.passwordChangedAt.getTime() / 1000, 10);

        console.log (this.passwordChangedAt)
        return JWTTimestamp < changedTimestamp;
    }
};

userSchema.methods.createPasswordResetToken = function () {

    const resetToken = crypto.randomBytes(32).toString('hex');
    this.passwrdResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

    return resetToken;
};
const User = mongoose.model ( 'user', userSchema);

module.exports = User;
