angular.module('app.routes', ['ionicUIRouter'])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
  

      /* 
    The IonicUIRouter.js UI-Router Modification is being used for this route.
    To navigate to this route, do NOT use a URL. Instead use one of the following:
      1) Using the ui-sref HTML attribute:
        ui-sref='tabsController.camera'
      2) Using $state.go programatically:
        $state.go('tabsController.camera');
    This allows your app to figure out which Tab to open this page in on the fly.
    If you're setting a Tabs default page or modifying the .otherwise for your app and
    must use a URL, use one of the following:
      /page1/tab1/camera
      /page1/tab4/camera
  */
        
        
        
        
        
  .state('home', {
    url: '/home',
    templateUrl:'templates/home.html'
  })

  .state('tabsController.filters', {
    url: '/filters',
    views: {
      'tab2': {
        templateUrl: 'templates/filters.html',
        controller: 'filtersCtrl'
      }
    }
  })

  .state('tabsController.send', {
    url: '/send',
    views: {
      'tab5': {
        templateUrl: 'templates/send.html',
        controller: 'sendCtrl'
      }
    }
  })

  .state('tabsController', {
    url: '/tab',
    templateUrl: 'templates/tabsController.html',
    abstract:true
  })

  .state('camera', {
    url: '/camera',
    templateUrl: 'templates/camera.html',
    controller: 'cameraCtrl'
  })

  .state('tabsController.share', {
    url: '/share',
    views: {
      'tab3': {
        templateUrl: 'templates/share.html',
        controller: 'shareCtrl'
      }
    }
  })

$urlRouterProvider.otherwise('/home')

  

});