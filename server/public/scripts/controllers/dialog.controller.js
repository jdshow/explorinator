myApp.controller('DialogController', ['UserService', 'PlacesService', '$mdDialog', '$mdToast', function (UserService, PlacesService, $mdDialog, $mdToast) {
    



       self.showImageDialog = function (ev, imageUrl) {
            $mdDialog.show({
                controller: 'DialogCtrl',
                controllerAs: 'ctrl',
                templateUrl: ''templates/image-dialog-template.html",
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: true,
                locals:{
                    imageUrl: imageUrl
                }
            })
        };

    .controller('DialogCtrl', function ($scope, $mdDialog, locals) {
        $scope.locals = locals;
    })