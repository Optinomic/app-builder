
app.controller('ContentController', ['$scope', '$controller', function ($scope, $controller) {
    
    // Date & Timings
    $scope.Datum = function (d) {
        d = d || new Date();
        console.log('gaga');
        return d.toISOString();
    };
    
    // Initialize the super class and extend it.
    angular.extend(this, $controller('SurveyController', {$scope: $scope}));
    
}]);

