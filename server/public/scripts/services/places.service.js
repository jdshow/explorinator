myApp.service('PlacesService', ['$http', function ($http) {

    var self = this;
    self.placesArray = { list: [] };
    self.markerArray = { list: [] };
    self.markersAfterFilter = [];
    self.publicCategories = { list: [] };
    self.bounds = new google.maps.LatLngBounds();
    self.noMatchingPlaces = { status: false };
    self.userExists = { status: true };
    self.placeToEdit = {};
    self.firstLogin = false;
    self.publicFlag = { status: false };

    //map load services
    self.getPlaces = function () {
        console.log('places service - getPlaces()')
        $http.get('/places').then(function (response) {
            self.markerArray.list = [];
            self.placesArray.list = response.data
            self.buildMarkers(self.placesArray.list, self.publicFlag);
            console.log('marker array in service is', self.markerArray.list)
        })

    }

    self.getPlaces();

    self.getPublicPlaces = function (userName) {
        $http.get('/places/public/' + userName).then(function (response) {
            self.markerArray.list = [];
            self.placesArray.list = response.data
            console.log('public places', self.placesArray, 'public markers', self.markerArray)
            self.buildMarkers(self.placesArray.list, self.publicFlag);
        })
    }

    self.getUserCatsByName = function (userName) {
        console.log('username is', userName)
        $http.get('/places/public/cats/' + userName).then(function (response) {
            self.public = response.data;
            console.log('response.data', response.data)
            console.log('self.public', self.public)

            if (response.data.length > 0) {
                self.publicCategories.list = self.public[0].categories
                console.log('self.publicCategories', self.publicCategories.list)
                self.userExists.status = true;
                self.userExists.public = true;
            } else {
                self.userExists.status = false;
            }


        })
    }


    // self.buildMarkers = function (array) {
    //     //builds an array of lat/long pairs and place name to create markers    
    //     console.log('places service, build markers: array.length:', array.length)
    self.buildMarkers = function (array, publicFlag) {
        console.log('places service - buildMarkers()')
        //builds an array of lat/long pairs and place name to create markers
       // console.log('public flag is', self.publicFlag.status)
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
                marker.icon = "{ url:'/styles/assets/if_heart_1055045.svg', scaledSize:[40,40], origin: [0,0], anchor: [16,40] }"
            } else {
                marker.icon = "{ url:'/styles/assets/if_compass_1055086.svg', scaledSize:[40,40], origin: [0,0], anchor: [16,40] }"
                marker.explore = true;
            }
            var latlng = new google.maps.LatLng(array[i].lat, array[i].long)
            self.bounds.extend(latlng)
            self.markerArray.list.push(marker)
        }
        self.masterMarkers = self.markerArray.list;
        //call setbounds with public flag;

    }



    //map filter services
    self.filterMarkers = function (mapFilter) {
        self.markersAfterFilter = [];

        if (mapFilter.type && mapFilter.category) {
            filterCount = 2;
        } else if (mapFilter.type || mapFilter.category) {
            filterCount = 1;
        }

        console.log('Places Service: filterMarkers - filter is', mapFilter, 'filterCount', filterCount)
        console.log('self.markerArray.list before loops', self.markerArray.list)
        console.log('self.masterMarkers', self.masterMarkers)

        if (filterCount == 1 && mapFilter.type) {
            self.filterByType(mapFilter.type)
            console.log('calling filterByType')
        } else if (filterCount == 1 && mapFilter.category) {
            self.filterByCat(mapFilter.category)
            console.log('calling filterByCat')
        } else if (filterCount == 2) {
            self.filterByMany(mapFilter.type, mapFilter.category)
            console.log('calling filterByMany')
        }

        self.markerArray.list = self.markersAfterFilter
        if (self.markersAfterFilter.length == 0) {
            self.noMatchingPlaces.status = true;
        } else {
            self.noMatchingPlaces.status = false;
        }
        console.log('no matching places in service', self.noMatchingPlaces.status)
        console.log('self.markerArray.list after loops', self.markerArray.list)

    }


    self.filterByCat = function (catFilter) {
        console.log('in findCat, catFilter is ', catFilter)
        console.log('self.markerArray.list.length', self.markerArray.list.length)
        for (i = 0; i < self.masterMarkers.length; i++) {
            if (self.masterMarkers[i].category) {
                if (self.masterMarkers[i].category.includes(catFilter)) {
                    console.log('Found', catFilter)
                    self.markersAfterFilter.push(self.masterMarkers[i])
                }
            }
        }
    }

    self.filterByType = function (typeFilter) {
        console.log('typeFilter is ', typeFilter)
        for (i = 0; i < self.masterMarkers.length; i++) {
            if (self.masterMarkers[i].type.includes(typeFilter)) {
                console.log('Found', typeFilter)
                self.markersAfterFilter.push(self.masterMarkers[i])
            }
        }
    }

    self.filterByMany = function (typeFilter, catFilter) {
        console.log('in filter by many')
        for (i = 0; i < self.masterMarkers.length; i++) {
            if (self.masterMarkers[i].type.includes(typeFilter)) {
                console.log('found type', typeFilter);
                if (self.masterMarkers[i].category.includes(catFilter)) {
                    console.log('Found both', typeFilter, catFilter)
                    self.markersAfterFilter.push(self.masterMarkers[i])
                } else {
                    console.log('not both')
                }
            } else {
                console.log('no match')
            }
        }
    }


    //new place service
    self.addPlace = function (newPlace) {
        console.log('place to add in service: ', newPlace)
        $http.post('/places', newPlace).then(function (response) {
            self.getPlaces();
        });
    };


    //edit place services
    self.updatePlace = function (place) { //changes place to explore to favorite place
        console.log('place in service is ', place)
        $http.put('/places', place).then(function (response) {
            self.getPlaces();
        });
    }

    self.editData = function (data) {
        self.placeToEdit = data;
    }


    self.makeFave = function (place) { //changes place to explore to favorite place
        $http.put('/places/fave', place).then(function (response) {
            self.getPlaces();
        });
    }


    //delete place service
    self.deletePlace = function (place) {
        placeId = place.id;
        $http.delete('/places/' + placeId).then(function (response) {
            self.getPlaces();
        });
    }


    self.getPublicPlaces()
   // self.getPlaces();

}]);