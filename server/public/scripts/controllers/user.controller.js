myApp.controller('UserController', ['UserService', 'PlacesService', function (UserService, PlacesService, ngMap) {
  // console.log('UserController created');
  var self = this;
  self.userService = UserService;
  self.userObject = UserService.userObject;
  self.placesArray = PlacesService.placesArray;
  self.markerArray = PlacesService.markerArray
  self.infoWindow = false;
 



  //get data from server
  self.updatePlaces = function () {
    PlacesService.getPlaces();
  }

  self.updatePlaces();
  //console.log('self.placesArray in controller outside function', self.placesArray)
  //console.log('self.placesArray.list in controller outside function', self.placesArray.list)
  // console.log('placesArray', placesArray)

  console.log('marker array in controller', self.markerArray)

  self.showDetail = function (e, place) {
    console.log('marker clicked, place:', place)
    self.place = place;
    self.infowindow = true;

  };

  self.hideDetail = function () {
    self.infowindow = false;

  };


}]);



