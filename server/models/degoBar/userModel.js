const mongoose = require ('mongoose');
const validator = require ('validator');

const userSchema = new mongoose.Schema ({

    name: {

        type: String,
        require: true
    },

    password: {

        type: String,
        require: [true, "vous devrez mettre un Mot de pass"]

    },

    confirmPAssword: {

        type: String,
        require: [true, 'Les mots de passe ne se ressemble pas '],
    }
});

const User = mongoose.model ( 'User', userSchema);

module.exports = User;
