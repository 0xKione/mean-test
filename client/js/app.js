angular.module('meanApp', ['ui.router']);


angular.module('meanApp').config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/inbox');

    $stateProvider
        .state('inbox', {
            url: '/inbox',
            templateUrl: 'client/partials/inbox.html',
            controller: function($scope) {
                $scope.emails = ["email1", "email2", "email3", "email4"];
            }
        })
        .state('trash', {
            url: '/trash',
            templateUrl: 'client/partials/trash.html',
            controller: function($scope) {
                $scope.emails = ["trashEmail1", "trashEmail2", "trashEmail3", "trashEmail4"];
            }
        });
});