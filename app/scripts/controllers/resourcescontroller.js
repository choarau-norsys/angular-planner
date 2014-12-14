'use strict';

/**
 * @ngdoc function
 * @name plannerApp.controller:ResourcesController
 * @description
 * # ResourcesController
 * Controller of the plannerApp
 */
angular.module('plannerApp')
        .controller('ResourcesController', function ($scope, resourceService) {

            if (resourceService.isSupported()) {
                resourceService.getResources().then(function (resources) {
                    $scope.resources = resources;
                });
            }

            $scope.deleteResource = function (id, index) {
                resourceService.deleteResource(parseInt(id, 10)).then(function () {
                    $scope.resources.splice(index, 1);
                });
            };
        })
        .controller('EditResourceController', function ($scope, $location, $routeParams, resourceService) {

            if ($routeParams.id) {
                resourceService.getResource(parseInt($routeParams.id, 10)).then(function (resource) {
                    $scope.resource = resource;
                });
            }

            $scope.saveResource = function (resource) {
                resourceService.saveResource(resource).then(function () {
                    $location.path('/my-resources');
                });
            };

        });
