myApp.service('PlacesService', ['$http', function($http){
    var self = this;
    self.returnedPlaces = { list: [] };


    self.getPlaces = function() {
        $http.get('/places').then(function(response){
            self.returnedPlaces.list = response.data
            console.log('places returned:', self.returnedPlaces )
        })
    }
}]);