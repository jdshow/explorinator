myApp.controller('UserController', ['UserService', 'PlacesService', '$mdDialog', function (UserService, PlacesService, $mdDialog) {
  // console.log('UserController created');
  var self = this;
  self.userService = UserService;
  self.userObject = UserService.userObject;
  self.placesArray = PlacesService.placesArray;
  self.markerArray = PlacesService.markerArray
  self.infoWindow = false;
 
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
  //console.log('self.placesArray in controller outside function', self.placesArray)
  //console.log('self.placesArray.list in controller outside function', self.placesArray.list)
  // console.log('placesArray', placesArray)

  console.log('marker array in controller', self.markerArray)


  self.makeFave = function(place) {
    //call service method to PUT type change
    console.log('controller gets type change requested for', place);
    PlacesService.makeFave(place);
  }
  self.showDetail = function (e, place) {
    console.log('marker clicked, place:', place)
    self.place = place;
    self.infowindow = true;

  };

  self.hideDetail = function () {
    self.infowindow = false;

  };

  self.showAlert = function(ev) {
    $mdDialog.show(
        $mdDialog.alert()
        .parent(angular.element(document.querySelector('#popupContainer')))
        .title('This is an alert')
        .textContent("text")
        .ariaLabel('Alert Dialog Demo')
        .ok('Got it!')
        .targetEvent(ev)
    );
};

}]);



