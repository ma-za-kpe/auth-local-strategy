var mongoose = require('mongoose');
//var uri = 'mongodb://localhost:27017/Outbox';
// var uri = 'mongodb://okello:123456789okello@ds245132.mlab.com:45132/outbox';
// mongoose.connect(uri, {
//   useNewUrlParser: true
// });

module.exports = {
    'JWT_SECRET': 'outboxsecretkey***',
    'JTW_EXPT_TIME': '2m'
};

//Listen to mongoose events

mongoose.connection.on('connected', function () {
    console.log('Mongoose connected to ' + uri);
});

mongoose.connection.on('error', function (err) {
    console.log('Mongoose connection error: ' + err);
});
mongoose.connection.on('disconnected', function () {
    console.log('Mongoose disconnected');
});
gracefulShutdown = function (msg, callback) {
    mongoose.connection.close(function () {
        console.log('Mongoose disconnected through ' + msg);
        callback();
    });
};
// For nodemon restarts
process.once('SIGUSR2', function () {
    gracefulShutdown('nodemon restart', function () {
        process.kill(process.pid, 'SIGUSR2');
    });
});
// For app termination
process.on('SIGINT', function () {
    gracefulShutdown('app termination', function () {
        process.exit(0);
    });
});
// For Heroku app termination
process.on('SIGTERM', function () {
    gracefulShutdown('Heroku app shutdown', function () {
        process.exit(0);
    });
})

//require the Schema file
require('../models/users');