login.controller("HomeController", function($scope, $state) {
    console.log("In-home controller");

    $scope.Registration = function() {
        $state.go("Registration_1");
    }

});