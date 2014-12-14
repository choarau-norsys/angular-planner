'use strict';

describe('Filter: daysInMonth', function () {

  // load the filter's module
  beforeEach(module('plannerApp'));

  // initialize a new instance of the filter before each test
  var daysInMonth;
  beforeEach(inject(function ($filter) {
    daysInMonth = $filter('daysInMonth');
  }));

  it('should return the input prefixed with "daysInMonth filter:"', function () {
    var text = 'angularjs';
    expect(daysInMonth(text)).toBe('daysInMonth filter: ' + text);
  });

});
