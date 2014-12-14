'use strict';

/**
 * @ngdoc filter
 * @name plannerApp.filter:daysInMonth
 * @function
 * @description
 * # daysInMonth
 * Filter in the plannerApp.
 */
angular.module('plannerApp')
        .filter('daysInMonth', function () {
            return function getDaysInMonth(month, year) {
                var date = new Date(year, month, 1);
                var days = [];
                while (date.getMonth() === month) {
                    days.push(new Date(date).getTime());
                    date.setDate(date.getDate() + 1);
                }
                return days;
            };
        });
