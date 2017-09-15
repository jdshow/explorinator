myApp.service('PlacesService', ['$http', function ($http) {

    var self = this;
    self.placesArray = { list: [] };
    self.markerArray = [];

    self.getPlaces = function () {
        $http.get('/places').then(function (response) {
            self.placesArray.list = response.data
            console.log('places returned:', self.placesArray.list)
        }).then(function () {
            console.log('in .then function of getPlaces, placesArray.list is', self.placesArray.list)
            self.buildMarkers(self.placesArray.list)
        })
    }

    self.buildMarkers = function (array) {
        //builds an array of lat/long pairs and place name to create markers
        // console.log('passed array', array)
        for (i = 0; i < array.length; i++) {
            marker = {
                // map: map,
                lat: array[i].lat,
                lng: array[i].long,
                title: array[i].name,
                notes: array[i].notes,
                id: array[i]._id,
                address: array[i].address, 
                private: array[i].private,
                category: array[i].category,
                priceRange: array[i].priceRange,
                type: array[i].type
            }
            //if type = set icon
            if (array[i].placeType == "favorite") {
                marker.icon = "{ url:'/assets/FavePin.png', scaledSize:[40,40], origin: [0,0], anchor: [16,40] }"
                marker.typeName= "Favorite Place"
            } else {
                marker.icon = "{ url:'/assets/ExplorePin.png', scaledSize:[40,40], origin: [0,0], anchor: [16,40] }"
                marker.typeName = "Place to Explore"
            }
            //marker.addListener('click', toggleBounce)
            self.markerArray.push(marker)
        }
        // console.log('markerArray:', markerArray)
    }



    self.addPlace = function (newPlace) {
        console.log('adding place', newPlace)
        $http.post('/places', newPlace).then(function (response) {
            console.log('service post response: ', response);
            self.getPlaces();

        });
    };


}]);