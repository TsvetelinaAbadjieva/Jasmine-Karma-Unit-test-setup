describe('This is prototype of test promise \n', function () {
    var HttpService, items = [], passPromise, $rootScope, errMessage = '';

    beforeEach(module(function ($provide) {
        $provide.service('HttpService', function ($q) {
            this.getData = jasmine.createSpy('getData').and.callFake(function () {
                var items = [
                    { id: 1, name: 'Ivan' },
                    { id: 2, name: 'Anna' },
                ];
                if (passPromise) {
                    return $q.when(items);
                } else {
                    errMessage = 'Something went wrong';
                    return $q.reject(errMessage);
                }
            })
            return this;
        })
    }));

    beforeEach(inject(function (_HttpService_, _$rootScope_) {
        HttpService = _HttpService_;
        $rootScope = _$rootScope_;
    }));
    it('Test if HttpService is defined', function () {
        expect(HttpService.getData).toBeDefined();
    });
    it('Test if HttpService return data on passPromise == true...', function () {
        passPromise = true;
        items = null;
        HttpService.getData().then((res) => {
            items = res;
            console.log('items = ', items);
        });
        //VERY IMPORTANT TO CALL $digest;    
        $rootScope.$digest();
        expect(HttpService.getData).toHaveBeenCalled();
        expect(items).toEqual([
            { id: 1, name: 'Ivan' },
            { id: 2, name: 'Anna' },
        ]);
    });
    it('Test if Error is called on passPromise false...', function () {
        passPromise = false;
        HttpService.getData().then(res => {
        });
        
        expect(errMessage).not.toBe('');
    })

})