myApp.service('PlacesService', ['$http', function($http){
 npm


    self.getPlaces = function() {
        $http.get('/places').then(function(response){
            self.returnedPlaces.list = response.data
            console.log('places returned:', self.returnedPlaces )
        })
    }
}]);