'use strict';
/**
 * @ngdoc directive
 * @name plannerApp.directive:plannerLine
 * @description
 * # plannerLine
 */
angular.module('plannerApp')
        .directive('plannerLines', function () {
            return {
                templateUrl: 'views/directives-tpl/planner-lines.html',
                require: '^planner',
                restrict: 'E',
                replace: true,
                scope: {},
                link: function (scope, element, attrs, plannerController) {
                    plannerController.getResources().then(function (resources) {
                        scope.resources = resources;
                    });

                    scope.dates = plannerController.getDates();
                    
                    scope.activities = plannerController.getActivities();
                    
                    scope.updateResource = function(resource) {
                        plannerController.updateResource(resource);
                    };
                }
            };
        });
