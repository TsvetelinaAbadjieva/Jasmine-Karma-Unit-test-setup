describe('Service test', function () {
    var Users, result, mockService, Campaign;
    // 'ui.router', 'datatables', 'datatables.bootstrap'
    
//Declare before All dependencies, used by app.campaign
    beforeEach(function(){
        angular.module('ui.router',[]);
        angular.module('datatables',[])
        angular.module('datatables.bootstrap',[])
        // module('app.campaign',[])
        angular.module('app.campaign',['ui.router','datatables','datatables.bootstrap'])
    });

    beforeEach(function () {
        mockService = {
            getData: jasmine.createSpy('getData').and.returnValue({
                id: 1, 
                username: "Bret",
                email: "Sincere@april.biz",
            }),
            // getUsersAsObject: jasmine.createSpy('getUsersAsObject').and.callFake(function(){return { id: 1, "street": "Kulas Light" }})
        }

        module(function ($provide) {
            $provide.value('HttpService', mockService);
        })
    })
    beforeEach(module(function($provide){
        $provide.factory('Campaign', function(){
            var Campaign = {};
            Campaign.getList = jasmine.createSpy('getList').and.callFake(function(){
                return mockService.getData();
                console.log(mockService.getData())
            })
            return Campaign;
        })
    }))

    beforeEach(inject(function (_Campaign_) {
        Campaign = _Campaign_;
        console.log(Campaign);
    }));

    describe('Check if Users service is called', function () {
        it('user.get should be called with injected service RealApiService', function () {
            result = {};
            result = Campaign.getList();
            expect(mockService.getData).toHaveBeenCalled();
            expect(result).not.toBe(null);
            expect(result).toEqual(jasmine.objectContaining({ id: 1 }));
            console.log('result after',result);

        })
        // it('Check the call of users.getOne with injected service RealApiService', function () {
        //     var data = {};
        //     data = Users.getOne();
        //     expect(mockService.getUsersAsObject).toHaveBeenCalled();
        //     expect(data).toEqual(jasmine.objectContaining({street: "Kulas Light" }));
        // })
    })
})