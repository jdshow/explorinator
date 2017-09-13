myApp.factory('UserService', function ($http, $location) {
  //console.log('UserService Loaded');
 // self.returnedPlaces = { list: [] };
  var userObject = {};
  var placesArray = {list: []};
  var markerArray = [];

  function getPlaces() {
    $http.get('/places').then(function (response) {
      placesArray.list = response.data
      console.log('places returned:', placesArray.list)
    }).then(function( ){
      console.log('in .then function of getPlaces, placesArray.list is', placesArray.list)
      buildMarkers(placesArray.list)
    })
  }

  function buildMarkers(array) {
    //builds an array of lat/long pairs and place name to create markers
   // console.log('passed array', array)
    for (i = 0; i < array.length; i++) {
      marker = {
       // map: map,
        lat: array[i].lat, 
        lng: array[i].long,
        title: array[i].name,
        notes: array[i].notes
      }
       
      //marker.addListener('click', toggleBounce)
      markerArray.push(marker)
    }
   // console.log('markerArray:', markerArray)
  }

  return {
    userObject: userObject,
    getPlaces: getPlaces,
    placesArray: placesArray,
    markerArray: markerArray, 

    getuser: function () {
     // console.log('UserService -- getuser');
      $http.get('/user').then(function (response) {
        if (response.data.username) {
          // user has a curret session on the server
          userObject.userName = response.data.username;
          console.log('UserService -- getuser -- User Data: ', userObject.userName);
        } else {
          console.log('UserService -- getuser -- failure');
          // user has no session, bounce them back to the login page
          $location.path("/home");
        }
      }, function (response) {
        console.log('UserService -- getuser -- failure: ', response);
        $location.path("/home");
      });
    },

    logout: function () {
      console.log('UserService -- logout');
      $http.get('/user/logout').then(function (response) {
        console.log('UserService -- logout -- logged out');
        $location.path("/home");
      });
    }


  };
});
