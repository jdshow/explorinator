myApp.controller('UserController', ['UserService', 'PlacesService', '$mdDialog', function (UserService, PlacesService, $mdDialog) {
  // console.log('UserController created');
  var self = this;
  self.userService = UserService;
  self.userObject = UserService.userObject;


}]);



