myApp.controller('PlaceController', ['UserService', 'PlacesService', '$mdDialog', '$mdToast', 'NgMap', function (UserService, PlacesService, $mdDialog, $mdToast, NgMap) {
  console.log('InfoController created');
  var self = this;
  self.userService = UserService;

  self.placesArray = PlacesService.placesArray;
  self.markerArray = PlacesService.markerArray;
  self.placeToAdd = {}
  self.placeToEdit = PlacesService.placeToEdit;
  self.map = {};
  self.mapFilter = {};
  self.categories = UserService.categories;
  self.newCat = "";


  //initialize map
  NgMap.getMap('map').then(function (map) {
    self.map = map;
  })

  //clears data on logout
  self.logout = function () {
    UserService.logout();
    PlacesService.markerArray = [];
    PlacesService.placesArray = { list: [] };
  }

  //main map controls

  self.updateMap = function () { //get data from server
    PlacesService.getPlaces();
    console.log('markerArray', self.markerArray)
    console.log('categories in PC ', self.categories)
  }

  self.showInfoWindow = function (e, place) {
    self.place = place;
    self.editPlace = place;
    self.placeToShow = place;
    self.map.showInfoWindow('infoWindow', this);
  }

  self.showDetails = function (place) {
    console.log('place is ', place)
    console.log('self.place is', self.place)
    PlacesService.detailsData(self.place);
    console.log('place clicked', self.placeToShow)
    $mdDialog.show({
      controller: 'PlaceController',
      controllerAs: 'pc',
      templateUrl: 'views/templates/details.tmpl.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      locals: { place: self.placeToShow },
      clickOutsideToClose: true,
      fullscreen: self.customFullscreen // Only for -xs, -sm breakpoints.
    })
  };

  self.filterMap = function() {
    console.log('filter options', self.mapFilter)
    //run map refresh function with new GET params
    PlacesService.filterMarkers(self.mapFilter);
    //self.updateMap();
  }

  self.clearFilter = function() {
    self.mapFilter = {};
    PlacesService.markersAfterFilter = [];  
    self.updateMap();

  }



  //edit place controls

  //edit mode in material
  self.showEdit = function (place) {
    PlacesService.editData(self.place);
    console.log('place to show is', place)
    $mdDialog.show({
      controller: 'PlaceController',
      controllerAs: 'pc',
      templateUrl: 'views/templates/edit.tmpl.html',
      parent: angular.element(document.body),
      targetEvent: self.place,
      locals: { place: self.placeToEdit },
      clickOutsideToClose: true,
      fullscreen: self.customFullscreen // Only for -xs, -sm breakpoints.
    })
  };


  self.cancel = function() {
    $mdDialog.cancel();
}

  self.updatePlace = function (place) { // call service method to update data
    self.place = place; //what is this doing
    if (self.newCat != "") {
      console.log(self.newCat)
      UserService.addCat(self.newCat);
      //call function to add category to db (on check??)
      self.placeToEdit.category = self.newCat;
    }
    self.newCat = "";
    PlacesService.updatePlace(place); //has to be place or it breaks *shrug*
    self.placeToEdit = {};
  }

  self.makeFave = function (place) { //call service method to PUT type change
    // console.log('controller gets type change requested for', place);
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
    if (self.newCat != "") {
      console.log(self.newCat)
      UserService.addCat(self.newCat);
      // UserService.getUser();  -- need to be able to refresh categories
      self.placeToAdd.category = self.newCat;
    }
    PlacesService.addPlace(self.placeToAdd);
    self.placeToAdd = {};
    self.place = {};
    self.address = "";
    self.newCat = "";
  }

  self.cancelNewPlace = function() {
    self.placeToAdd = {};
    self.place = {};
    self.address = "";
    self.newCat = "";
  }

  //toast on successuful add

  // self.showActionToast = function () {
  //   var toast = $mdToast.simple()
  //     .textContent('Place added!')
  //     .action('Go to Map')
  //     .highlightAction(true)
  //     .highlightClass('md-accent')// Accent is used by default, this just demonstrates the usage.
  //     .position("Top Right");

  //   $mdToast.show(toast).then(function (response) {
  //     if (response == 'ok') {
  //       alert('you want to go to map!');
  //     }
  //   });
  // };

  //delete place controls
  self.deletePlace = function (place) {
    PlacesService.deletePlace(place);
  }

  //filestack controls
  self.client = filestack.init('A2o83QviQ7GRKGiIDPkUOz');
  self.showPicker = function () {
    client.pick({
    }).then(function (result) {
      console.log(JSON.stringify(result.filesUploaded))
    });
  }

  //marker init
  self.updateMap();



}]);

