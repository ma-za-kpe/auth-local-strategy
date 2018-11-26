var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var passport = require('passport');
var jwt = require('jsonwebtoken');
var config = require('../config/db');
var jwtHelper = require('../config/jwtHelper');
//var _ = require('lodash');
var _ = require('underscore');


const UserReg = mongoose.model('User');

/* Routes and Endpoints for UserReg */

//get userRegInfo
router.get('/userReg', (req, res, next) => {
    UserReg.find((err, data) => {
        if (err) {
            res.send(err)
        } else {
            res.status(200).json(data);
        }
    });
});

//Add userRegInfo

router.post('/register', (req, res, next) => {
    const addUserReg = new UserReg({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: req.body.password

    });
    addUserReg.save((err, doc) => {
        if (!err) {
            res.send(doc);
        } else {
            console.log(err)
            if (err.code == 11000) {
                res.status(422).send(['Duplicate email adrress found.']);
            } else
                return next(err);
        }
    });

});

router.post('/authenticate', (req, res, next) => {

    passport.authenticate('local', (err, user, info) => {
        if (err) {
            res.status(404).json(err);
            //console.log(err);
        } else if (user) {
            //successfull authentication
            res.status(200).json({ 'token': jwt.sign({ _id: user._id, email: user.email }, config.JWT_SECRET) })
        } else {
            //unknown user and wrong password
            res.status(404).json(info);
        }

    })(req, res);

})
// jwtHelper.jwtHelper,
router.get('/userProfile', jwtHelper.verifyJwtToken, (req, res, next) => {
    UserReg.findOne({ _id: req._id }, (err, user) => {
        if (err) {
            res.status(404).json({ status: false, message: "user record not found" });
        } else {
            res.status(200).json({ status: true, user: _.pick(user, ['firstname', 'email']) });
        }
    });
});

//geting user by id
router.get('/userReg/:id', (req, res, next) => {
    UserReg.findById(req.params.id, (err, issues) => {
        if (err)
            console.log(err);
        else
            res.send(issues);
    });
});

//geting user by name (Authenticate)
router.get('/userReg/fn/:fn', (req, res, next) => {

    const fname = { firstname: req.params.fn };
    const password = req.body.password;

    UserReg.find(fname, (err, user) => {
        if (err) throw err;
        if (!fname) {
            console.log({ success: false, msg: "User not found" })
        } else {
            res.json(issues);
        }
    });
});

router.comparePassword = () => {

};

//updating userinfo
router.put('/userReg/edit/:id', (req, res, next) => {
    if (!(req.params && req.params.id)) {
        res.status(404).send("Invalid ID");
    } else {
        var edit = {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            password: req.body.password
        };

        UserReg.findByIdAndUpdate(req.params.id, { $set: edit }, { new: true }, (err, data) => {
            if (err) {
                res.send(err)
            } else {
                res.json(data);
            }
        })

    }
    //);
});

//delete route
router.delete('/userReg/delete/:id', (req, res) => {
    UserReg.findByIdAndRemove(req.params.id, (err, data) => {
        if (err)
            console.log(err);
        else
            res.send(data);
    })
});
;

module.exports = router;