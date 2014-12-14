'use strict';

describe('Directive: plannerLines', function () {

  // load the directive's module
  beforeEach(module('plannerApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<planner-lines></planner-line>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the plannerLines directive');
  }));
});
