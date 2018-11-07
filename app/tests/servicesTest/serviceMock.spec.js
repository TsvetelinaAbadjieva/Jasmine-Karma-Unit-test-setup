describe('Service test', function () {
    var Users, result, mockService, Users;
    // 'ui.router', 'datatables', 'datatables.bootstrap'
    
//Declare before All dependencies, used by app.campaign
    beforeEach(function(){
        // angular.module('ui.router',[]);
        angular.module('ServiceModule')
    });

    beforeEach(function () {
        mockService = {
            getData: jasmine.createSpy('getData').and.returnValue({
                id: 1, 
                username: "Bret",
                email: "Sincere@april.biz",
            }),
        }

        module(function ($provide) {
            $provide.value('HttpService', mockService);
        })
    })
    beforeEach(module(function($provide){
        $provide.factory('Users', function(){
            var Users = {};
            Users.getUsers = jasmine.createSpy('getUsers').and.callFake(function(){
                return mockService.getData();
                console.log(mockService.getData())
            })
            return Users
        })
    }))

    beforeEach(inject(function (_Users_) {
        Users = _Users_;
        console.log(Users);
    }));

    describe('Check if Users service is called', function () {
        it('users.getUsers should be called with injected service HttpService', function () {
            result = {};
            result = Users.getUsers();
            expect(mockService.getData).toHaveBeenCalled();
            expect(result).not.toBe(null);
            expect(result).toEqual(jasmine.objectContaining({ id: 1 }));
            console.log('result after',result);

        })
    })
})