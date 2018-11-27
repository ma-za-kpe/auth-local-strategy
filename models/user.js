const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const config = require('../config/db');

const userSchema = new mongoose.Schema({

    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    saltSecret: String

});

//email verification
//Custom validation for email
userSchema.path('email').validate((val) => {
    emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(val);
}, 'Invalid e-mail.');

userSchema.pre('save', function (next) {
    var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(10, function (err, salt) {
        if (err) return next(err);

        // hash the password along with our new salt
        bcrypt.hash(user.password, salt, (err, hash) => {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            user.password = hash;
            user.saltSecret = salt;
            next();
        });
    });
});

//methods

userSchema.methods.verifyPassword = function (password) {
    try {
        return bcrypt.compareSync(password, this.password);
    }
    catch (err) {
        throw err;
    }
};


userSchema.methods.generatejwt = () => {
    //pass in the second part == payload in our case its the user details...
    return jwt.sign({ _id: this._id },
        config.JWT_SECRET,
        {
            expiresIn: process.env.JTW_EXPT_TIME
        });
}

module.exports = mongoose.model('User', userSchema, 'auth');
// exports.personSchema = {personSchema};
