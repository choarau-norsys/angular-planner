'use strict';

describe('Controller: ResourcescontrollerCtrl', function () {

  // load the controller's module
  beforeEach(module('plannerApp'));

  var ResourcescontrollerCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ResourcescontrollerCtrl = $controller('ResourcescontrollerCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
