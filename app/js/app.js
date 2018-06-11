var login = angular.module("login", ['ui.router']);

login.config(function($stateProvider, $urlRouterProvider) {

    //------ CORS Handle

    // $httpProvider.defaults.useXDomain =
    //     true;

    // delete $httpProvider.defaults.headers.common['X-Requested-With'];

    //------ Routing

    $urlRouterProvider.otherwise("/Home");

    $stateProvider
        .state('Home', {
            url: "/Home",
            templateUrl: "app/views/Home.html",
            controller: "HomeController",
            controllerAs: "HC"
        })

    .state('Registration_1', {
        url: "/Registration_1",
        templateUrl: "app/views/Registration_1.html",
        controller: "Registration1Controller",
        controllerAs: "RFC"
    })

    .state('Registration_2', {
        url: "/Registration_2",
        templateUrl: "app/views/Registration_2.html",
        controller: "Registration2Controller",
        controllerAs: "RSC"
    })

    .state('user_home', {
        url: "/user_home",
        templateUrl: "app/views/user_home.html",
        controller: "user_homeController",
        controllerAs: "UC"
    })

    .state('Admin_home', {
        url: "/Admin_home",
        templateUrl: "app/views/Admin_home.html",
        controller: "Admin_homeController",
        controllerAs: "AC"
    })

});