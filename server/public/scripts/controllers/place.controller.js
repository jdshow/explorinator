myApp.controller('PlaceController',  ['UserService', 'PlacesService', function (UserService, PlacesService, ngMap) {
  console.log('InfoController created');
  var self = this;
  self.userService = UserService;
  //

  
  self.placeToAdd = {}

  self.placeChanged = function() {
     self.place = this.getPlace();
     self.placeToAdd = this.getPlace();
     console.log('self.place', self.place)

     console.log(self.place.geometry.location.lat(), self.place.geometry.location.lng());
     self.placeToAdd.lat = self.place.geometry.location.lat();
     self.placeToAdd.lng = self.place.geometry.location.lng();
    //console.log('location', self.place.geometry.location);
    // self.map.setCenter(self.place.geometry.location);
  }

  self.showInputs = function() {
    self.partTwo = true;
  }



  self.addPlace = function() {
    //console.log('new place!', self.placeToAdd)
    PlacesService.addPlace(self.placeToAdd);
    self.placeToAdd = {};
    self.place = {};
    self.address = "";
  }



}]);



