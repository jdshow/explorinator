myApp.controller('UserController', ['UserService', 'PlacesService', function (UserService, PlacesService, ngMaterial, $mdDialog, $mdToast, ngMap) {
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

  self.showAlert = function(ev) {
    $mdDialog.show(
        $mdDialog.alert()
        .parent(angular.element(document.querySelector('#popupContainer')))
        .title('This is an alert')
        .textContent('You can specify some description text here')
        .ariaLabel('Alert Dialog Demo')
        .ok('Got it!')
        .targetEvent(ev)
    );
};

self.showToast = function (ev) {
    $mdToast.show(
        $mdToast.simple()
        .textContent('Hello!')
    );
}
}]);



