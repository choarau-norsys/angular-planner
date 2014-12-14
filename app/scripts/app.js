'use strict';

/**
 * @ngdoc overview
 * @name plannerApp
 * @description
 * # plannerApp
 *
 * Main module of the application.
 */
angular.module('plannerApp', ['ngRoute'])
        .config(function ($routeProvider) {
            $routeProvider
                    .when('/', {
                        templateUrl: 'views/main.html',
                        controller: 'MainCtrl'
                    })
                    .when('/my-planning', {
                        templateUrl: 'views/planning.html',
//                        controller: 'PlanningController'
                    })
                    .when('/my-resources', {
                        templateUrl: 'views/resources.html',
                        controller: 'ResourcesController'
                    })
                    .when('/my-resources/resource/:id?', {
                        templateUrl: 'views/edit-resource.html',
                        controller: 'EditResourceController'
                    })
                    .otherwise({
                        redirectTo: '/'
                    });
        })
        .run(function (resourceService) {
            resourceService.init();
        });
