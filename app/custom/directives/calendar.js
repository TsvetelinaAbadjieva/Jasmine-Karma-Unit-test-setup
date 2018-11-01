var app = angular.module("app.calendar", []);
app.controller('calendarCtr', function () {
    var calendar = {};
    var isLeapYear = false;
    calendar.Init = function () {
        $scope.isLeapYear = false;
    }
    calendar.isLeapYear = function () {
        $scope.selectedYear = $scope.selectedYear || new Date().getFullYear();
        if ($scope.selectedYear % 4 == 0 || $scope.selectedYear % 100 == 0 || $scope.selectedYear % 100 == 0) {
            return true;
        }
        return false;
    }
    calendar.getDaysByMonth = function () {
        $scope.daysByMonth = [31, $scope.isLeapYear() ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    }
    calendar.getPrevWeek = function () {
        calendar.calculateWeek('prev');
    }
    calendar.getNextWeek = function () {
        calendar.calculateWeek('next');
    }
    calendar.calculateWeek = function (mode) {
        var delta = (mode == 'next') ? 7 : -7;
        $scope.currentDay = $scope.currentDay || new Date().getDay();
        $scope.currentDate = $scope.currentDate || new Date().getDate();
        $scope.currentYear = $scope.currentYear || new Date().getFullYear();
        $scope.currentMonth = $scope.currentMonth || new Date().getMonth();
        var diff = ($scope.currentDay == 1) ? 0 : $scope.currentDay - 1;
        $scope.startDate = new Date($scope.currentYear, $scope.currentMonth, $scope.currentDate - diff + delta);
        $scope.endDate = new Date($scope.currentYear, $scope.currentMonth, $scope.startDate + 6);

        var limit = ($scope.currentMonth == 0) ? 0 : $scope.currentMonth - 1;
        var numberOfDays = $scope.currentDate;
        for (var i = 0; i <= limit; i++) {
            numberOfDays += $scope.daysByMonth[i];
        }
        $scope.week = Math.floor(numberOfDays % 7)+1;

    }

})
app.directive('calendar', function () {
    return {
        restriction: 'E',
        templateUrl: '../views/calendar.tpl.html',
    }

})