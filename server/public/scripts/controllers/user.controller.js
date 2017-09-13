myApp.controller('UserController', ['UserService', function (UserService, NgMap) {
  // console.log('UserController created');
  var self = this;
  self.userService = UserService;
  self.userObject = UserService.userObject;
  self.placesArray = UserService.placesArray;
  var placesArray = self.placesArray
  // self.placesArray = self.returnedPlaces.placesArray;
  self.markerArray = UserService.markerArray
  self.infoWindow = false;


  // NgMap.getMap().then(function (map) {
  //   console.log('map', map);
  //   self.map = map;
  // });



  self.updatePlaces = function () {
    UserService.getPlaces();
  }

  self.updatePlaces();
  //console.log('self.placesArray in controller outside function', self.placesArray)
  //console.log('self.placesArray.list in controller outside function', self.placesArray.list)
  // console.log('placesArray', placesArray)

  console.log('marker array in controller', self.markerArray)



}]);



