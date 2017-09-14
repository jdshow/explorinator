myApp.controller('PlaceController',  ['UserService', 'PlacesService', function (UserService, PlacesService, ngMap) {
  console.log('InfoController created');
  var self = this;
  self.userService = UserService;
  self.placeToAdd = "current";

  self.placeChanged = function() {
    self.place = this.getPlace();
    console.log('location', self.place.geometry.location);
    self.map.setCenter(self.place.geometry.location);
  }

  // self.updateMarker = function() {
  //   self.placeToAdd = self.findPlace;
  //   console.log(self.findPlace)
  // }


  // self.findGeocode = function(address) {

  // }

}]);



