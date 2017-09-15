var express = require('express');
var router = express.Router();
var passport = require('passport');
var Place = require('../models/place.js');
var User = require('../models/user.js');



router.get('/', function (req, res) {
    // console.log('placesRouter - get / req.username:', req.user.username);

    User.findOne({ username: req.user.username }, function (err, data) {
        if (err) {
            console.log('find error: ', err);
            res.sendStatus(500);
        } else {
            //console.log('found data: ', data);
            placesToSend = data.places;
            // console.log('data.places to send is', placesToSend)
            res.send(placesToSend);
        }
    });
});

router.post('/', function (req, res) {
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
        userId = req.user._id

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














router.put('/fave', function (req, res) {
    var userId = req.user._id;
    var placeId = req.body.id;
    console.log('placeId is', placeId)
    // User.findOneAndUpdate({ _id: personId, "places.id": placeId }, 
    //      {"places.$.placeType": "favorite"} ,

    db.products.update(
        { _id: userId, places._id:  },
        {
            $set:
            {
                quantity: 500,
                details: { model: "14Q3", make: "xyz" },
                tags: ["coats", "outerwear", "clothing"]
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
    );
});

module.exports = router;
