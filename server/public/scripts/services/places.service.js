myApp.service('PlacesService', ['$http', function($http){
 
    var self=this;
    self.placesArray = {list: []};
    self.markerArray = [];
  
    self.getPlaces = function () {
      $http.get('/places').then(function (response) {
        self.placesArray.list = response.data
        console.log('places returned:', self.placesArray.list)
      }).then(function( ){
        console.log('in .then function of getPlaces, placesArray.list is', self.placesArray.list)
        self.buildMarkers(self.placesArray.list)
      })
    }
  
    self.buildMarkers = function(array) {
      //builds an array of lat/long pairs and place name to create markers
     // console.log('passed array', array)
      for (i = 0; i < array.length; i++) {
        marker = {
         // map: map,
          lat: array[i].lat, 
          lng: array[i].long,
          title: array[i].name,
          notes: array[i].notes
        }
         
        //marker.addListener('click', toggleBounce)
        self.markerArray.push(marker)
      }
     // console.log('markerArray:', markerArray)
    }


    self.addPlace = function(newPlace) {
        console.log('adding place', newPlace)
    }



    
}]);