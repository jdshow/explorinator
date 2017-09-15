myApp.controller('MaterialController', function($mdDialog, $mdToast) {
    console.log('MaterialController Loaded');
    
    var vm = this;

    vm.showAlert = function(ev) {
        $mdDialog.show(
            $mdDialog.alert()
            .parent(angular.element(document.querySelector('#popupContainer')))
            .title('This is an alert')
            .textContent('You can specify some description text here')
            .ariaLabel('Alert Dialog Demo')
            .ok('Got it!')
            .targetEvent(ev)
        );
    };

    vm.showToast = function (ev) {
        $mdToast.show(
            $mdToast.simple()
            .textContent('Hello!')
        );
    }
});