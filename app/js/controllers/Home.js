login.controller("HomeController", function($scope, $state) {
    console.log("In-home controller");

    $scope.Registration = function() {
        $state.go("Registration_1");
    }

    $scope.Login = function() {
        if ($scope.uname == 'admin' && $scope.pass == 'admin') {
            $state.go("user_home");
        } else {
            window.alert('invalid_credentials');
        }
    }
});