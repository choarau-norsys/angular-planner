'use strict';

/**
 * @ngdoc filter
 * @name plannerApp.filter:fullName
 * @function
 * @description
 * # fullName
 * Filter in the plannerApp.
 */
angular.module('plannerApp')
  .filter('fullName', function () {
    return function (input) {
      return input.firstName + " " + input.lastName;
    };
  });
