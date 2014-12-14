'use strict';

describe('Controller: PlanningController', function () {

  // load the controller's module
  beforeEach(module('plannerApp'));

  var PlanningController,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PlanningController = $controller('PlanningController', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
