myApp.controller('PublicController', function (UserService, PlacesService, NgMap, $routeParams) {
  var self = this;
  self.userMap = $routeParams.userName;
  self.publicCategories = PlacesService.publicCategories
  console.log('self.userMap', self.userMap)

  self.placesArray = PlacesService.placesArray;
  self.markerArray = PlacesService.markerArray;
  self.categories = PlacesService.publicCategories;
  self.placeClickedData = {};

  //initialize map
  NgMap.getMap('map').then(function (map) {
    self.map = map;
  })

  //initialize categories for filter
  self.getPublicCats = function(){
    PlacesService.getUserCatsByName(self.userMap)
  }

  self.getPublicCats();
  
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

    //filter controls
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
















