describe('Test service with injections', function () {
    var HttpService, UsersService, result = {}, expectedResult = {}, httpBackend;

    beforeEach(function () {
        module('ServiceModule');
        inject(function (_Users_, _HttpService_, _$httpBackend_) {
            UsersService = _Users_;
            httpBackend = _$httpBackend_;
            HttpService = _HttpService_;    
        })
    })

    afterEach(function () {
        httpBackend.verifyNoOutstandingExpectation();
        httpBackend.verifyNoOutstandingRequest();
    });

    it('Test if all services are defined...', function () {
        expect(UsersService).toBeDefined();
        expect(HttpService).toBeDefined();

    })
    it('Test if HttpService has returned result...', function () {
        httpBackend.expectGET('https://jsonplaceholder.typicode.com/users').respond(200,expectedResult);
        HttpService.getData().then((res) => {
            result = res.data;
        },
            (er) => { result = er }
        );
        httpBackend.flush();
        console.log(result);
        console.log(expectedResult);

        expect(result).toEqual(expectedResult);
        console.log(expectedResult);
    })
})