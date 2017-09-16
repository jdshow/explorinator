myApp.controller('PlaceController', ['UserService', 'PlacesService', '$mdDialog', '$mdToast', function (UserService, PlacesService, $mdDialog, $mdToast) {
  console.log('InfoController created');
  var self = this;
  self.userService = UserService;
  self.placesArray = PlacesService.placesArray;
  self.markerArray = PlacesService.markerArray
  self.infoWindow = false;
  self.markersOn = PlacesService.markersOn;
  self.placeToAdd = {}
  self.editMode = false;

  self.logout = function () {
    UserService.logout();
    PlacesService.markerArray = [];
    PlacesService.placesArray = { list: [] };
  }

  //get data from server
  self.updatePlaces = function () {
    PlacesService.getPlaces();
  }

  self.updatePlaces();

  self.deletePlace = function (place) {
    PlacesService.deletePlace(place);
    self.hideDetail();
  }

  self.makeFave = function (place) {
    //call service method to PUT type change
    console.log('controller gets type change requested for', place);
    PlacesService.makeFave(place);
  }

  self.showDetail = function (e, place) {
    console.log('marker clicked, place:', place)
    self.place = place;
    self.editPlace = place;
    self.infowindow = true;
    console.log('place to edit should be', self.editPlace)

  };

  self.hideDetail = function () {
    self.infowindow = false;

  };

  // self.showAlert = function (ev) {
  //   $mdDialog.show(
  //     $mdDialog.alert()
  //       .parent(angular.element(document.querySelector('#popupContainer')))
  //       .title('This is an alert')
  //       .textContent("text")
  //       .ariaLabel('Alert Dialog Demo')
  //       .ok('Got it!')
  //       .targetEvent(ev)
  //   );
  // };



  // self.placeChanged = function () {
  //   self.place = this.getPlace();
  //   self.placeToAdd = this.getPlace();
  //   console.log('self.place', self.place)

  //   console.log(self.place.geometry.location.lat(), self.place.geometry.location.lng());
  //   self.placeToAdd.lat = self.place.geometry.location.lat();
  //   self.placeToAdd.lng = self.place.geometry.location.lng();
  //   //console.log('location', self.place.geometry.location);
  //   // self.map.setCenter(self.place.geometry.location);
  // }

  self.showInputs = function () {
    self.partTwo = true;
  }

  self.addPlace = function () {
    //console.log('new place!', self.placeToAdd)
    PlacesService.addPlace(self.placeToAdd);
    self.placeToAdd = {};
    self.place = {};
    self.address = "";
  }

  self.editModeActive = function() {
    self.editMode = true;
    self.hideDetail();
    self.placeToEdit = self.place;
    console.log('editing', self.placeToEdit)
  }

  self.updatePlace = function(place) {
    self.editMode = false;
    self.showDetail();
    console.log('new data for place is ', place)
    PlacesService.updatePlace(place);
  }


}]);










