angular.module('meanApp', ['ui.router']);


angular.module('meanApp').config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/inbox');

    $stateProvider
        .state('inbox', {
            url: '/inbox',
            templateUrl: 'client/partials/inbox.html',
            controller: function($scope, emails) {
                $scope.emails = emails;
            },
            resolve: {
                emails: function(EmailService) { 
                    return EmailService.getInbox();
                }
            }
        })
        .state('trash', {
            url: '/trash',
            templateUrl: 'client/partials/trash.html',
            controller: function($scope, emails) {
                $scope.emails = emails;
            },
            resolve: {
                emails: function(EmailService) {
                    return EmailService.getTrash();
                }
            }
        })
        .state('email', {
            url: '/email/:id',
            templateUrl: 'client/partials/email.html',
            controller: function($scope, email) {
                $scope.email = email;
            },
            resolve: {
                email: function($stateParams, EmailService) {
                    return EmailService.getEmail($stateParams.id);
                }
            }
        });
});