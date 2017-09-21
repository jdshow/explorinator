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
           // console.log('found data: ', data);
            placesToSend = data;
            // console.log('data.places to send is', placesToSend)
            res.send(placesToSend);
        }
    });
});

router.get('/public/:userName', function (req, res) {
    // console.log('placesRouter - get / req.username:', req.user.username);
    // console.log('userName is ', req.params.userName)
    var userName = req.params.userName
    var placesToSend = [];
    Place.find({ userName: userName }, function (err, data) {
        if (err) {
            console.log('find error: ', err);
            res.sendStatus(500);
        } else {
            //need to add private flag check
            placesToCheck = data;
            for (i=0; i < placesToCheck.length; i++) {
                if (placesToCheck[i].private == true ) {
                    console.log('private location')
                } else {
                    placesToSend.push(placesToCheck[i])
                }
            }
            res.send(placesToSend);
        }
    });
});

router.get('/public/cats/:userName', function (req, res) {
    // console.log('placesRouter - get / req.username:', req.user.username);
    // console.log('userName is ', req.params.userName)
    var userName = req.params.userName
    User.find({ username: userName }, {categories: 1}, function (err, data) {

        if (err) {
            console.log('find error: ', err);
            res.sendStatus(500);
        } else {
            res.send(data);
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
        userID: req.user._id,
        userName: req.user.username,
        website: req.body.website

    }

    // console.log('placeToAdd object', placeToAdd)
    // console.log('req.user', req.user)
    // console.log('new place req.body', req.body)
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

router.put('/', function (req, res) {
    console.log('server received update request', req.body)
    placeId = req.body.id;
    Place.findByIdAndUpdate(
        { _id: placeId },
        {
            $set: {
                lat: req.body.lat,
                long: req.body.lng,
                address: req.body.address,
                placeType: req.body.type,
                name: req.body.title,
                private: req.body.private,
                notes: req.body.notes,
                category: req.body.category,
                //priceRange: req.body.priceRange,
                website: req.body.website
            }
        },
        function (err, data) {
            if (err) {
                console.log('update error: ', err);

                res.sendStatus(500);
            } else {
                res.sendStatus(200);
            }
        }
    )
})

router.put('/fave', function (req, res) {
    console.log('server received Fave request for ', req.body)
    placeId = req.body.id;
    Place.findByIdAndUpdate(
        { _id: placeId },
        { $set: { placeType: "Favorite Place" } },
        function (err, data) {
            if (err) {
                console.log('update error: ', err);

                res.sendStatus(500);
            } else {
                res.sendStatus(200);
            }
        }
    )
})

router.delete('/:id', function (req, res) {
    console.log('id is ', req.params.id)
    Place.findByIdAndRemove(
        { _id: req.params.id },
        function (err, data) {
            if (err) {
                console.log('delete error: ', err);

                res.sendStatus(500);
            } else {
                res.sendStatus(200);
            }
        }
    );
});



module.exports = router;
