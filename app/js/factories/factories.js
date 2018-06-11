login.factory('$commonFactories', function($http) {

    var factory = {};

    factory.registerUser = function(payload) {
        return $http({
            "method": 'POST',
            "url": "http://10.10.209.85:8080/api/v1/createUser",
            "data": payload,
            "Content-Type": "application/JSON"
        });
    };

    return factory;

})