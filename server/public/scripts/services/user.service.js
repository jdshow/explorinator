myApp.factory('UserService', function ($http, $location) {
  //console.log('UserService Loaded');
  // self.returnedPlaces = { list: [] };
  var userObject = {};
  var categories = { list: [] };


  return {
    userObject: userObject,
    categories: categories,



    getuser: function () {
      // console.log('UserService -- getuser');
      $http.get('/user').then(function (response) {
        if (response.data.username) {
          // user has a curret session on the server
          userObject.userName = response.data.username;
          userObject.categories = response.data.categories;
          categories.list = response.data.categories;
          console.log('UserService -- getuser -- User Data: ', userObject);
          console.log('categories.list', categories.list)
          console.log('userObject.categories', userObject.categories)
        } else {
          console.log('UserService -- getuser -- failure');
          // user has no session, bounce them back to the login page
          $location.path("/home");
        }
      }, function (response) {
        console.log('UserService -- getuser -- failure: ', response);
        $location.path("/home");
      });
    },

    logout: function () {
      console.log('UserService -- logout');
      $http.get('/user/logout').then(function (response) {
        console.log('UserService -- logout -- logged out');
        $location.path("/home");
      });
    },

    addCat: function (cat) {
      console.log('cat is ', cat)
      var category = { category: cat };
      $http.put('/user/cats', category).then(function (response) {
        //getUser();
      }).then(function (response) {
        $http.get('/user').then(function (response) {
          if (response.data.username) {
            // user has a curret session on the server
            userObject.userName = response.data.username;
            userObject.categories = response.data.categories;
            categories.list = response.data.categories;
            console.log('categories.list', categories.list)
            console.log('userObject.categories', userObject.categories)
          } else {
            console.log('UserService -- getuser -- failure');
            // user has no session, bounce them back to the login page
            $location.path("/home");
          }
        });
      });
    },


  };
});
