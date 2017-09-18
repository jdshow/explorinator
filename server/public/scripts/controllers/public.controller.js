myApp.controller('PublicController', function(UserService, PlacesService, $routeParams, $mdDialog){
    var self = this;
    self.userMap = $routeParams.userName;
    console.log('self.userMap', self.userMap)
    
    self.placesArray = PlacesService.placesArray;
    self.markerArray = PlacesService.markerArray
    self.infoWindow = false;
    self.placeClickedData = {};

    //main map controls
  
    self.updateMap = function () { //get data from server
      PlacesService.getPublicPlaces(self.userMap);
    }
  
    self.showDetail = function (e, place) { //opens detail panel
      console.log('marker clicked, place:', place)
      self.place = place;
      self.infowindow = true;
    };
  
    self.hideDetail = function () { //closes detail panel
      self.infowindow = false;
    };
  
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
  

    //marker init
    self.updateMap();
  
    //material
    self.showAlert = function (ev, place) {
      console.log('clicked! place', place)
      $mdDialog.show(
        $mdDialog.alert()
          .parent(angular.element(document.querySelector('#popupContainer')))
          .title('This is an alert')
          .textContent("text", place)
          .ariaLabel('Alert Dialog Demo')
          .ok('Got it!')
          .targetEvent(ev)
      );
    };
  
  
    self.showAdvanced = function (ev) {
  
      $mdDialog.show({
        controller: 'PlaceController',
        controllerAs: 'pc',
        templateUrl: 'views/templates/details.tmpl.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose: true,
        fullscreen: self.customFullscreen // Only for -xs, -sm breakpoints.
      })
      //   .then(function (answer) {
      //     self.status = 'You said the information was "' + answer + '".';
      //   }, function () {
      //     self.status = 'You cancelled the dialog.';
      // });
    };
  
  
  });
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  