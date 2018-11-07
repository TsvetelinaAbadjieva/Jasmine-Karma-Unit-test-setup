/**
 *  Test of service using ohter injected service which is  previously mocked (http request is mocked)
 */
describe('Service test', function () {
    var Users, result, mockService;
    beforeEach(module('MyApp'));
    beforeEach(function () {
        mockService = {
            getUsers: jasmine.createSpy('getUsers').and.returnValue({
                id: 1, username: "Bret",
                email: "Sincere@april.biz",
            }),
            getUsersAsObject: jasmine.createSpy('getUsersAsObject').and.callFake(function(){return { id: 1, "street": "Kulas Light" }})
        }

        module(function ($provide) {
            $provide.value('RealApiService', mockService);
        })
    })
    beforeEach(inject(function (_Users_) {
        Users = _Users_;
    }))
    
    describe('Check if Users service is called', function () {
        it('user.get should be called with injected service RealApiService', function () {
            result = Users.get();
            expect(mockService.getUsers).toHaveBeenCalled();
            expect(result).not.toBe(null);
            expect(result).toEqual(jasmine.objectContaining({ id: 1 }));
        })
        it('Check the call of users.getOne with injected service RealApiService', function () {
            var data = {};
            data = Users.getOne();
            expect(mockService.getUsersAsObject).toHaveBeenCalled();
            expect(data).toEqual(jasmine.objectContaining({street: "Kulas Light" }));
        })
    })
})