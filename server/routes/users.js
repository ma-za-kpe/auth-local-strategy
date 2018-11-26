
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var config = require('../config/db');

const UserReg = mongoose.model('User');

//get userRegInfo
router.get('/userReg', (req, res, next) => {
  UserReg.find((err, data) => {
    if (err) {
      res.send(err)
    } else {
      res.json(data);
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


module.exports = router;
