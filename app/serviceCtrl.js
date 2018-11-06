var serviceModule = angular.module('ServiceModule', []);
serviceModule.factory('Users', ['HttpService', function (HttpService) {
    var Users = {};
    Users.list = [];
    Users.getUsers = function () {
        HttpService.getData().then(data => {
            console.log(data);
            return  data;
        });
    }
    return Users;
}]);

serviceModule.service('HttpService', ['$http', '$q', function ($http, $q) {
    this.url = 'https://jsonplaceholder.typicode.com/users';
    this.getData = function () {
        var defer = $q.defer();
        $http.get(this.url)
            .then(data => {
                defer.resolve(data);
            },
                error => {
                    defer.reject(error);
                })
        return defer.promise;
    }
    return this;
}])