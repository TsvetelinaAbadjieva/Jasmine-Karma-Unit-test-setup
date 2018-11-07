describe('editCampaign', function () {
    var $controller, $editCampaignController, Campaign, $scope;

    var campaignObj = {
        CPM: 1,
        CPC: 2,
        CPI: 3
    }

    // beforeEach(function () {
    //     module(function ($provide) {
    //         var stateProvider = function () {
    //             // this.$stateProvider = $stateProvider;
    //             this.register = jasmine.createSpy('register');
    //             this.$get = function () { };
    //         }
    //         $provide.provider('stateProvider', stateProvider)
    //     })
    // })

    beforeEach(function () {
        // angular.mock.module('ui.router');
        angular.mock.module('app.campaign1');
    })
    describe('editCampaign', function () {
        beforeEach(inject(function (_$controller_, Campaign1, _$rootScope_) {
            $controller = _$controller_;
            Campaign = Campaign1;
            $scope = _$rootScope_.$new();
            // this call will execute the real function
            spyOn(Campaign, 'get').and.callThrough();
            $editCampaignController = $controller('editCampaign', { '$scope': $scope });
            console.log('after ctrl has been instantiated', $editCampaignController)

        }))
        it('test controller to call service', function () {
            // spyOn($scope, 'CampaignLoad');
            $scope.CampaignLoad();
            expect(Campaign.get).toHaveBeenCalled();
            expect($scope.Campaign).toBeDefined();
            expect($scope.Campaign).toEqual(jasmine.objectContaining({ CPI: 3 }));
            expect($scope.Campaign).toEqual(campaignObj);
            console.log('after ctrl to call service', $scope.Campaign);
        })
    })

})