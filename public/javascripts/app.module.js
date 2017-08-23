(function (){
    angular.module('app.robo', [
        'ui.router',
        'ngSanitize',
        'ui.bootstrap',
        'mwl.confirm',
        'angularNotify'

    ])

    .config(function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider){

        $httpProvider.interceptors.push('TokenInterceptor');

        $urlRouterProvider.otherwise('/home');

        $stateProvider

            .state('home', {
                url: '/home',
                templateUrl: '/app/robo.html',
                controller: 'RoboController',
            })

            /*.state('game', {
                url: '/game',
                templateUrl: '/app/game.html',
                controller: 'GameController'
            })*/

            .state('cup', {
                url: '/cup',
                templateUrl: '/app/cup.html',
                controller: 'CupController'
            })

            .state('team', {
                url: '/team',
                templateUrl: '/app/team.html',
                controller: 'TeamController'
            })

            .state('login', {
                url: '/login',
                templateUrl: '/auth/login.html',
                controller: 'LoginController'
            })

            .state('news', {
                url: '/news',
                templateUrl: '/app/news.html',
                controller: 'NewsController'
            })

            .state('adm', {
                url: '/adm',
                templateUrl: '/auth/adm.html',
                controller: 'AdmController'
            })
    });
})();