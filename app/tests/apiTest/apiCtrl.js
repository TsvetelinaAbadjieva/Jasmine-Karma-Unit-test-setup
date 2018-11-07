'use strict'
var MyApp = angular.module('MyApp', [])

    .factory('RealApiService', ['$http', '$q', function ($http, $q) {
        var base_url = 'https://jsonplaceholder.typicode.com/users/1';
        var options = {
            headers: {
                'Content-type': 'application/json'
            }
        }
        var RealApiService = {};

        RealApiService.getUsers = function () {
            return $http.get(base_url);
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
            return RealApiService.getUsers();
        }
        Users.getOne = function () {
            return RealApiService.getUsersAsObject();
        }
        return Users;
    }])

