myApp.controller('UserController', ['UserService', 'PlacesService', function (UserService, PlacesService, ngMap) {
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
    self.infowindow = !self.infowindow;

    //self.map.showInfoWindow('infoWindow', place.id);
  };

  // self.hideDetail = function () {
  //   self.map.hideInfoWindow('infoWindow');
  // };

//GOOGLE MAPS API - NO NGMAP BELOW 
//    //initialize map
//    var mapOptions = {
//     center: new google.maps.LatLng(44.978031, -93.263501),
//     zoom: 12,
//     mapTypeId: google.maps.MapTypeId.ROADMAP
//   };

//   //function initMap() {
//     var map = new google.maps.Map(document.getElementById('map'), mapOptions);
//  // }

//   //initMap();

//   //build markers from array
//   self.buildMarkers = function () {
//     markerDrop = self.markerArray;
//     console.log('in buildMarkers function, markerDrop:', markerDrop.length)
//     for (i = 0; i < self.markerArray.length; i++) {
      
//       var latLng = new google.maps.LatLng(markerDrop.lat,markerDrop.lng)
//       var marker = new google.maps.Marker({
//         position:latLng,
//         title: markerDrop.title
//       });
//       console.log('marker', marker);
//       // To add the marker to the map, call setMap();
//       marker.setMap(map);
//     }
//   }

//   self.buildMarkers();

//   var latLng = new google.maps.LatLng(44.956321, -93.147685)
//   var marker = new google.maps.Marker({
//     position:latLng,
//     title: "Hoa Bien"
//     }); 

//     marker.setMap(map);


}]);



