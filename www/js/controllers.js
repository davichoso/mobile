angular.module("app.controllers", []).controller("cameraCtrl", function($scope, $rootScope, $cordovaCamera, $cordovaImagePicker, $location, $q) {
    $rootScope.step = 2;
    localStorage.step = 2;
    $scope.takePicture = function() {
      $rootScope.loading = true;  
        document.addEventListener("deviceready", function() {
            var options = {
                quality: 90,
                destinationType: Camera.DestinationType.DATA_URL,
                sourceType: Camera.PictureSourceType.CAMERA,
                allowEdit: false,
                encodingType: Camera.EncodingType.JPEG,
                saveToPhotoAlbum: false,
                correctOrientation: true,
                targetWidth: 1200
                
            };
            $cordovaCamera.getPicture(options).then(function(imageData) {
                $rootScope.image = "data:image/jpeg;base64," + imageData;
                localStorage.image = $rootScope.image;
                localStorage.step = 3;
                $rootScope.step = 3;
                $location.path("/filters");
            }, function(err) {
              $rootScope.loading = false;  
            });
        }, false);
    };
    $scope.dodat = function(results) {
        var q = $q.defer();
        if (results) {
            window.plugins.Base64.encodeFile(results[0], function(base64) {
                q.resolve(base64);
            });
        } else {
          $rootScope.loading = false;  
            q.reject("NaN");
        }
        return q.promise;
    };
    $scope.takePicturefromlibrary = function() {
      $rootScope.loading = true;  
        var options = {
            maximumImagesCount: 1,
            width: 640,            
            quality: 90
        };
        $cordovaImagePicker.getPictures(options).then(function(results) {
            $scope.promise = $scope.dodat(results);
            $scope.promise.then(function(v) {
                $rootScope.image = v;
                localStorage.image = $rootScope.image;
                localStorage.step = 3;
                $rootScope.step = 3;
                $location.path("/filters");
            }, function(err) {
                console.log("error");
            });
        }, function(error) {
          $rootScope.loading = false;  
        });
    };
}).controller("filtersCtrl", function($scope, $rootScope, $location) {
    
    $rootScope.loading = false;  
    $rootScope.imagecopy = $rootScope.image;
    $rootScope.step = 3;
    localStorage.step = 3;
    if (!$rootScope.image) {
        $location.path("/camera");
    }
    //////aca empieda
    $scope.selhand = "no";




    $scope.changehand = function(act) {
        $scope.selhand = act;
        var exif, transform = "none";
////////////////////////////////////////////////////////////////////////////
       var imagemano = new Image();
       var image = new Image();
       image.src = $rootScope.image;
       imagemano.src = 'img/'+act+'.png';       
       var canvas = document.createElement('canvas');

       canvas.width = image.width;
       canvas.height = image.height;
       var ctx = canvas.getContext("2d");
       ctx.drawImage(image, 0, 0);
       /*here i have to get the proporcion*/
       var newwidth = canvas.width*0.6;
       var newheight =  newwidth*(imagemano.height/imagemano.width)           
       var abajo =  canvas.height-newheight;
       

        derecha=0;
       if(act.endsWith('r',3))
        derecha =  canvas.width-newwidth;

       /***/
       ctx.drawImage(imagemano,0,0,imagemano.width,imagemano.height,derecha,abajo,newwidth,newheight);
       $rootScope.imagecopy = canvas.toDataURL('image/jpeg',0.8); 

    }



}).controller("sendCtrl", function($scope, $rootScope) {

if (!$rootScope.image) {
        $location.path("/camera");
}





}).controller("homeCtrl", function($scope, $rootScope) {



}).controller("shareCtrl", function($scope, $rootScope) {

if (!$rootScope.image) {
        $location.path("/camera");
}


});