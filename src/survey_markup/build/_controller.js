app.controller('ContentController', function ($scope, $http) {


    // Timings
    $scope.Date = function () {
        var d = new Date();
        return d.toISOString();
    };

    $scope.setPerformance = function (point) {
        $scope.timings[point] = performance.now();
    };


    // Saving

    $scope.prepareSave = function () {

        // Timings
        this.result.extras.saved = $scope.Date();
        console.log('$scope.timings', $scope.timings);

        $scope.saveresult()
    };


    $scope.init = function () {

        $scope.timings = {};
        $scope.survey_markup = Object.assign({}, $scope.result.extras.survey_markup);

        console.log('Survey Markup:', $scope.survey_markup);
    };

    $scope.init();

});