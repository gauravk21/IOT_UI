login.controller("user_homeController", function($scope, $rootScope){
    
    var videoPlaying = true;
    self.visitorArray = new Array();
    self.name = "";
    $scope.people = [];
    var previousArray = [];
    self.pIdArray = new Array();
    $scope.personDetected = "Detecting...";

    $rootScope.video = document.getElementById("v");
    $rootScope.getuserMedia = function() {
        return navigator.getUserMedia = navigator.getUserMedia ||
            navigator.webkitGetUserMedia ||
            navigator.mozGetUserMedia ||
            navigator.msGetUserMedia || null;
    }
    $rootScope.media = $rootScope.getuserMedia();
    $rootScope.video = document.getElementById("v");

    if ($rootScope.media) {
        var constraints = {
            video: true,
            audio: false
        };
        var media = navigator.getUserMedia(constraints, function(stream) {
            // URL Object is different in WebKit
            var url = window.URL || window.webkitURL;
            // create the url and set the source of the video element
            $rootScope.video.src = url ? url.createObjectURL(stream) : stream;
            // Start the video
            $rootScope.localStream = stream;
            $rootScope.video.play();
            videoPlaying = true;
        }, function(error) {
            console.log(error);
        });

        //-------------------------------------------------------------------
        // data to URI
        function dataURItoBlob(dataURI) {
            // convert base64/URLEncoded data component to raw binary data held in a string
            var byteString;
            if (dataURI.split(',')[0].indexOf('base64') >= 0)
                byteString = atob(dataURI.split(',')[1]);
            else
                byteString = unescape(dataURI.split(',')[1]);

            // separate out the mime component
            var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
            // write the bytes of the string to a typed array
            var ia = new Uint8Array(byteString.length);
            for (var i = 0; i < byteString.length; i++) {
                ia[i] = byteString.charCodeAt(i);
            }
            return new Blob([ia], { type: mimeString });
        }

        function captureImage(str) {
            var video = document.getElementById("v");
            var canvas = document.getElementById('canvas');
            var fd = new FormData();
            if (video) {
                if (canvas) {
                    canvas.width = 0;
                    canvas.height = 0;
                    canvas.width = video.videoWidth;
                    canvas.height = video.videoHeight;
                    canvas.getContext('2d').drawImage(video, 0, 0);
                    var dataURL = canvas.toDataURL('image/jpeg', 1);
                    var data = canvas.toDataURL('image/jpeg', 1);
                    var imageFile = dataURItoBlob(dataURL);
                    fd.append("image", imageFile);
  
                    //============get URL for image
                    $.ajax({
                        type: 'POST',
                        url: 'http://localhost:8080/api/v1/recogniseUser',
                        data: fd,
                        processData: false,
                        contentType: false
                    }).done(function(data) {
                        console.log(data);
                        $scope.$apply(function(){$scope.personDetected = data[0].name;});
                        // $scope.personDetected = data[0].name;
                        console.log($scope.personDetected);
                    })
                } else {
                    console.log("No canvas tag found");
                }
            } else {
                console.log("No video tag found");
            }
        }
  
    }

    // $rootScope.intervalId = setInterval(function() {
        // captureImage("From set Interval");
    // }, 3000);

    setTimeout(() => {
        // clearInterval($rootScope.intervalId);
        captureImage("From set Interval");
    }, 5000);

});