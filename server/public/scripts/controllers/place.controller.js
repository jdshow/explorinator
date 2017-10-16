myApp.controller('PlaceController', ['UserService', 'PlacesService', '$mdDialog', '$mdToast', 'NgMap', '$location', function (UserService, PlacesService, $mdDialog, $mdToast, NgMap, $location) {
  console.log('InfoController created');
  var self = this;
  self.userService = UserService;

  self.placesArray = PlacesService.placesArray;
  self.markerArray = PlacesService.markerArray;
  self.placeToAdd = {}
  self.placeToEdit = PlacesService.placeToEdit;
  self.placeToDelete = {};
  self.map = {};
  self.mapFilter = {};
  self.categories = UserService.categories;
  self.newCat = "";
  self.bounds = PlacesService.bounds;
  self.noMatchingPlaces = PlacesService.noMatchingPlaces;
  self.firstLogin = PlacesService.firstLogin


  //clears data on logout
  self.logout = function () {
    UserService.logout();
    PlacesService.markerArray = [];
    PlacesService.placesArray = { list: [] };
    PlacesService.bounds = new google.maps.LatLngBounds();
    PlacesService.firstLogin = false;
  }

  PlacesService.publicFlag.status = false;


  //main map controls

  self.updateMap = function () { //get data from server
    console.log('places controller, self.updateMap()')
    PlacesService.getPlaces();
    // console.log('markerArray', self.markerArray)
    //console.log('categories in PC ', self.categories)
  }

  self.showInfoWindow = function (e, place) {
    self.place = place;
    self.editPlace = place;
    self.placeToShow = place;
    self.placeToDelete = place;
    self.map.showInfoWindow('infoWindow', this);
  }

  self.showDetails = function (place) {
    // console.log('place is ', place)
    //console.log('self.place is', self.place)
    PlacesService.detailsData(self.place);
    // console.log('place clicked', self.placeToShow)
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

  self.showConfirm = function (ev) {
    // Appending dialog to document.body to cover sidenav in docs app
    console.log('deleting', self.placeToDelete)
    var confirm = $mdDialog.confirm()
      .title('Would you like to delete this place?')
      .textContent('You cannot undo this.')
      .ariaLabel('confirm delete')
      .targetEvent(ev)
      .ok('Yes')
      .cancel('Nope');

    $mdDialog.show(confirm).then(function () {
      self.status = 'You decided to delete the place.';
      console.log(self.status, self.placeToDelete)
      self.deletePlace(self.placeToDelete)
    }, function () {
      self.status = 'You decided to keep the place.';
    });
  };

  //filter controls
  self.filterMap = function () {
    // console.log('filter options', self.mapFilter)
    //run map refresh function with new GET params
    PlacesService.filterMarkers(self.mapFilter);
    //self.updateMap();
    console.log('no matching places in controller', self.noMatchingPlaces)
  }

  self.clearFilter = function () {
    self.mapFilter = {};
    PlacesService.markersAfterFilter = [];
    self.updateMap();
    PlacesService.noMatchingPlaces.status = false;
  }



  //edit place controls

  //edit mode in material
  self.showEdit = function (place) {
    PlacesService.editData(self.place);
    //  console.log('place to show is', place)
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


  self.cancel = function () {
    $mdDialog.cancel();
  }

  self.updatePlace = function (place) { // call service method to update data
    self.place = place; //what is this doing
    if (self.newCat != "") {
      //  console.log(self.newCat)
      UserService.addCat(self.newCat);
      //call function to add category to db (on check??)
      self.placeToEdit.category = self.newCat;
      UserService.getuser();
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
    // console.log('self.place', self.place)

    //  console.log(self.place.geometry.location.lat(), self.place.geometry.location.lng());
    self.placeToAdd.lat = self.place.geometry.location.lat();
    self.placeToAdd.lng = self.place.geometry.location.lng();
    //console.log('location', self.place.geometry.location);
    // self.map.setCenter(self.place.geometry.location);
  }

  self.addPlace = function () { //calls service method to POST new place to db, clears place inputs
    console.log('place to add is ', self.placeToAdd)
    if (self.placeToAdd.name && self.placeToAdd.type) {
      if (self.newCat != "") {
        //  console.log(self.newCat)
        UserService.addCat(self.newCat);
        // UserService.getUser();  -- need to be able to refresh categories
        self.placeToAdd.category = self.newCat;
        // UserService.getuser();
      }
      PlacesService.addPlace(self.placeToAdd);
      self.showActionToast(self.placeToAdd)
      self.placeToAdd = {};
      self.place = {};
      self.address = "";
      self.newCat = "";
      self.showOtherCat = false;
      self.showAlert = false;

    } else {
      self.showAlert = true;
    }



  }

  self.setCat = function () {
    console.log('selected cat changed ', self.placeToAdd.category)

    if (self.placeToAdd.category == "pc.newCat" || self.placeToEdit.category == "pc.newCat") {
      //console.log('gotta add new, show the thing')
      self.showOtherCat = true;
    }
  }

  self.cancelNewPlace = function () {
    self.placeToAdd = {};
    self.place = {};
    self.address = "";
    self.newCat = "";
  }

  //toast on successuful add

  self.showActionToast = function (newPlace) {
    var toast = $mdToast.simple()
      .textContent(newPlace.name, 'added!')
      .action('Go to Map')
      .highlightAction(true)
      .highlightClass('md-accent')// Accent is used by default, this just demonstrates the usage.
      .position("bottom right");

    $mdToast.show(toast).then(function (response) {
      if (response == 'ok') {
        $location.path('/user');
      }
    });
  };

  //delete place controls
  self.deletePlace = function (place) {
    PlacesService.deletePlace(place);
    self.deletePlace = {};
  }

  //filestack controls
  // self.client = filestack.init('A2o83QviQ7GRKGiIDPkUOz');
  // self.showPicker = function () {
  //   client.pick({
  //   }).then(function (result) {
  //     console.log(JSON.stringify(result.filesUploaded))
  //   });
  // }




  //clears data on logout
  self.logout = function () {
    UserService.logout();
    PlacesService.markerArray = [];
    PlacesService.placesArray = { list: [] };
    PlacesService.bounds = new google.maps.LatLngBounds();
  }

  //marker init
  self.updateMap();

  //initialize map
  NgMap.getMap('map').then(function (map) {
    console.log('map initialized in controller')
    self.map = map;
 //   if (PlacesService.emptyMap == false) {
      self.map.fitBounds(self.bounds);
 //   } 
  })

}]);

