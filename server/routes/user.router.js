var express = require('express');
var router = express.Router();
var User = require('../models/user.js');

// Handles Ajax request for user information if user is authenticated
router.get('/', function (req, res) {
  console.log('get /user route');
  // check if logged in
  if (req.isAuthenticated()) {
    // send back user object from database
    console.log('logged in', req.user);
    var userInfo = {
      username: req.user.username,
      categories: req.user.categories
    };
    res.send(userInfo);
  } else {
    // failure best handled on the server. do redirect here.
    console.log('not logged in');
    // should probably be res.sendStatus(403) and handled client-side, esp if this is an AJAX request (which is likely with AngularJS)
    res.send(false);
  }
});

// clear all server session information about this user
router.get('/logout', function (req, res) {
  // Use passport's built-in method to log out the user
  console.log('Logged out');
  req.logOut();
  res.sendStatus(200);
});

router.put('/cats', function (req, res) {
  console.log('server received new cat ', req.body)
  var newCat = req.body.category;
  console.log('newCat', newCat);
  var userId = req.user.id;
  console.log('userId', userId)
  User.findByIdAndUpdate(
    { _id: userId },
    { $push: { categories: newCat } },
    function (err, data) {
      if (err) {
        console.log('update error: ', err);

        res.sendStatus(500);
      } else {
        res.sendStatus(200);
      }
    }
  )
});




module.exports = router;
