myApp.controller('PublicController', function (UserService, PlacesService, NgMap, $routeParams) {
  var self = this;
  self.userMap = $routeParams.userName;
  console.log('self.userMap', self.userMap)

  self.placesArray = PlacesService.placesArray;
  self.markerArray = PlacesService.markerArray
  self.infoWindow = false;
  self.placeClickedData = {};

  //initialize map
  NgMap.getMap('map').then(function (map) {
    self.map = map;
  })



  //main map controls

  self.updateMap = function () { //get data from server
    PlacesService.getPublicPlaces(self.userMap);
  }


  //marker init
  self.updateMap();

  //material
  self.showInfoWindow = function (e, place) {
    self.place = place;
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


});
















