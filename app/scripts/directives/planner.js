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
                        {label: "TMA", count: 0},
                        {label: "AT", count: 0},
                        {label: "Formation", count: 0},
                        {label: "Congés", count: 0}
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

                        // sauvegarde de la resource
                        resourceService.saveResource(resource).then(function () {
                            $scope.updateTotals();
                        });
                    };

                    $scope.updateTotals = function updateTotals() {
                        resourceService.getResources().then(function (resources) {
                            $scope.totals = angular.copy(activities);
                            angular.forEach(resources, function (resource) {
                                angular.forEach(resource.activities, function (resAct) {
                                    angular.forEach($scope.totals, function (act) {
                                        if (act.label === resAct.label) {
                                            act.count = act.count + 1;
                                        }
                                    });
                                });
                            });
                        });
                    }
                },
                link: function postLink(scope, element, attrs) {
                    scope.updateTotals();
                }
            };
        });
