angular.module('meanApp').directive('navBar', function($state) {
    return {
        restrict: 'E',
        scope: {},
        templateUrl: 'client/partials/nav-bar.html',
        link: function(scope, elem, attrs) {
            scope.isNavigating = false;
        }
    }
});