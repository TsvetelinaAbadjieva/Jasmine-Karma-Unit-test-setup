var serviceModule = angular.module('ServiceModule', []);
serviceModule.factory('Users', ['HttpService', function (HttpService) {
    var Users = {};
    Users.getUsers = function () {
       return HttpService.getData();
    }
    return Users;
}]);

serviceModule.service('HttpService', ['$http', '$q', function ($http, $q) {
    this.url = 'https://jsonplaceholder.typicode.com/users';
    this.getData = function () {
        return $http.get(this.url);
    }
    return this;
}])