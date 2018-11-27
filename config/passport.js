var JwtStrategy = require('passport-jwt').Strategy;
var User = require('../models/user');
var localStrategy = require('passport-local').Strategy;
var passport = require('passport');

//passport for local authentication
passport.use(
    new localStrategy({ usernameField: 'email' },
        (email, password, done) => {
            User.findOne({ email: email }, (err, user) => {
                if (err) {
                    return done(err, false);
                }
                else if (!user) {
                    done(null, false, { message: 'Email is not registered' });
                } else if (!user.verifyPassword(password)) {
                    done(null, false, { message: 'wrong password' });
                }
                //authentication successfull
                else {
                    done(null, user);

                }
            });

        })
);


