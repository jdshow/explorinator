var express = require('express');
var router = express.Router();
var passport = require('passport');
var Place = require('../models/place.js');
var User = require('../models/user.js');



router.get('/', function (req, res) {
   // console.log('placesRouter - get / req.username:', req.user.username);

    User.findOne({username: req.user.username}, function (err, data) {
        if (err) {
            console.log('find error: ', err);
            res.sendStatus(500);
        } else {
            //console.log('found data: ', data);
            placesToSend = data.places;
            console.log('data.places to send is', placesToSend)
            res.send(placesToSend);
        }
    });
});

module.exports = router;
