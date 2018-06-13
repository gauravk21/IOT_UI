login.controller("Registration1Controller", function($scope, $state, $window, $commonFactories, $rootScope) {

    console.log("In-Registration1  controller");

    $scope.nextButtonAction = function() {
        try {
            var payload = {
                "fName": $scope.firstName,
                "lName": $scope.lastName,
                "dob": $scope.dob,
                "emailId": $scope.emailId,
                "rollNo": $scope.rollNo,
                "password": $scope.password,
                "mobileNumber": $scope.mobileNo,
                "gender": $scope.male || $scope.female,
                "city": $scope.cityName,
                "state": $scope.stateName,
                "country": $scope.countryName
            }
            console.log(payload);
            $commonFactories.registerUser(payload)
                .then(function successCallback(response) {
                    console.log(response);
                    if (response.status == "200") {
                        var resData = response.data;
                        $window.alert(resData[0].message);
                        $window.localStorage.setItem('userData', resData);
                        $state.go("Registration_2");
                    } else {
                        // console.log("Responce for login in:", $scope.loginResponceData);
                        // $rootScope.isUserLoggedIn = true;
                    }
                });
        } catch (err) {
            console.log(err);
        }
    }







});