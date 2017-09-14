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

router.post('/', function(req, res) {
    // console.log('new place to store from client: ', req.body);
    var placeToAdd = {
        lat: req.body.geometry.location.lat,
        long: req.body.geometry.location.lng,
        address: req.body.formatted_address,
        placeType: req.body.type,
        name: req.body.name,
        private: req.body.private,
        notes: req.body.notes,
        category: req.body.category,
        priceRange: req.body.priceRange
    }

    console.log('placeToAdd object', placeToAdd)
    console.log('req.user', req.user)
    var userId = req.user._id;
    var placeToSaveToTheCollection = new Place(placeToAdd)

    User.findByIdAndUpdate(
        userId,
        {$push: {"places": placeToSaveToTheCollection}},
        {safe: true, upsert: true, new: true},
        function(err, data) {
            if (err) {
                console.log('update error: ', err);

                res.sendStatus(500);
            } else {
                res.sendStatus(200);
            }
        }
    );

});

module.exports = router;
