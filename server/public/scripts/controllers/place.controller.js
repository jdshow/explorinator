myApp.controller('PlaceController', ['UserService', 'PlacesService', '$mdDialog', '$mdToast', function (UserService, PlacesService, $mdDialog, $mdToast) {
  console.log('InfoController created');
  var self = this;
  self.userService = UserService;

  self.placesArray = PlacesService.placesArray;
  self.markerArray = PlacesService.markerArray
  self.infoWindow = false;
  self.editMode = false;
  self.placeToAdd = {}


  //clears data on logout
  self.logout = function () {
    UserService.logout();
    PlacesService.markerArray = [];
    PlacesService.placesArray = { list: [] };
  }



  //main map controls

  self.updatePlaces = function () { //get data from server
    PlacesService.getPlaces();
  }

  self.showDetail = function (e, place) { //opens detail panel
    console.log('marker clicked, place:', place)
    self.place = place;
    self.editPlace = place;
    self.infowindow = true;
    console.log('place to edit should be', self.editPlace)
  };

  self.hideDetail = function () { //closes detail panel
    self.infowindow = false;
  };



  //edit place controls

  self.editModeActive = function () {   // opens edit inputs and closes detail panel
    self.editMode = true;
    self.hideDetail();
    self.placeToEdit = self.place;
    console.log('editing', self.placeToEdit)
  }

  self.updatePlace = function (place) { //closes edit inputs, opens updated detail panel, call service method to update data
    self.editMode = false;
    self.showDetail();
    console.log('new data for place is ', place)
    PlacesService.updatePlace(place);
  }

  self.makeFave = function (place) { //call service method to PUT type change
    console.log('controller gets type change requested for', place);
    PlacesService.makeFave(place);
  }
  

  //new place controls
  self.showInputs = function () { //shows inputs after location is pulled from Places API
    self.partTwo = true;
  }

  self.placeChanged = function () {
    self.place = this.getPlace();
    self.placeToAdd = this.getPlace();
    console.log('self.place', self.place)

    console.log(self.place.geometry.location.lat(), self.place.geometry.location.lng());
    self.placeToAdd.lat = self.place.geometry.location.lat();
    self.placeToAdd.lng = self.place.geometry.location.lng();
    //console.log('location', self.place.geometry.location);
    // self.map.setCenter(self.place.geometry.location);
  }

  self.addPlace = function () { //calls service method to POST new place to db, clears place inputs
    console.log('new place!', self.placeToAdd)
    PlacesService.addPlace(self.placeToAdd);
    self.placeToAdd = {};
    self.place = {};
    self.address = "";
  }


  //delete place controls
  self.deletePlace = function (place) {
    PlacesService.deletePlace(place);
    self.hideDetail();
  }

  //marker init
  self.updatePlaces();


}]);





//maybe use later
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



  






