angular.module('app.controllers', [])
  
.controller('cameraCtrl', function($scope,$rootScope,$cordovaCamera) {
$rootScope.step=2;
localStorage.step = 2;

$scope.takePicture = function()
{
	
	  document.addEventListener("deviceready", function () {

	    var options = {
	      quality: 80,
	      destinationType: Camera.DestinationType.DATA_URL,
	      sourceType: Camera.PictureSourceType.CAMERA,
	      allowEdit: true,
	      encodingType: Camera.EncodingType.JPEG,
	      popoverOptions: CameraPopoverOptions,
	      saveToPhotoAlbum: false,
		  correctOrientation:true
	    };

	    $cordovaCamera.getPicture(options).then(function(imageData) {
	      $rootScope.image = "data:image/jpeg;base64," + imageData;
	    }, function(err) {
	      alert('Error, please try again')
	    });

	  }, false);
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
 