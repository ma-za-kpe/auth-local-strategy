var jwt = require('jsonwebtoken');
var config = require('../config/db');

module.exports = (req, res, next) => {

    var token = req.headers['authorization'].split(' ')[1];

    if (!token) {
        return res.status(403).send({ auth: false, message: 'No token provided' });
    } else {
        jwt.verify(token, config.JWT_SECRET, (err, decode) => {
            if (err) {
                return res.status(500).send({ auth: false, message: "token authentication failed" })
            } else {
                req._id = decode._id;
                next();
            }
        });
    }

}

