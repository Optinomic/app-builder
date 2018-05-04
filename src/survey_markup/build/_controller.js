app.controller('ContentController', ['$scope', function ($scope) {

    // Date & Timings
    $scope.Date = function () {
        var d = new Date();
        return d.toISOString();
    };

    $scope.setPerformance = function (id, name) {
        $scope.timings.points.push({
            "id": id,
            "name": name,
            "performance": performance.now()
        });
        // console.log('setPerformance', $scope.timings);
    };


    // Start
    $scope.surveyStart = function () {
        $scope.result.extras.filled = $scope.Date();
        $scope.result.state.current_state = 'start';
        // console.log('surveyStart', $scope.result);
    };

    // Saving
    $scope.prepareSave = function () {
        $scope.setPerformance(999999, 'end');

        $scope.result.extras.saved = $scope.Date();
        // result_store_survey_markup
        if ($scope.survey_markup.survey.show_welcome_page === false) {
            delete $scope.result.extras.survey_markup;
        };

        // Calculate Performance - Duration 
        $scope.timings.points.forEach(function (p, pID) {
            if (pID !== 0) {
                $scope.timings.points[pID - 1].s = (p.performance - $scope.timings.points[pID - 1].performance) / 1000;
            };
        });
        $scope.timings.points.splice(-1, 1);
        $scope.timings.points.forEach(function (p, pID) {
            $scope.timings[p.name] = Math.round(p.s * 10) / 10;
        });
        delete $scope.timings.points;

        //result_store_timings
        if ($scope.survey_markup.survey.result_store_timings === true) {
            $scope.result.extras.timings = Object.assign({}, $scope.timings);
        };

        // Cleanup
        delete $scope.result.state;

        $scope.saveresult()
    };

    // Init
    $scope.init = function () {

        $scope.timings = {
            "points": []
        };
        $scope.survey_markup = Object.assign({}, $scope.result.extras.survey_markup);

        console.log('INIT :: Survey Markup:', $scope.survey_markup);
    };

    $scope.init();

}]);