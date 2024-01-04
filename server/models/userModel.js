const mongoose = require ('mongoose');
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
    }
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
const User = mongoose.model ( 'User', userSchema);

module.exports = User;
