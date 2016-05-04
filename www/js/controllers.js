angular.module("app.controllers", []).controller("cameraCtrl", function($scope, $rootScope, $cordovaCamera, $cordovaImagePicker, $location, $q) {
$rootScope.loading = false;  

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
              $rootScope.imagecopy = false;
                $scope.imagencita("data:image/jpeg;base64," + imageData).then(
                  function(v){
                    $rootScope.imagebg = v;
                    $rootScope.image = "data:image/jpeg;base64," + imageData;
                    $rootScope.loading = false;  
                    $rootScope.imagecopy = false;
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

              $rootScope.imagecopy = false;

                $scope.imagencita("data:image/jpeg;base64," + imageData).then(
                  function(v){
                    $rootScope.imagebg = v;
                    $rootScope.image = "data:image/jpeg;base64," + imageData;
                    $rootScope.loading = false;  
                    $rootScope.imagecopy = false;
                    $location.path("/filters"); 
                  },
                  function(v){})

                
            }, function(err) {
              $rootScope.loading = false;  
            });
        }, false);
    };


    // $scope.dodat = function(results) {
    //     var q = $q.defer();
    //     if (results) {
    //         window.plugins.Base64.encodeFile(results[0], function(base64) {
    //             q.resolve(base64);
    //         });
    //     } else {
    //       $rootScope.loading = false;  
    //         q.reject("NaN");
    //     }
    //     return q.promise;
    // };

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

    // $scope.takePicturefromlibrary = function() {
    //   $rootScope.loading = true;  
    //     var options = {
    //         maximumImagesCount: 1,
    //         width: 640,            
    //         quality: 90
    //     };
    //     $cordovaImagePicker.getPictures(options).then(function(results) {
    //         $scope.promise = $scope.dodat(results);
    //         $scope.promise.then(function(v) {
    //             $rootScope.image = v;
    //             localStorage.image = $rootScope.image;
    //             localStorage.step = 3;
    //             $rootScope.step = 3;
              
    //             $location.path("/filters");
    //         }, function(err) {
    //             console.log("error");
    //         });
    //     }, function(error) {
    //       $rootScope.loading = false;  
    //     });
    // }


}).controller("filtersCtrl", function($scope, $rootScope, $location) {
    
    if (!$rootScope.image) {
        $location.path("/camera");
    }

    $rootScope.loading = false;  
    if(!$rootScope.sex)
      $rootScope.sex = 'w'


    $rootScope.loading = false;  

    if(!$rootScope.imagecopy)
    $rootScope.imagecopy = $rootScope.image;

    
    //////aca empieda
    $scope.selhand = "no";


    $scope.changehand = function(act,dir) {
        
        if(act!='no')
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

}).controller("sendCtrl", function($scope, $rootScope,$cordovaDialogs,$http,$location) {



if (!$rootScope.image) {
        $location.path("/camera");
}



$scope.alb = function() {
  $rootScope.loading = true;
  localStorage.formul = JSON.stringify($rootScope.formu);

  $rootScope.formu.img = $rootScope.imagecopy;
    $http.post("http://www.tasman.es/clientes/galleryvoting/data/get.php",$rootScope.formu).success(function(v){
      $rootScope.loading = false;  
      $rootScope.idtoshare=v
      $location.path("/share")

    }).error(function(){$rootScope.loading = false;  });
} 


$scope.si = function() {
 $cordovaDialogs.confirm(
'Your participation in "SAP Business One Around the World" is subject to the SAP privacy statements. By selecting the "I agree" button you consent to the collection of your personal data and pictures. Your data will be processed and hosted by involvement of the following third party provider: Tasman Graphics, located in General Ramírez de Madrid, Bajo D - 28028 Madrid, Spain. Such consent includes that SAP may collect, store and process any personal data voluntarily provided by you on this App concerning only "SAP Business One Around the World" matters. Your pictures may be shared in SAP Business One social media channels (Facebook, Twitter and LinkedIn). If you do not wish to continue, do not select "I agree”.'
,"Terms and Conditions",["Accept","Decline"])
 .then(function(buttonIndex) {
     if(buttonIndex==1)
     $scope.formu.conditions=true
      else
     $scope.formu.conditions=false

    });
}

}).controller("homeCtrl", function($scope, $rootScope) {
$rootScope.loading = false;  


}).controller("shareCtrl", function($scope, $rootScope,$cordovaSocialSharing,$cordovaDialogs) {
  if (!$rootScope.image) {
          $location.path("/camera");
  }


  $scope.lin = function(){
    window.open('https://www.linkedin.com/shareArticle?mini=true&url=http%3A%2F%2Ftasman.es%2Fclientes%2Fgalleryvoting%2Fshare%2Findex.php%3Fp%3D' + $rootScope.idtoshare + '&title=SAP%20AROUND%20THE%20WORD&summary=Take%20a%20picture%20of%20a%20recognizable%20landmark%20in%20your%20city%20or%20country%2C%20add%20a%20card%20frame%20and%20take%20part%20of%20a%20worldwide%20experience.%20SAP%20will%20donate%201%20Euro%20to%20the%20building%20of%20a%20SAP%20Business%20One%20kitchen%20for%20orphaned%20children%20in%20Kampala%2C%20Uganda%20for%20each%20shared%20picture&source=app', '_blank', 'location=yes')
  };


  $scope.fb = function(){
      $cordovaSocialSharing
        .shareViaFacebook('#SAPBusinessOne',$rootScope.imagecopy)
        .then(function(result) {
          // Success!
        }, function(err) {
          // An error occurred. Show a message to the user
// https://www.facebook.com/sharer/sharer.php?u=
          if($rootScope.idtoshare)
          window.open('https://www.facebook.com/sharer/sharer.php?u=http%3A%2F%2Ftasman.es%2Fclientes%2Fgalleryvoting%2Fshare%2Findex.php%3Fp%3D' + $rootScope.idtoshare , '_blank', 'location=yes')
          else
          $cordovaDialogs.alert('Please install Facebook in you phone or send the photo in the previous step','Error')
        });
  };


  $scope.tw = function(){
      $cordovaSocialSharing
        .shareViaTwitter('#SAPBusinessOne',$rootScope.imagecopy)
        .then(function(result) {
          // Success!
        }, function(err) {

           if($rootScope.idtoshare)
          window.open('https://mobile.twitter.com/compose/tweet?status=http%3A//tasman.es/clientes/galleryvoting/share/index.php%3Fp%3D' + $rootScope.idtoshare , '_blank', 'location=yes')
           else
           $cordovaDialogs.alert('Please install Twitter in your phone','Error')
          // An error occurred. Show a message to the user
        });
  };


  $scope.in = function(){
      $cordovaSocialSharing
        .shareViaWhatsApp('#SAPBusinessOne',$rootScope.imagecopy)
        .then(function(result) {
          // Success!
        }, function(err) {
          $cordovaDialogs.alert('Please install LinkedIn in you phone','Error')
          // An error occurred. Show a message to the user
        });
  };


});