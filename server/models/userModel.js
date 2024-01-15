const mongoose = require ('mongoose');
const crypto = require ('crypto');
const validator = require ('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema ({

    name: {

        type: String,
        require: [true, 'please veiller taper votre nom']
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

    emailChangedAt: Date,
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date
});

//crypt the password
userSchema.pre ('save', async function (next){
    //check if the password was modified
    if (!this.isModified('password')) return next();


    //hash the password with the cost of twelve
    this.password = await bcrypt.hash(this.password, 12);

    //delete the confirm password and set it to undefined
    this.confirmPassword = undefined;

    //check if the document is new or not
    if (!this.isNew) {
       this.passwordChangedAt = Date.now() - 2000;
    };
    //then pass to the next milddleware 
    next();

});

//check if the email was changed
userSchema.pre('save', function(next) {
    //check if the email was changed
    if (!this.isModified('email')) return next();

    //check if the document is new or not
    if(!this.isNew) {
        this.emailChangedAt = Date.now () - 2000;
    };

    next();
})

//compare the taper password and the saved (hashed) password
userSchema.methods.confirmTapedPassword = function (tapedPassword, userPassword) {

    return bcrypt.compare(tapedPassword, userPassword);
};

userSchema.methods.changePasswordAfterIsued = function (JWTTimestamp) {

    if (this.passwordChangedAt) {
        const changedTimestamp = parseInt (this.passwordChangedAt.getTime() / 1000, 10);

        return JWTTimestamp < changedTimestamp;
    };
};

userSchema.methods.changeEmailAfterIsued = function (JWTTimestamp) {
    
    if (this.emailChangedAt) {
    
        const changedTimestamp = parseInt (this.emailChangedAt.getTime() / 1000, 10);
    
        return JWTTimestamp < changedTimestamp;
    };
};

userSchema.methods.createPasswordResetToken = function () { 

    const resetToken = crypto.randomBytes(32).toString('hex');
    this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

    return resetToken;
};
const User = mongoose.model ( 'user', userSchema);

module.exports = User;
