'use strict';

/**
 * @ngdoc directive
 * @name plannerApp.directive:planner
 * @description
 * # planner
 */
angular.module('plannerApp')
        .directive('planner', function () {
            return {
                templateUrl: 'views/directives-tpl/planner.html',
                transclude: true,
                restrict: 'E',
                replace: true,
                scope: {},
                controller: function ($scope, $filter, resourceService) {
                    
                    var dates = $filter('daysInMonth')(11, 2014);

                    var activities = [
                        {label: "TMA"},
                        {label: "AT"},
                        {label: "Formation"},
                        {label: "Congés"}
                    ];

                    $scope.planningDate = "Décembre 2014";

                    this.getResources = function () {
                        return resourceService.getResources();
                    };

                    this.getDates = function () {
                        return dates;
                    };

                    this.getActivities = function () {
                        return activities;
                    };
                    
                    this.updateResource = function (resource) {
                        resourceService.saveResource(resource);
                    };
                },
                link: function postLink(scope, element, attrs) {

                }
            };
        });
