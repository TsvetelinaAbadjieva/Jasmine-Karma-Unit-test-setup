// describe('filters', function(){

//     beforeEach(module('MyApp'));

//     describe('reverse', function(){
//         var reverse;

//         beforeEach(inject(function($filter){
//             reverse = $filter('reverse', {});
//         }));

//         it('Should reverse a string...', function(){
//             expect(reverse('atob')).toBe('bota');
//             expect(reverse('bot')).toBe('tob');

//         })
//     })
// });

// describe('Add controller', function(){
//     beforeEach(module('MyApp'));

//     var $controller;

//     beforeEach(inject(function(_$controller_){
//         $controller = _$controller_;
//     }));

//     it('check sum 1+1=2', function(){
//         var $scope = {};
//         var controller = $controller('CalculatorController', {$scope: $scope});
//         $scope.num1 = 1;
//         $scope.num2 = 1;
//         controller.add();
//         expect($scope.sum).toBe(2);

//     })
// });

// describe('DataServiceSpec', function(){
//     beforeEach(module('MyApp'));

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

//     var DataService;

//     beforeEach(inject(function(_DataService_){

//         DataService = _DataService_;
//     }));

//     it('Should return data...', function(){
//         var dataServiceData = DataService.getData();
//         console.log(dataServiceData);
//         expect(dataServiceData).toEqual(data);
//     })

// })

describe('RealApiService', function () {
    var httpBackend, RealApiService;
    

    beforeEach(function () {
        module('MyApp');
        inject(function (_$httpBackend_, _RealApiService_) {
            httpBackend = _$httpBackend_;
            RealApiService = _RealApiService_;
            console.log('httpBackend obj-> ', httpBackend);
        })
    });

    // make sure no expectations were missed in your tests.
    afterEach(function () {
        httpBackend.verifyNoOutstandingExpectation();
        httpBackend.verifyNoOutstandingRequest();
    });
    it('Test RealApiService behaviour', function () {
        var returnedDataByBackend={};
        var apiResult={};

        var url = 'https://jsonplaceholder.typicode.com/users/1';

        console.log('Check defined httpBackend...');
        expect(httpBackend).toBeDefined();
        console.log('Check defined RealApiService...');
        expect(RealApiService).toBeDefined();

        //prepare the call of GET request

        RealApiService.getUsers()
        .then(
            (res) => {
            apiResult = res.data;

        });
        httpBackend.expectGET(url).respond(200, returnedDataByBackend);
        httpBackend.flush();

        expect(apiResult).toBeTruthy();
        expect(apiResult).not.toBeUndefined();

        console.log(apiResult);
        console.log(returnedDataByBackend);

        //execute GET request
        expect(apiResult).toEqual(returnedDataByBackend);
    })
})