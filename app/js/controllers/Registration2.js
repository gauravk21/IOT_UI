login.controller("Registration2Controller", function($scope, $state, $commonFactories, $rootScope, $timeout, $window) {

    console.log("In-Registration2  controller");

    const record = document.getElementById('record')
    const stop = document.getElementById('stop')

    $scope.registerFlag = false;

    if (!navigator.mediaDevices) {
        alert('getUserMedia support required to use this page')
    }

    const chunks = []
    let onDataAvailable = (e) => {
        chunks.push(e.data)
    }

    // Not showing vendor prefixes.
    navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {
            width: { ideal: 640 },
            height: { ideal: 480 }
        }
    }).then((mediaStream) => {
        const recorder = new MediaRecorder(mediaStream)
        recorder.ondataavailable = onDataAvailable
        const video = document.querySelector('video')
        const url = window.URL.createObjectURL(mediaStream)
        video.src = url

        record.onclick = () => {
            recorder.start();
            $scope.registerFlag = false;
            document.getElementById('status').innerHTML = 'recorder started';
            console.log(recorder.state);
            console.log('recorder started');
            $timeout(function() {
                recorder.stop();
                $scope.registerFlag = true;
                console.log(recorder.state);
                document.getElementById('status').innerHTML = 'recorder stopped';
                console.log('recorder stopped');
            }, 5000);
        }

        video.onloadedmetadata = (e) => {
            console.log('onloadedmetadata', e)
        }

        recorder.onstop = (e) => {
            console.log('e', e);
            console.log('chunks', chunks);
            $scope.chunks = chunks;
        }
    }).catch(function(err) {
        console.log('error', err);
    })


    $scope.registerVideo = function() {
        $timeout(function() {
            console.log($scope.chunks);
            const bigVideoBlob = new Blob(chunks, { 'type': 'video/webm; codecs=webm' })
            let fd = new FormData()
            fd.append('video', bigVideoBlob);
            const userData = JSON.parse($window.localStorage.getItem('userData'));
            const user_id = userData[0].person_id;
            fd.append('user_id', user_id + '.mp4')
            $.ajax({
                type: 'POST',
                url: 'http://localhost:8080/api/v1/registerUser',
                data: fd,
                processData: false,
                contentType: false
            }).done(function(data) {
                console.log(data)




                
            })
        }, 2000);

    }


    $scope.gotoHome = function() {
        $state.go("Home");
    }

});