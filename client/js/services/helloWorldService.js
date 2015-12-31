angular.module('meanApp').service('HelloWorldService', function() {
    this.getMessage = function() {
        return "Hello World";
    }
});
