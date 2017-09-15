var express = require('express');
var router = express.Router();
var passport = require('passport');
var Place = require('../models/place.js');
var User = require('../models/user.js');



router.get('/', function (req, res) {
    // console.log('placesRouter - get / req.username:', req.user.username);
    console.log('req.user._id', req.user._id)
    Place.find({ userID: req.user._id }, function (err, data) {
        if (err) {
            console.log('find error: ', err);
            res.sendStatus(500);
        } else {
            console.log('found data: ', data);
            placesToSend = data;
            // console.log('data.places to send is', placesToSend)
            res.send(placesToSend);
        }
    });
});

router.post('/', function (req, res) {
    console.log('req.user', req.user)
    
    var placeToAdd = {
        lat: req.body.geometry.location.lat,
        long: req.body.geometry.location.lng,
        address: req.body.formatted_address,
        placeType: req.body.type,
        name: req.body.name,
        private: req.body.private,
        notes: req.body.notes,
        category: req.body.category,
        priceRange: req.body.priceRange,
        userID: req.user._id

    }

    console.log('placeToAdd object', placeToAdd)
    console.log('req.user', req.user)
    var placeToSaveToTheCollection = new Place(placeToAdd)

    // insert into our collection
    placeToSaveToTheCollection.save(function (err, data) {
        console.log('saved to the collection: ', data);
        if (err) {
            console.log('save error: ', err);

            res.sendStatus(500);
        } else {
            res.sendStatus(201);
        }

    });

});






module.exports = router;
