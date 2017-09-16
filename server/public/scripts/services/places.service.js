myApp.service('PlacesService', ['$http', function ($http) {

    var self = this;
    self.placesArray = { list: [] };
    self.markerArray = [];

    self.getPlaces = function () {
        $http.get('/places').then(function (response) {
            self.placesArray.list = response.data
        }).then(function () {
            self.buildMarkers(self.placesArray.list)
        })
    }

    self.addPlace = function (newPlace) {
        $http.post('/places', newPlace).then(function (response) {
            self.getPlaces();

        });
    };

    self.makeFave = function(place) { //changes place to explore to favorite place
        $http.put('places/fave', place).then(function(response) {
            self.getPlaces();            
        });
    }

    //full put route goes here
    self.udpatePlace = function(place) { //changes place to explore to favorite place
        $http.put('places', place).then(function(response) {
            self.getPlaces();            
        });
    }

    //delete route goes here
    self.deletePlace = function(place) {
        placeId = place.id;
        $http.delete('/places/' + placeId).then(function (response) {
            self.getPlaces();
        });
    }


    self.buildMarkers = function (array) {
        //builds an array of lat/long pairs and place name to create markers
        for (i = 0; i < array.length; i++) {
            marker = {
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
            //set icon based on place type
            if (array[i].placeType == "favorite") {
                marker.icon = "{ url:'/assets/FavePin.png', scaledSize:[40,40], origin: [0,0], anchor: [16,40] }"
                marker.typeName= "Favorite Place"
            } else {
                marker.icon = "{ url:'/assets/ExplorePin.png', scaledSize:[40,40], origin: [0,0], anchor: [16,40] }"
                marker.typeName = "Place to Explore"
                marker.explore = true;
            }
            self.markerArray.push(marker)
        }
    }






}]);