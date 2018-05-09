app.config(['$mdDateLocaleProvider', function ($mdDateLocaleProvider) {
    // ---------------------------------------------------------------------------------------------------------------
    // The $mdDateLocaleProvider is the provider that creates the $mdDateLocale service. 
    // This provider that allows the user to specify messages, formatters, and parsers for date internationalization. 
    // The $mdDateLocale service itself is consumed by Angular Material components that that deal with dates.
    // ---------------------------------------------------------------------------------------------------------------

    $mdDateLocaleProvider.months = ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'];
    $mdDateLocaleProvider.shortMonths = $mdDateLocaleProvider.months;
    $mdDateLocaleProvider.days = ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'];
    $mdDateLocaleProvider.shortDays = ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'];

    // Example uses moment.js to parse and format dates.
    $mdDateLocaleProvider.parseDate = function (dateString) {
        var m = new Date(dateString);

        if (dateString !== undefined) {
            // console.log('1 parseDate', dateString);

            var pDArray = dateString.split('.');
            var mDay = null;
            var mMonth = null;
            var mYear = null;
            pDArray.forEach(function (e, ID) {
                if (ID === 0) {
                    mDay = parseInt(e);
                };
                if (ID === 1) {
                    mMonth = parseInt(e) - 1;
                };
                if (ID === 2) {
                    mYear = parseInt(e);
                };
            }.bind(this));

            var pDate = new Date(mYear, mMonth, mDay, 0, 0, 0, 0);
            // console.log('2 parseDate', pDate, mYear, mMonth, mDay);
        };

        return pDate || new Date(NaN);
    };

    $mdDateLocaleProvider.formatDate = function (date) {
        //console.log('1) formatDate', date);

        if (date !== undefined) {
            var options = {
                year: 'numeric',
                month: 'numeric',
                day: 'numeric'
            };

            var lDate = date.toLocaleString('de-DE', options);

            var options = {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            };
            // console.log('2) formatDate', lDate, date, event.toLocaleString('de-DE', options));
        };

        return lDate || '';
    };

    $mdDateLocaleProvider.monthHeaderFormatter = function (date) {
        return $mdDateLocaleProvider.shortMonths[date.getMonth()] + ' ' + date.getFullYear();
    };

    $mdDateLocaleProvider.weekNumberFormatter = function (weekNumber) {
        return 'Kalenderwoche ' + weekNumber;
    };

    $mdDateLocaleProvider.msgCalendar = 'Kalender';
    $mdDateLocaleProvider.msgOpenCalendar = 'Kalender öffnen';
}]);

app.controller('ContentController', ['$scope', '$mdSidenav', function ($scope, $mdSidenav) {

    // SideNav
    $scope.toggleLeft = buildToggler('left');

    function buildToggler(componentId) {
        return function () {
            $mdSidenav(componentId).toggle();
        };
    };

    // Date & Timings
    $scope.Date = function (d) {
        d = d || new Date();
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

    $scope.$watch('result.state.current_question_group', function () {

        try {
            if ($scope.result.state.current_question_group > $scope.result.state.max_question_group) {
                $scope.result.state.max_question_group = $scope.result.state.current_question_group;
            };
        } catch (e) {};
        // console.log('CHANGED:', $scope.result.state.current_question_group, $scope.result.state.max_question_group);
    });

    $scope.goToQuestionGroup = function (qg) {
        $scope.result.state.current_question_group = qg;
        $scope.toggleLeft();
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

        var total = 0;
        $scope.timings.points.forEach(function (p, pID) {
            var seconds = Math.round(p.s * 10) / 10;
            $scope.timings[p.name] = seconds;
            total = total + seconds;
        });
        $scope.timings.total = total;
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
        $scope.result.state.max_question_group = 1;

        console.log('INIT :: Survey Markup:', $scope.survey_markup);
    };

    $scope.init();

}]);