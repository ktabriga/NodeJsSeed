angular.module('app').directive('unique', ['$timeout','$injector', function ($timeout, $injector) {
  return {
    restrict: 'A',
    require: 'ngModel',
    link: function (scope, element, attrs, ngModel, ctrl) {
      element.on('keyup paste', function (e) {
        if (!ngModel || !element.val()) return;
        var service = $injector.get(attrs.uniqueService);

        var column = attrs.uniqueColumn;
        var value = element.val();
        var data = {};
        data[column] = value;
        service.unique(data).then(function(data) { _unique.success(data) }, function(data) { _unique.error(data) });

        _unique = {
          success: function(data) {
            if (value == element.val()) {
              ngModel.$setValidity('unique', true);
            }
          },
          error: function(data) {
            ngModel.$setValidity('unique', false);
          }
        }
      });
    }
  }
}]);