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
                targetWidth: 1024
                
            };
            $cordovaCamera.getPicture(options).then(function(imageData) {
                $rootScope.image = "data:image/jpeg;base64," + imageData;
                localStorage.image = $rootScope.image;
                localStorage.step = 3;
                $rootScope.step = 3;
                
                $scope.imagencita("data:image/jpeg;base64," + imageData).then(
                  function(v){

                    $rootScope.imagebg = v;
                    localStorage.imagebg = v;
                    $location.path("/filters"); 
                  },
                  function(v){})

            }, function(err) {
              $rootScope.loading = false;  
            });
        }, false);
    };

    $scope.takePicture2 = function() {
      $rootScope.loading = true;  
        document.addEventListener("deviceready", function() {
            var options = {
                quality: 90,
                destinationType: Camera.DestinationType.DATA_URL,
                sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
                allowEdit: false,
                encodingType: Camera.EncodingType.JPEG,
                saveToPhotoAlbum: false,
                correctOrientation: true,
                targetWidth: 1024
                
            };
            $cordovaCamera.getPicture(options).then(function(imageData) {
                $rootScope.image = "data:image/jpeg;base64," + imageData;
                localStorage.image = $rootScope.image;
                localStorage.step = 3;
                $rootScope.step = 3

                $scope.imagencita("data:image/jpeg;base64," + imageData).then(
                  function(v){

                    $rootScope.imagebg = v;
                    localStorage.imagebg = v;
                    $location.path("/filters"); 
                  },
                  function(v){})

                
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

    $scope.imagencita = function(imagex) {
        var q = $q.defer();

        var image = new Image();
        image.src = imagex;   

        image.addEventListener('load', function() {
          
          var canvas = document.createElement('canvas');
          canvas.width = 60;
          canvas.height = 60;
          var ctx = canvas.getContext("2d");
          newheight=60;
          newwidth=60;
          if(image.height>image.width)
          var newheight =  60*(image.height/image.width) 
          else   
          var newwidth =  60*(image.width/image.height)

          ctx.drawImage(image,0,0,image.width,image.height,0,0,newwidth,newheight);
          q.resolve(canvas.toDataURL('image/jpeg',0.8));        

          });

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
    }


}).controller("filtersCtrl", function($scope, $rootScope, $location) {
    
    if(!$rootScope.sex)
      $rootScope.sex = 'w'


    $rootScope.loading = false;  

    if(!$rootScope.imagecopy)
    $rootScope.imagecopy = $rootScope.image;
    $rootScope.step = 3;
    localStorage.step = 3;
    if (!$rootScope.image) {
        $location.path("/camera");
    }
    //////aca empieda
    $scope.selhand = "no";


    $scope.changehand = function(act,dir) {
        var act = act+$rootScope.sex+dir
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

    $scope.changesex = function(sex){
    $rootScope.sex = sex   
    }

}).controller("sendCtrl", function($scope, $rootScope,$cordovaDialogs) {

if (!$rootScope.image) {
        $location.path("/camera");
}

$scope.si = function() {
 $cordovaDialogs.confirm(
'Your participation in "SAP Business One Around the World"  is subject to the SAP privacy statements. By selecting the "I agree" button you consent to the collection of your personal data and pictures. Your data will be processed and hosted by involvement of the following third party provider: Tasman Graphics, located in General Ramírez de Madrid, Bajo D - 28028 Madrid, Spain. Such consent includes that SAP may collect, store and process any personal data voluntarily provided by you on this App concerning only "SAP Business One Around the World" matters. Your pictures may be shared in SAP Business One social media channels (Facebook, Twitter and LinkedIn). If you do not wish to continue, do not select "I agree”.'
,"Terms and Conditions",["Accept","Decline"])
 .then(function(buttonIndex) {
     if(buttonIndex==1)
     $scope.f=true
      else
     $scope.f=false

    });
}

}).controller("homeCtrl", function($scope, $rootScope) {



}).controller("shareCtrl", function($scope, $rootScope,$cordovaSocialSharing,$cordovaDialogs) {
  if (!$rootScope.image) {
          $location.path("/camera");
  }

  $scope.fb = function(){
      $cordovaSocialSharing
        .shareViaFacebook('Automatic message generated from the app',$rootScope.imagecopy)
        .then(function(result) {
          // Success!
        }, function(err) {
          // An error occurred. Show a message to the user
          $cordovaDialogs.alert('Please install Facebook in you phone','Error')
        });
  };


  $scope.tw = function(){
      $cordovaSocialSharing
        .shareViaTwitter('Automatic message generated from the app',$rootScope.imagecopy)
        .then(function(result) {
          // Success!
        }, function(err) {
          $cordovaDialogs.alert('Please install Twitter in you phone','Error')
          // An error occurred. Show a message to the user
        });
  };


  $scope.in = function(){
      $cordovaSocialSharing
        .shareViaWhatsApp('Automatic message generated from the app',$rootScope.imagecopy)
        .then(function(result) {
          // Success!
        }, function(err) {
          $cordovaDialogs.alert('Please install LinkedIn in you phone','Error')
          // An error occurred. Show a message to the user
        });
  };


});