app.directive("helloWorld", function(HelloWorldService) {
    return {
        restrict: 'E',
	    scope: {},
	    templateUrl: 'client/partials/hello-world.html',
	    link: function(scope, elem, attrs) {
	        scope.message = HelloWorldService.getMessage();
	    }
    }
});
