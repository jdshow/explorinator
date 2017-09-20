myApp.service('PlacesService', ['$http', function ($http) {

    var self = this;
    self.placesArray = { list: [] };
    self.markerArray = { list: [] };
    self.markersAfterFilter = [];

    self.getPlaces = function () {
        $http.get('/places').then(function (response) {
            self.markerArray.list = [];
            self.placesArray.list = response.data
            self.buildMarkers(self.placesArray.list);
        })
    }


    self.getPublicPlaces = function (userName) {
        $http.get('/places/public/' + userName).then(function (response) {
            self.markerArray.list = [];
            self.placesArray.list = response.data
            console.log('public places', self.placesArray, 'public markers', self.markerArray)
            self.buildMarkers(self.placesArray.list);
        })
    }



    self.addPlace = function (newPlace) {
        console.log('place to add in service: ', newPlace)
        $http.post('/places', newPlace).then(function (response) {
            self.getPlaces();
        });
    };


    self.updatePlace = function (place) { //changes place to explore to favorite place
        console.log('place in service is ', place)
        $http.put('/places', place).then(function (response) {
            self.getPlaces();
        });
    }

    self.makeFave = function (place) { //changes place to explore to favorite place
        $http.put('/places/fave', place).then(function (response) {
            self.getPlaces();
        });
    }


    self.deletePlace = function (place) {
        placeId = place.id;
        $http.delete('/places/' + placeId).then(function (response) {
            self.getPlaces();
        });
    }

    self.editData = function (data) {
        self.placeToEdit = data;
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
                type: array[i].placeType,
                website: array[i].website
            }
            //set icon based on place type
            if (array[i].placeType == "Favorite Place") {
                marker.icon = "{ url:'/assets/FavePin.png', scaledSize:[40,40], origin: [0,0], anchor: [16,40] }"
            } else {
                marker.icon = "{ url:'/assets/ExplorePin.png', scaledSize:[40,40], origin: [0,0], anchor: [16,40] }"
                marker.explore = true;
            }
            self.markerArray.list.push(marker)
        }
    }

    self.filterMarkers = function (mapFilter) {
        self.markersAfterFilter = [];  

        if (mapFilter.type && mapFilter.category) {
            filterCount = 2;
        } else if (mapFilter.type || mapFilter.category) {
            filterCount = 1;
        }

        console.log('filter is', mapFilter, 'filterCount', filterCount)

        if (filterCount == 1 && mapFilter.type) {
            self.filterByType(mapFilter.type)
        } else if (filterCount == 1 && mapFilter.category) {
            self.filterByCat(mapFilter.category)
        } else if (filterCount == 2) {
            self.filterByMany(mapFilter.type, mapFilter.category)
        }


        self.markerArray.list = self.markersAfterFilter
    }

    self.filterByCat = function (catFilter) {
        console.log('in findCat, catFilter is ', catFilter)
        console.log('self.markerArray.list.length', self.markerArray.list.length)
        for (i = 0; i < self.markerArray.list.length; i++) {
            if (self.markerArray.list[i].category.includes(catFilter)) {
                console.log('Found', catFilter)
                self.markersAfterFilter.push(self.markerArray.list[i])
            }
        }
    }

    self.filterByType = function (typeFilter) {
        console.log('typeFilter is ', typeFilter)
        for (i = 0; i < self.markerArray.list.length; i++) {
            if (self.markerArray.list[i].type.includes(typeFilter)) {
                console.log('Found', typeFilter)
                self.markersAfterFilter.push(self.markerArray.list[i])
            }
        }
    }

    self.filterByMany = function (typeFilter, catFilter) {
        console.log('in filter by many')
        for (k = 0; k < self.markerArray.list.length; k++) {
            if (self.markerArray.list[k].type.includes(typeFilter)){
                console.log('found type', typeFilter);
                if (self.markerArray.list[k].category.includes(catFilter)) {
                    console.log('Found both', typeFilter, catFilter)
                    self.markersAfterFilter.push(self.markerArray.list[k])
                }
            }
        }
    }



    self.getPublicPlaces()



}]);