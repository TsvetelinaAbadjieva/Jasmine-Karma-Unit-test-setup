describe('Test service with injections', function(){
    var HttpService, UsersService, result, httpBackend;

    beforeEach(module('ServiceModule'));

    beforeEach(function($provide){
        HttpService = {
            getData : jasmine.createSpy('getData').and.callThrough()
        };
        module(function($provide){
            $provide.value('HttpService', HttpService);
        });
        inject(function($injector, _$httpBackend_){
            UsersService = $injector.get('Users');
            httpBackend = _$httpBackend_;
        })
    })
    afterEach(function() {
        httpBackend.verifyNoOutstandingExpectation();
        httpBackend.verifyNoOutstandingRequest();
      });

    it('Test if UsersService is defined...', function(){
        expect(UsersService).toBeDefined();
    })
    it('Test if HttpService has been called...', function(){
        result = UsersService.getUsers();
        expect(HttpService.getData).toHaveBeenCalled();
    })
    it('Test if UserService has returned result...', function(){
        var expectedData = {};
        httpBackend.expectGET('https://jsonplaceholder.typicode.com/users').respond(expectedData);
        result = UsersService.getUsers();
        httpBackend.flush();
        expect(HttpService.getData).toHaveBeenCalled();
        expect(result).not.toBeUndefined();
        expect(result).toEqual(expectedData);
        console.log(expectedData);
    })


})