
var MyApp = angular.module('MyApp', ['ui.bootstrap']);

MyApp.controller('foodController', ['$scope', function ($scope) {
    $scope.food = {
        breakfast: 'Breakfast',
        lunch: 'Lunch',
        dinner: 'Dinner'
    }
    $scope.food.breakfast = 'Hello';
}])


MyApp.controller('addFoodController',[ '$scope', function ($scope) {
    $scope.food.name = '';
    $scope.food.type = 'dinner';
    $scope.foods = [];

    $scope.addFood() = function(){
        console.log($scope.food.name);
        var food = {name: $scope.food.name, type:$scope.food.type}
        $scope.foods.push(food);
    }
}])

// MyApp.filter('reverse', [ function () {
//     return function (string) {
//         return string.split('').reverse.join('');
//     }
// }]);

// MyApp.controller('CalculatorController', function ($scope) {
//     $scope.add = function () {
//         $scope.sum = $scope.num1 + $scope.num2;
//     }
// });

MyApp.factory('DataService', function () {
    var data = [
        {
            name: 'Ivan Ivanov',
            age: 44
        },
        {
            name: 'Ana Nikolova',
            age: 27
        },
        {
            name: 'Marta Angelova',
            age: 30
        },
    ];

    var DataService = {};

    DataService.getData = function () {
        return data;
    }

    return DataService;
})

MyApp.factory('RealApiService', function ($http) {
    var base_url = 'https://jsonplaceholder.typicode.com/users/1';
    var RealApiService = {};
    RealApiService.getUsers = function () {
        return $http.get(base_url);
    }
    return RealApiService;
})