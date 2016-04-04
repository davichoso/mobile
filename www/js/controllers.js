angular.module('app.controllers', [])
  
.controller('cameraCtrl', function($scope,$rootScope,$cordovaCamera,$cordovaImagePicker,$location,$q) {
$rootScope.step=2;
localStorage.step = 2;

$scope.takePicture = function()
{
	
	  document.addEventListener("deviceready", function () {

	    var options = {
	      quality: 80,
	      destinationType: Camera.DestinationType.DATA_URL,
	      sourceType: Camera.PictureSourceType.CAMERA,
	      allowEdit: false,
	      encodingType: Camera.EncodingType.JPEG,
	      saveToPhotoAlbum: false,
		  correctOrientation:true
	    };

	    $cordovaCamera.getPicture(options).then(function(imageData) {
	      $rootScope.image = "data:image/jpeg;base64," + imageData;
	      localStorage.image = $rootScope.image;
	      localStorage.step = 3;
	      $rootScope.step = 3;
	      $location.path('/filters');     

	    }, function(err) {
	      
	    });

	  }, false);
}



$scope.dodat = function (results)
   {   
   	var q = $q.defer() 
   	if(results)   	
    { 
		  window.plugins.Base64.encodeFile(results[0], function(base64){    
	      q.resolve(base64)                             
	   });        
    }
    else
    {
    	q.reject('NaN');
    }
    return q.promise
   }


$scope.takePicturefromlibrary = function()
{

var options = {
   maximumImagesCount: 1,
   width: 800,
   height: 800,
   quality: 80
  };
  $cordovaImagePicker.getPictures(options)
    .then(function (results) {
    $scope.promise = $scope.dodat(results);
    $scope.promise.then(function(v){

    		$rootScope.image = v;
    		localStorage.image = $rootScope.image;
    		localStorage.step = 3;
    		$rootScope.step = 3;
    		$location.path('/filters');     

    	},function(err){
    		console.log('error');
    	});

    }, function(error) {
      // error getting photos
    });



}

})
   
.controller('filtersCtrl', function($scope,$rootScope,$location) {
$rootScope.step=3;
localStorage.step = 3;	
if(!$rootScope.image)
{
	$location.path('/camera');
}
})
   
.controller('sendCtrl', function($scope) {

})
      
.controller('homeCtrl', function($scope) {

})
   
.controller('shareCtrl', function($scope) {

})
 