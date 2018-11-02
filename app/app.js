'use strict'
var MyApp = angular.module('MyApp', [])
    // var MyApp = angular.module('MyApp', ['ngModel','ngRoute','ui.bootstrap'])

    // .controller('foodController', ['$scope', function ($scope) {
    //     $scope.food = {
    //         breakfast: 'Breakfast',
    //         lunch: 'Lunch',
    //         dinner: 'Dinner'
    //     }
    //     $scope.food.breakfast = 'Hello';
    // }])

    .factory('RealApiService', ['$http', '$q', function ($http, $q) {
        var base_url = 'https://jsonplaceholder.typicode.com/users/1';
        var options = {
            headers: {
                'Content-type': 'application/json'
            }
        }
        var RealApiService = {};

        RealApiService.getUsers = function () {
            var defered = $q.defer();
            return $http.get(base_url);
            // .then(
            //     (res) => {
            //         console.log(res);
            // defered.resolve(res.data);
            // return res;
            // },
            // (error) => {
            //     console.log(error);
            //     return error;
            // defered.reject(error);
            //     }
            // );
            // return defered.promise;
        }
        RealApiService.getUsersAsObject = function () {
            var defer = $q.defer();
            var data = {};
            $http.get(base_url).then((res) => {
                console.log('in function', res.data);
                defer.resolve(res.data);
                // return data = res.data;
            })
            // return data;
            return defer.promise;
        }
        return RealApiService;
    }])
    .factory('Users', ['RealApiService', '$q', function (RealApiService, $q) {
        var Users = {};
        Users.userlist = [];
        Users.get = function () {
            var defer = $q.defer();
            return RealApiService.getUsers();
            // .then((data) => {
            //     defer.resolve(data.data);
            // }, function (error) {
            //     defer.reject(error)
            // })
            // return defer.promise;
        }
        Users.getOne = function () {
            return RealApiService.getUsersAsObject();
        }
        return Users;
    }])

    .controller('TestHttpController', ['$scope', 'RealApiService', '$http', function ($scope, RealApiService, $http) {
        // $scope.food = {};
        // $scope.food.name = '';
        // $scope.food.type = 'dinner';
        // $scope.foods = [];

        // $scope.addFood = function () {
        //     var food = { name: $scope.food.name || '', type: $scope.food.type || '' }
        //     $scope.foods.push(food);
        //     console.log('in add')
        // }
        $scope.data = [];
        $scope.showData = function () {
            alert('hei')
            RealApiService.getUsers().then(
                (res) => {
                    console.log(res)
                    $scope.data.push(res.data);
                },
                (er) => {
                    console.log(er);
                });

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

// MyApp.factory('DataService', function () {
//     var data = [
//         {
//             name: 'Ivan Ivanov',
//             age: 44
//         },
//         {
//             name: 'Ana Nikolova',
//             age: 27
//         },
//         {
//             name: 'Marta Angelova',
//             age: 30
//         },
//     ];

//     var DataService = {};

//     DataService.getData = function () {
//         return data;
//     }

//     return DataService;
// })

