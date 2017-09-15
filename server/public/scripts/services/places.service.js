myApp.service('PlacesService', ['$http', function ($http) {

    var self = this;
    self.placesArray = { list: [] };
    self.markerArray = [];

    self.getPlaces = function () {
        $http.get('/places').then(function (response) {
            self.placesArray.list = response.data
            console.log('Place Service - self.placesArray.list:', self.placesArray.list)
        }).then(function () {
            console.log('in .then function of getPlaces, placesArray.list is', self.placesArray.list)
            self.buildMarkers(self.placesArray.list)
        })
    }

    self.addPlace = function (newPlace) {
        console.log('adding place', newPlace)
        $http.post('/places', newPlace).then(function (response) {
            console.log('service post response: ', response);
            self.getPlaces();

        });
    };

    self.updatePlace = function(placesArray) { //changes place to explore to favorite place
        console.log('in service, type change requested for', place);
        //update self.placesArray - call function to loop through self.placesArray to find and update , then send array through PUT to overwrite
        $http.put('places/fave', place).then(function(response) {
            console.log('service update response:', response);
            self.getPlaces();            
        });
    }

    //full put route goes here


    //delete route goes here

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