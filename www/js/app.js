// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('app', ['ionic', 'app.controllers', 'app.routes', 'app.services', 'app.directives','ngCordova'])

.run(['$ionicPlatform','$rootScope','$location',function($ionicPlatform,$rootScope,$location) {
  
  if (localStorage.image) {
            $rootScope.image = localStorage.image;
  }

  if (localStorage.step) {
            $rootScope.step = localStorage.step;
  }
  else
  {
    $rootScope.step = 1;
    localStorage.step = 1;
  }


  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });

  $rootScope.$on('$stateChangeStart',function(event, toState, toParams, fromState, fromParams)
  { 
    $rootScope.state = toState.name; 
    // $rootScope.loading = true;  

  })

  // $rootScope.$on('$stateChangeSuccess',function(event, toState, toParams, fromState, fromParams)
  // { 
  //   $rootScope.loading = false;  
  // })

}])
.config(function($ionicConfigProvider) {

    
    $ionicConfigProvider.views.transition('none');

})
.directive("navbar", function() {
  return {
      restrict: "E",
      templateUrl: "partials/navbar.html",
      replace: true
  }            
})
.directive("fileread", ['$rootScope','$location',function ($rootScope,$location) {
    return {
        scope: {
            fileread: "="
        },
        link: function (scope, element, attributes) {
            element.bind("change", function (changeEvent) {
                var reader = new FileReader();
                reader.onload = function (loadEvent) {
                    scope.$apply(function () {                       
                        $rootScope.image = loadEvent.target.result;
                        localStorage.image = $rootScope.image;
                        localStorage.step = 3;
                        $rootScope.step = 3;
                        $location.path('/filters');
                    });
                }
                reader.readAsDataURL(changeEvent.target.files[0]);
                //console(changeEvent.target.files[0]);
            });
        }
    }
}])