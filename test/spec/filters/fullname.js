'use strict';

describe('Filter: fullName', function () {

  // load the filter's module
  beforeEach(module('plannerApp'));

  // initialize a new instance of the filter before each test
  var fullName;
  beforeEach(inject(function ($filter) {
    fullName = $filter('fullName');
  }));

  it('should return the input prefixed with "fullName filter:"', function () {
    var text = 'angularjs';
    expect(fullName(text)).toBe('fullName filter: ' + text);
  });

});
